import { createContext, useEffect, useState } from 'react';
import { generateNotes } from '../lib/GameNotes';
import { GameNote, MelodyNote } from '../constants/notes';
import { NUM_ROWS, ROW_LENGTH } from '../constants/game-board';
import { GameSettings, octavesChanged } from '../constants/settings';
import { loadSettings, saveSettings } from '../lib/settings';

export interface NoteTile {
  note: GameNote | '';
  answered: boolean;
  correct: boolean;
  answerIsClose: boolean;
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
  setMelodyPlayed: (newState: boolean) => void;
  updateGameWon: (newState: boolean) => void;
  updateGameLost: (newState: boolean) => void;
  updateBoard: (note: NoteTile, rowNumber: number, index: number) => void;
  resetGame: () => void;
  // Saves the settings. Changing the octaves starts a new game, since the current melody used
  // the old ones; changing only the instrument keeps the game going.
  updateSettings: (newSettings: GameSettings) => void;
  updateCurrentRow: (newRow: number) => void;
  setCurrentIndex: (newIndex: number) => void;
}

export const GameContext = createContext<Board>({} as Board);

export const GameContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameBoard, setBoard] = useState<NoteTile[][]>([]);
  const [settings, setSettings] = useState<GameSettings>(loadSettings);
  const [melody, setMelody] = useState<MelodyNote[]>(() => generateNotes(settings));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [melodyPlayed, setMelodyPlayed] = useState(false);

  useEffect(() => {
    const newGameBoard: NoteTile[][] = Array.from({ length: NUM_ROWS }, () =>
      Array.from({ length: ROW_LENGTH }, () => ({
        note: '',
        answered: false,
        correct: false,
        answerIsClose: false,
      }))
    );

    setBoard(newGameBoard);
  }, []);

  const updateGameWon = (newState: boolean) => setGameWon(newState);

  const updateGameLost = (newState: boolean) => setGameLost(newState);

  const generateNewMelody = (melodySettings: GameSettings) => {
    const newNotes = generateNotes(melodySettings);
    setMelody(newNotes);
  };

  const updateBoard = (note: NoteTile, rowNumber: number, index: number) => {
    const newBoard = [...gameBoard];
    newBoard[rowNumber] = [...gameBoard[rowNumber]];
    newBoard[rowNumber][index] = note;
    setBoard(newBoard);
  };

  const resetGame = (melodySettings: GameSettings = settings) => {
    const newGameBoard: NoteTile[][] = Array.from({ length: NUM_ROWS }, () =>
      Array.from({ length: ROW_LENGTH }, () => ({
        note: '',
        answered: false,
        correct: false,
        answerIsClose: false,
      }))
    );

    setBoard(newGameBoard);
    setGameWon(false);
    setGameLost(false);
    updateCurrentRow(0);
    setCurrentIndex(0);
    setMelodyPlayed(false);
    generateNewMelody(melodySettings);
  };

  const updateSettings = (newSettings: GameSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
    if (octavesChanged(newSettings, settings)) resetGame(newSettings);
  };

  const updateCurrentRow = (newRow: number): void => setCurrentRow(newRow);

  const contextValue: Board = {
    gameBoard,
    currentRow,
    currentIndex,
    melody,
    settings,
    gameWon,
    gameLost,
    melodyPlayed,
    setMelodyPlayed,
    updateGameWon,
    updateGameLost,
    updateBoard,
    resetGame,
    updateSettings,
    updateCurrentRow,
    setCurrentIndex,
  };

  return <GameContext value={contextValue}>{children}</GameContext>;
};
