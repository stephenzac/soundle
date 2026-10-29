import { createContext, useEffect, useState } from 'react';
import { generateNotes } from '../lib/GameNotes';
import { GameNote, MelodyNote } from '../constants/notes';
import { NUM_ROWS, ROW_LENGTH } from '../constants/game-board';
import { OctaveSettings } from '../constants/octaves';
import { loadOctaveSettings, saveOctaveSettings } from '../lib/octave-settings';

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
  octaveSettings: OctaveSettings;
  gameWon: boolean;
  gameLost: boolean;
  melodyPlayed: boolean;
  setMelodyPlayed: (newState: boolean) => void;
  updateGameWon: (newState: boolean) => void;
  updateGameLost: (newState: boolean) => void;
  updateBoard: (note: NoteTile, rowNumber: number, index: number) => void;
  resetGame: () => void;
  // Saves the settings and starts a new game, since the current melody used the old ones
  updateOctaveSettings: (newSettings: OctaveSettings) => void;
  updateCurrentRow: (newRow: number) => void;
  setCurrentIndex: (newIndex: number) => void;
}

export const GameContext = createContext<Board>({} as Board);

export const GameContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameBoard, setBoard] = useState<NoteTile[][]>([]);
  const [octaveSettings, setOctaveSettings] = useState<OctaveSettings>(loadOctaveSettings);
  const [melody, setMelody] = useState<MelodyNote[]>(() => generateNotes(octaveSettings));
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

  const updateGameWon = (newState: boolean) => {
    setGameWon(newState);
    setMelodyPlayed(false);
  };

  const updateGameLost = (newState: boolean) => {
    setGameLost(newState);
    setMelodyPlayed(false);
  };

  const generateNewMelody = (settings: OctaveSettings) => {
    const newNotes = generateNotes(settings);
    setMelody(newNotes);
  };

  const updateBoard = (note: NoteTile, rowNumber: number, index: number) => {
    const newBoard = [...gameBoard];
    newBoard[rowNumber] = [...gameBoard[rowNumber]];
    newBoard[rowNumber][index] = note;
    setBoard(newBoard);
  };

  const resetGame = (settings: OctaveSettings = octaveSettings) => {
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
    generateNewMelody(settings);
  };

  const updateOctaveSettings = (newSettings: OctaveSettings) => {
    setOctaveSettings(newSettings);
    saveOctaveSettings(newSettings);
    resetGame(newSettings);
  };

  const updateCurrentRow = (newRow: number): void => {
    setCurrentRow(newRow);
    setMelodyPlayed(false);
  };

  const contextValue: Board = {
    gameBoard,
    currentRow,
    currentIndex,
    melody,
    octaveSettings,
    gameWon,
    gameLost,
    melodyPlayed,
    setMelodyPlayed,
    updateGameWon,
    updateGameLost,
    updateBoard,
    resetGame,
    updateOctaveSettings,
    updateCurrentRow,
    setCurrentIndex,
  };

  return <GameContext value={contextValue}>{children}</GameContext>;
};
