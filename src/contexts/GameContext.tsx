import { createContext, useRef, useState } from 'react';
import { generateNotes, scoreGuess } from '../lib/GameNotes';
import { GameNote, MelodyNote } from '../constants/notes';
import { NUM_ROWS, ROW_LENGTH } from '../constants/game-board';
import { GameSettings, octavesChanged } from '../constants/settings';
import { loadSettings, saveSettings } from '../lib/settings';
import { playMelody as playMelodyNotes, playReference as playReferenceNote } from '../lib/audio';

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
  gameWon: boolean;
  gameLost: boolean;
  // Whether this game's melody has been played yet, to point new players at the play button
  melodyPlayed: boolean;
  // Which sound is waiting on its instrument to download, to show on its button
  loadingSound: 'melody' | 'reference' | null;
  // Shown briefly each time the reference plays, naming the note
  referenceHintVisible: boolean;
  // The game's actions, shared by the on-screen buttons and the keyboard. Each does nothing
  // when it doesn't apply (a full row, an empty row, a game that's over).
  inputNote: (note: GameNote) => void;
  deleteNote: () => void;
  submitGuess: () => void;
  playMelody: () => Promise<void>;
  playReference: () => Promise<void>;
  resetGame: () => void;
  // Saves the settings. Changing the octaves starts a new game, since the current melody used
  // the old ones; changing only the instrument keeps the game going.
  updateSettings: (newSettings: GameSettings) => void;
}

export const GameContext = createContext<Board>({} as Board);

const EMPTY_TILE: NoteTile = { note: '', answered: false, correct: false, closeDirection: null };

const emptyBoard = (): NoteTile[][] =>
  Array.from({ length: NUM_ROWS }, () => Array.from({ length: ROW_LENGTH }, () => EMPTY_TILE));

// How long after the melody starts before it can be played again, so presses can't pile up
const MELODY_REPLAY_LOCK_MS = 2900;
const REFERENCE_HINT_MS = 1500;

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
  const melodyLocked = useRef(false);
  const referenceHintTimer = useRef<number | undefined>(undefined);

  const gameOver = gameWon || gameLost;

  const setTile = (tile: NoteTile, index: number) => {
    const newBoard = [...gameBoard];
    newBoard[currentRow] = [...gameBoard[currentRow]];
    newBoard[currentRow][index] = tile;
    setBoard(newBoard);
  };

  const inputNote = (note: GameNote) => {
    if (currentIndex >= ROW_LENGTH || gameOver) return;
    setTile({ ...EMPTY_TILE, note }, currentIndex);
    setCurrentIndex(currentIndex + 1);
  };

  const deleteNote = () => {
    if (currentIndex === 0 || gameOver) return;
    setTile(EMPTY_TILE, currentIndex - 1);
    setCurrentIndex(currentIndex - 1);
  };

  const submitGuess = () => {
    if (currentIndex < ROW_LENGTH || gameOver) return;

    const scoredRow = scoreGuess(gameBoard[currentRow], melody);
    const newBoard = [...gameBoard];
    newBoard[currentRow] = scoredRow;
    setBoard(newBoard);

    if (scoredRow.every((tile) => tile.correct)) {
      setGameWon(true);
      return;
    }

    setCurrentRow(currentRow + 1);
    if (currentRow === NUM_ROWS - 1) {
      setGameLost(true);
      return;
    }
    // Back to the beginning of the next row
    setCurrentIndex(0);
  };

  const playMelody = async () => {
    if (melodyLocked.current) return;
    melodyLocked.current = true;
    setMelodyPlayed(true);
    setLoadingSound('melody');

    try {
      await playMelodyNotes(melody, settings);
    } catch (error) {
      console.error('Could not play the melody', error);
      melodyLocked.current = false;
      return;
    } finally {
      setLoadingSound(null);
    }

    setTimeout(() => (melodyLocked.current = false), MELODY_REPLAY_LOCK_MS);
  };

  const playReference = async () => {
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
    gameWon,
    gameLost,
    melodyPlayed,
    loadingSound,
    referenceHintVisible,
    inputNote,
    deleteNote,
    submitGuess,
    playMelody,
    playReference,
    resetGame,
    updateSettings,
  };

  return <GameContext value={contextValue}>{children}</GameContext>;
};
