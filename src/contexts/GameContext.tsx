import { ReactNode, createContext, useContext, useState } from "react";
import { GenerateNotes } from "../GameNotes";

type NoteTile = {
  noteName: string;
  answered: boolean;
  correct: boolean;
  answerIsClose: boolean;
};

type Board = {
  gameBoard: NoteTile[][];
  currentRow: number;
  currentIndex: number;
  melody: string[];
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
};

const gameContext = createContext<Board>({} as Board);

const GameContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  let newGameBoard: NoteTile[][] = [[], [], [], [], [], []];
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      let newTile: NoteTile = {
        noteName: "",
        answered: false,
        correct: false,
        answerIsClose: false,
      };
      newGameBoard[i][j] = newTile;
    }
  }

  const [gameBoard, setBoard] = useState<NoteTile[][]>(newGameBoard);

  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [melody, setMelody] = useState<string[]>(GenerateNotes());
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [gameLost, setGameLost] = useState<boolean>(false);
  const [melodyPlayed, setMelodyPlayed] = useState<boolean>(false);

  const updateGameWon = (newState: boolean) => {
    setGameWon(newState);
    setMelodyPlayed(false);
  };

  const updateGameLost = (newState: boolean) => {
    setGameLost(newState);
    setMelodyPlayed(false);
  };

  const generateNewMelody = (): void => {
    let newNotes: string[] = melody;
    newNotes = GenerateNotes();
    setMelody(newNotes);
  };

  const updateBoard = (note: NoteTile, rowNumber: number, index: number) => {
    let newBoard: NoteTile[][] = gameBoard;
    newBoard[rowNumber][index] = note;
    setBoard(newBoard);
  };

  const resetGame = () => {
    let newGameBoard: NoteTile[][] = [[], [], [], [], [], []];
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 5; j++) {
        newGameBoard[i][j] = {
          noteName: "",
          answered: false,
          correct: false,
          answerIsClose: false,
        };
      }
    }
    setBoard(newGameBoard);

    if (gameWon) {
      setGameWon(false);
    } else if (gameLost) {
      setGameLost(false);
    }
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

const useGameContext = () => {
  return useContext(gameContext);
};

export {
  useGameContext as useGameContext,
  GameContextProvider as GameContextProvider,
};
export type { NoteTile };
