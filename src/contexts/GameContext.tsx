import { createContext, useRef, useState } from 'react';
import { generateNotes, guessTones, scoreGuess } from '../lib/GameNotes';
import { GameNote, MelodyNote, transposeNote } from '../constants/notes';
import { NUM_ROWS, ROW_LENGTH } from '../constants/game-board';
import { GameSettings, octavesChanged, transpositionOf } from '../constants/settings';
import { loadSettings, saveSettings } from '../lib/settings';
import {
  NOTE_SPACING_SECONDS,
  playMelody as playMelodyNotes,
  playReference as playReferenceNote,
  playTones,
  Playback,
} from '../lib/audio';

export interface NoteTile {
  note: GameNote | '';
  answered: boolean;
  correct: boolean;
  // For a wrong guess a half step off, which way the right note is; null otherwise
  closeDirection: 'up' | 'down' | null;
}

interface Board {
  gameBoard: NoteTile[][];
  currentRow: number;
  currentIndex: number;
  melody: MelodyNote[];
  settings: GameSettings;
  // Semitones from the sounding notes to the names shown, for written pitch on a transposing
  // instrument; 0 at concert pitch. The game keeps every note at concert pitch and only
  // translates names on the way in and out, so the setting can change mid-game.
  transposition: number;
  gameWon: boolean;
  gameLost: boolean;
  // Whether this game's melody has been played yet, to point new players at the play button
  melodyPlayed: boolean;
  // Which sound is waiting on its instrument to download, to show on its button
  loadingSound: 'melody' | 'reference' | null;
  // Shown briefly each time the reference plays, naming the note
  referenceHintVisible: boolean;
  // The row just submitted, turning over tile by tile as each tone plays: `flipped` tiles have
  // started turning, and `revealed` ones show their result. Input waits until it's done.
  reveal: { row: number; flipped: number; revealed: number } | null;
  // The tile whose tone is playing while a row is replayed
  playingTile: { row: number; index: number } | null;
  // Set for a moment when a row with too few notes is submitted, to shake it
  rowShaking: boolean;
  // The game's actions, shared by the on-screen buttons and the keyboard. Each does nothing
  // when it doesn't apply (a full row, an empty row, a game that's over).
  // Takes the note as named on screen, which the keypad and keyboard show in the chosen pitch
  inputNote: (note: GameNote) => void;
  deleteNote: () => void;
  submitGuess: () => void;
  playMelody: () => Promise<void>;
  playReference: () => Promise<void>;
  // Plays a guessed row's notes again, highlighting each tile as it sounds
  replayRow: (row: number) => void;
  resetGame: () => void;
  // Saves the settings. Changing the octaves starts a new game, since the current melody used
  // the old ones; changing only the instrument keeps the game going.
  updateSettings: (newSettings: GameSettings) => void;
}

export const GameContext = createContext<Board>({} as Board);

const EMPTY_TILE: NoteTile = { note: '', answered: false, correct: false, closeDirection: null };

const emptyBoard = (): NoteTile[][] =>
  Array.from({ length: NUM_ROWS }, () => Array.from({ length: ROW_LENGTH }, () => EMPTY_TILE));

// How long after the melody starts before it can be played again, so presses can't pile up:
// about when its last note ends
const MELODY_REPLAY_LOCK_MS = ((ROW_LENGTH - 1) * NOTE_SPACING_SECONDS + 0.25) * 1000;
const REFERENCE_HINT_MS = 1500;
// These match the animations in index.css. A flipping tile shows its result halfway through.
const FLIP_MS = 400;
const ROW_SHAKE_MS = 400;

export const GameContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameBoard, setBoard] = useState<NoteTile[][]>(emptyBoard);
  const [settings, setSettings] = useState<GameSettings>(loadSettings);
  const [melody, setMelody] = useState<MelodyNote[]>(() => generateNotes(settings));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [melodyPlayed, setMelodyPlayed] = useState(false);
  const [loadingSound, setLoadingSound] = useState<'melody' | 'reference' | null>(null);
  const [referenceHintVisible, setReferenceHintVisible] = useState(false);
  const [reveal, setReveal] = useState<Board['reveal']>(null);
  const [playingTile, setPlayingTile] = useState<Board['playingTile']>(null);
  const [rowShaking, setRowShaking] = useState(false);
  const melodyLocked = useRef(false);
  const melodyLockTimer = useRef<number | undefined>(undefined);
  // The melody as it plays, so a submitted guess can cut it off, and a count that tells a melody
  // still loading its sounds that it was cut off before it began
  const melodyPlayback = useRef<Playback | undefined>(undefined);
  const melodyId = useRef(0);
  const rowPlayback = useRef<Playback | undefined>(undefined);
  const referenceHintTimer = useRef<number | undefined>(undefined);
  const rowShakeTimer = useRef<number | undefined>(undefined);
  // True while a row's tones play (on submit or replay), so sounds don't pile up
  const rowPlaying = useRef(false);
  // Timers for the visuals of a row's tones, cleared when a new game starts mid-way
  const rowTimers = useRef<number[]>([]);
  // Bumped by a new game, so a row still loading its sounds from the last one doesn't play
  const gameId = useRef(0);

  const gameOver = gameWon || gameLost;
  const transposition = transpositionOf(settings);

  const setTile = (tile: NoteTile, index: number) => {
    const newBoard = [...gameBoard];
    newBoard[currentRow] = [...gameBoard[currentRow]];
    newBoard[currentRow][index] = tile;
    setBoard(newBoard);
  };

  const inputNote = (note: GameNote) => {
    if (currentIndex >= ROW_LENGTH || gameOver || reveal) return;
    setTile({ ...EMPTY_TILE, note: transposeNote(note, -transposition) }, currentIndex);
    setCurrentIndex(currentIndex + 1);
  };

  const deleteNote = () => {
    if (currentIndex === 0 || gameOver || reveal) return;
    setTile(EMPTY_TILE, currentIndex - 1);
    setCurrentIndex(currentIndex - 1);
  };

  // Plays a row's guessed notes, calling onTone as each sounds and onEnd after the last. The
  // visuals run on timers even if the sound fails, so a reveal always finishes.
  const playRow = async (
    row: NoteTile[],
    onTone: (index: number) => void,
    onEnd: () => void,
    endDelayMs: number
  ) => {
    const id = gameId.current;
    let startsIn = 0;
    try {
      const playback = await playTones(guessTones(row, melody, settings), settings);
      if (id !== gameId.current) {
        playback.stop();
        return;
      }
      rowPlayback.current = playback;
      startsIn = playback.startsIn;
    } catch (error) {
      console.error('Could not play the guess', error);
    }
    if (id !== gameId.current) return;

    const at = (ms: number, callback: () => void) =>
      rowTimers.current.push(window.setTimeout(callback, startsIn * 1000 + ms));
    row.forEach((_, index) => at(index * NOTE_SPACING_SECONDS * 1000, () => onTone(index)));
    at((row.length - 1) * NOTE_SPACING_SECONDS * 1000 + endDelayMs, onEnd);
  };

  const submitGuess = () => {
    if (gameOver || reveal) return;
    if (currentIndex < ROW_LENGTH) {
      // Ended by a timer rather than the animation's end, which never comes with reduced motion
      setRowShaking(true);
      clearTimeout(rowShakeTimer.current);
      rowShakeTimer.current = window.setTimeout(() => setRowShaking(false), ROW_SHAKE_MS);
      return;
    }

    // The guess's tones play next, so a melody still playing gives way to them
    stopMelody();

    const row = currentRow;
    const scoredRow = scoreGuess(gameBoard[row], melody);
    const newBoard = [...gameBoard];
    newBoard[row] = scoredRow;
    setBoard(newBoard);

    // The result (a win, a loss, or the next row) waits until every tile has turned over
    const finish = () => {
      rowPlaying.current = false;
      rowPlayback.current = undefined;
      rowTimers.current = [];
      setReveal(null);
      if (scoredRow.every((tile) => tile.correct)) {
        setGameWon(true);
        return;
      }
      setCurrentRow(row + 1);
      if (row === NUM_ROWS - 1) {
        setGameLost(true);
        return;
      }
      setCurrentIndex(0);
    };

    rowPlaying.current = true;
    setPlayingTile(null);
    setReveal({ row, flipped: 0, revealed: 0 });
    void playRow(
      scoredRow,
      (index) => {
        setReveal((r) => r && { ...r, flipped: index + 1 });
        rowTimers.current.push(
          window.setTimeout(() => setReveal((r) => r && { ...r, revealed: index + 1 }), FLIP_MS / 2)
        );
      },
      finish,
      FLIP_MS
    );
  };

  const replayRow = (row: number) => {
    if (rowPlaying.current || melodyLocked.current) return;
    rowPlaying.current = true;
    void playRow(
      gameBoard[row],
      (index) => setPlayingTile({ row, index }),
      () => {
        rowPlaying.current = false;
        rowPlayback.current = undefined;
        rowTimers.current = [];
        setPlayingTile(null);
      },
      NOTE_SPACING_SECONDS * 1000
    );
  };

  const playMelody = async () => {
    if (melodyLocked.current || rowPlaying.current) return;
    melodyLocked.current = true;
    setMelodyPlayed(true);
    setLoadingSound('melody');
    const id = melodyId.current;

    try {
      const playback = await playMelodyNotes(melody, settings);
      if (id !== melodyId.current) {
        playback.stop();
        return;
      }
      melodyPlayback.current = playback;
    } catch (error) {
      console.error('Could not play the melody', error);
      melodyLocked.current = false;
      return;
    } finally {
      setLoadingSound((sound) => (sound === 'melody' ? null : sound));
    }

    melodyLockTimer.current = window.setTimeout(() => {
      melodyLocked.current = false;
      melodyPlayback.current = undefined;
    }, MELODY_REPLAY_LOCK_MS);
  };

  // Cuts the melody off, or keeps one still loading from starting, and lets it be played again
  const stopMelody = () => {
    melodyId.current++;
    melodyPlayback.current?.stop();
    melodyPlayback.current = undefined;
    clearTimeout(melodyLockTimer.current);
    melodyLocked.current = false;
    setLoadingSound((sound) => (sound === 'melody' ? null : sound));
  };

  const playReference = async () => {
    if (rowPlaying.current) return;
    // Pressing again keeps the popup up for a full REFERENCE_HINT_MS from this press
    setReferenceHintVisible(true);
    clearTimeout(referenceHintTimer.current);
    referenceHintTimer.current = window.setTimeout(
      () => setReferenceHintVisible(false),
      REFERENCE_HINT_MS
    );

    setLoadingSound((sound) => sound ?? 'reference');
    try {
      await playReferenceNote(settings);
    } catch (error) {
      console.error('Could not play the reference note', error);
    } finally {
      setLoadingSound((sound) => (sound === 'reference' ? null : sound));
    }
  };

  const resetGame = (melodySettings: GameSettings = settings) => {
    // Nothing from the last game keeps playing
    stopMelody();
    gameId.current++;
    rowPlayback.current?.stop();
    rowPlayback.current = undefined;
    rowTimers.current.forEach(clearTimeout);
    rowTimers.current = [];
    rowPlaying.current = false;
    setReveal(null);
    setPlayingTile(null);
    setRowShaking(false);
    setBoard(emptyBoard());
    setGameWon(false);
    setGameLost(false);
    setCurrentRow(0);
    setCurrentIndex(0);
    setMelodyPlayed(false);
    setMelody(generateNotes(melodySettings));
  };

  const updateSettings = (newSettings: GameSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
    if (octavesChanged(newSettings, settings)) resetGame(newSettings);
  };

  const contextValue: Board = {
    gameBoard,
    currentRow,
    currentIndex,
    melody,
    settings,
    transposition,
    gameWon,
    gameLost,
    melodyPlayed,
    loadingSound,
    referenceHintVisible,
    reveal,
    playingTile,
    rowShaking,
    inputNote,
    deleteNote,
    submitGuess,
    playMelody,
    playReference,
    replayRow,
    resetGame,
    updateSettings,
  };

  return <GameContext value={contextValue}>{children}</GameContext>;
};
