import { createContext, useContext, useEffect, useState } from 'react';
import { generateNotes } from '../lib/GameNotes';
import { NoteNotation } from '../constants/notes';
import { NUM_ROWS, ROW_LENGTH } from '../constants/game-board';

export type NoteTile = {
  noteName: NoteNotation;
  answered: boolean;
  correct: boolean;
  answerIsClose: boolean;
};

interface Board {
  gameBoard: NoteTile[][];
  currentRow: number;
  currentIndex: number;
  melody: NoteNotation[];
  gameWon: boolean;
  gameLost: boolean;
  melodyPlayed: boolean;
  setMelodyPlayed: (newState: boolean) => void;
  updateGameWon: (newState: boolean) => void;
  updateGameLost: (newState: boolean) => void;
  getMelody: () => void;
  updateBoard: (note: NoteTile, rowNumber: number, index: number) => void;
  resetGame: () => void;
  updateCurrentRow: (newRow: number) => void;
  setCurrentIndex: (newIndex: number) => void;
}

const gameContext = createContext<Board>({} as Board);

export const GameContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gameBoard, setBoard] = useState<NoteTile[][]>([]);
  const [melody, setMelody] = useState<NoteNotation[]>([]);
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [gameLost, setGameLost] = useState<boolean>(false);
  const [melodyPlayed, setMelodyPlayed] = useState<boolean>(false);

  // Initialize first board
  useEffect(() => {
    let newGameBoard: NoteTile[][] = [];
    for (let i = 0; i < NUM_ROWS; i++) {
      newGameBoard.push([]);
      for (let j = 0; j < ROW_LENGTH; j++) {
        let newTile: NoteTile = {
          noteName: '',
          answered: false,
          correct: false,
          answerIsClose: false,
        };
        newGameBoard[i].push(newTile);
      }
    }
    setBoard(newGameBoard);
    generateNewMelody();
  }, []);

  const updateGameWon = (newState: boolean) => {
    setGameWon(newState);
    setMelodyPlayed(false);
  };

  const updateGameLost = (newState: boolean) => {
    setGameLost(newState);
    setMelodyPlayed(false);
  };

  const generateNewMelody = (): void => {
    let newNotes = generateNotes();
    setMelody(newNotes);
  };

  const updateBoard = (note: NoteTile, rowNumber: number, index: number) => {
    let newBoard: NoteTile[][] = gameBoard;
    newBoard[rowNumber][index] = note;
    setBoard(newBoard);
  };

  const resetGame = () => {
    let newGameBoard = gameBoard;
    for (let i = 0; i < NUM_ROWS; i++) {
      for (let j = 0; j < ROW_LENGTH; j++) {
        let currentTile = newGameBoard[i][j];
        currentTile.noteName = '';
        currentTile.answered = false;
        currentTile.correct = false;
        currentTile.answerIsClose = false;
      }
    }
    setBoard(newGameBoard);

    if (gameWon) setGameWon(false);
    else if (gameLost) setGameLost(false);

    updateCurrentRow(0);
    setCurrentIndex(0);
    generateNewMelody();
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
    gameWon,
    gameLost,
    melodyPlayed,
    setMelodyPlayed,
    updateGameWon,
    updateGameLost,
    getMelody: generateNewMelody,
    updateBoard,
    resetGame,
    updateCurrentRow,
    setCurrentIndex,
  };

  return (
    <gameContext.Provider value={contextValue}>{children}</gameContext.Provider>
  );
};

export const useGameContext = () => useContext(gameContext);
