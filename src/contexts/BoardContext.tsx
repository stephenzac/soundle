import { ReactNode, createContext, useContext, useState } from "react";
import { GenerateNotes } from "../GameNotes";

interface NoteTile {
  noteName: string;
  addedNote: boolean;
  deletedNote: boolean;
  answered: boolean;
  correct: boolean;
}

interface Board {
  gameBoard: NoteTile[][];
  currentRow: number;
  currentIndex: number;
  melody: string[];
  gameWon: boolean;
  gameLost: boolean;
  updateGameWon: (newState: boolean) => void;
  updateGameLost: (newState: boolean) => void;
  getMelody: () => void;
  updateBoard: (note: string, rowNumber: number, index: number) => void;
  removeFromBoard: () => void;
  resetGame: () => void;
  updateCurrentRow: (newRow: number) => void;
  updateCurrentIndex: (newIndex: number) => void;
}

const boardContext = createContext<Board>({} as Board);

const BoardContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [gameBoard, setBoard] = useState<NoteTile[][]>([
    [
      {
        noteName: "",
        addedNote: false,
        deletedNote: false,
        answered: false,
        correct: false,
      },
      {
        noteName: "",
        addedNote: false,
        deletedNote: false,
        answered: false,
        correct: false,
      },
      {
        noteName: "",
        addedNote: false,
        deletedNote: false,
        answered: false,
        correct: false,
      },
      {
        noteName: "",
        addedNote: false,
        deletedNote: false,
        answered: false,
        correct: false,
      },
      {
        noteName: "",
        addedNote: false,
        deletedNote: false,
        answered: false,
        correct: false,
      },
    ],
    [
      {
        noteName: "",
        addedNote: false,
        deletedNote: false,
        answered: false,
        correct: false,
      },
      {
        noteName: "",
        addedNote: false,
        deletedNote: false,
        answered: false,
        correct: false,
      },
      {
        noteName: "",
        addedNote: false,
        deletedNote: false,
        answered: false,
        correct: false,
      },
      {
        noteName: "",
        addedNote: false,
        deletedNote: false,
        answered: false,
        correct: false,
      },
      {
        noteName: "",
        addedNote: false,
        deletedNote: false,
        answered: false,
        correct: false,
      },
    ],
    [
      {
        noteName: "",
        addedNote: false,
        deletedNote: false,
        answered: false,
        correct: false,
      },
      {
        noteName: "",
        addedNote: false,
        deletedNote: false,
        answered: false,
        correct: false,
      },
      {
        noteName: "",
        addedNote: false,
        deletedNote: false,
        answered: false,
        correct: false,
      },
      {
        noteName: "",
        addedNote: false,
        deletedNote: false,
        answered: false,
        correct: false,
      },
      {
        noteName: "",
        addedNote: false,
        deletedNote: false,
        answered: false,
        correct: false,
      },
    ],
    [
      {
        noteName: "",
        addedNote: false,
        deletedNote: false,
        answered: false,
        correct: false,
      },
      {
        noteName: "",
        addedNote: false,
        deletedNote: false,
        answered: false,
        correct: false,
      },
      {
        noteName: "",
        addedNote: false,
        deletedNote: false,
        answered: false,
        correct: false,
      },
      {
        noteName: "",
        addedNote: false,
        deletedNote: false,
        answered: false,
        correct: false,
      },
      {
        noteName: "",
        addedNote: false,
        deletedNote: false,
        answered: false,
        correct: false,
      },
    ],
    [
      {
        noteName: "",
        addedNote: false,
        deletedNote: false,
        answered: false,
        correct: false,
      },
      {
        noteName: "",
        addedNote: false,
        deletedNote: false,
        answered: false,
        correct: false,
      },
      {
        noteName: "",
        addedNote: false,
        deletedNote: false,
        answered: false,
        correct: false,
      },
      {
        noteName: "",
        addedNote: false,
        deletedNote: false,
        answered: false,
        correct: false,
      },
      {
        noteName: "",
        addedNote: false,
        deletedNote: false,
        answered: false,
        correct: false,
      },
    ],
  ]);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [melody, setMelody] = useState<string[]>(GenerateNotes());
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [gameLost, setGameLost] = useState<boolean>(false);

  const updateGameWon = (newState: boolean) => {
    setGameWon(newState);
  };

  const updateGameLost = (newState: boolean) => {
    setGameLost(newState);
  };

  const getMelody = (): void => {
    let newNotes: string[] = melody;
    newNotes = GenerateNotes();
    setMelody(newNotes);
  };

  const updateBoard = (
    note: string,
    rowNumber: number,
    index: number
  ): void => {
    let newBoard: NoteTile[][] = gameBoard;
    let newNote: NoteTile = {
      noteName: note,
      addedNote: true,
      deletedNote: false,
      answered: false,
      correct: false,
    };
    newBoard[rowNumber][index] = newNote;
    setBoard(newBoard);
  };

  const removeFromBoard = (): void => {
    gameBoard[currentRow][currentIndex - 1].deletedNote = true;
    gameBoard[currentRow][currentIndex - 1].noteName = "";
    updateCurrentIndex(currentIndex - 1);
  };

  const resetGame = () => {
    setBoard([
      [
        {
          noteName: "",
          addedNote: false,
          deletedNote: false,
          answered: false,
          correct: false,
        },
        {
          noteName: "",
          addedNote: false,
          deletedNote: false,
          answered: false,
          correct: false,
        },
        {
          noteName: "",
          addedNote: false,
          deletedNote: false,
          answered: false,
          correct: false,
        },
        {
          noteName: "",
          addedNote: false,
          deletedNote: false,
          answered: false,
          correct: false,
        },
        {
          noteName: "",
          addedNote: false,
          deletedNote: false,
          answered: false,
          correct: false,
        },
      ],
      [
        {
          noteName: "",
          addedNote: false,
          deletedNote: false,
          answered: false,
          correct: false,
        },
        {
          noteName: "",
          addedNote: false,
          deletedNote: false,
          answered: false,
          correct: false,
        },
        {
          noteName: "",
          addedNote: false,
          deletedNote: false,
          answered: false,
          correct: false,
        },
        {
          noteName: "",
          addedNote: false,
          deletedNote: false,
          answered: false,
          correct: false,
        },
        {
          noteName: "",
          addedNote: false,
          deletedNote: false,
          answered: false,
          correct: false,
        },
      ],
      [
        {
          noteName: "",
          addedNote: false,
          deletedNote: false,
          answered: false,
          correct: false,
        },
        {
          noteName: "",
          addedNote: false,
          deletedNote: false,
          answered: false,
          correct: false,
        },
        {
          noteName: "",
          addedNote: false,
          deletedNote: false,
          answered: false,
          correct: false,
        },
        {
          noteName: "",
          addedNote: false,
          deletedNote: false,
          answered: false,
          correct: false,
        },
        {
          noteName: "",
          addedNote: false,
          deletedNote: false,
          answered: false,
          correct: false,
        },
      ],
      [
        {
          noteName: "",
          addedNote: false,
          deletedNote: false,
          answered: false,
          correct: false,
        },
        {
          noteName: "",
          addedNote: false,
          deletedNote: false,
          answered: false,
          correct: false,
        },
        {
          noteName: "",
          addedNote: false,
          deletedNote: false,
          answered: false,
          correct: false,
        },
        {
          noteName: "",
          addedNote: false,
          deletedNote: false,
          answered: false,
          correct: false,
        },
        {
          noteName: "",
          addedNote: false,
          deletedNote: false,
          answered: false,
          correct: false,
        },
      ],
      [
        {
          noteName: "",
          addedNote: false,
          deletedNote: false,
          answered: false,
          correct: false,
        },
        {
          noteName: "",
          addedNote: false,
          deletedNote: false,
          answered: false,
          correct: false,
        },
        {
          noteName: "",
          addedNote: false,
          deletedNote: false,
          answered: false,
          correct: false,
        },
        {
          noteName: "",
          addedNote: false,
          deletedNote: false,
          answered: false,
          correct: false,
        },
        {
          noteName: "",
          addedNote: false,
          deletedNote: false,
          answered: false,
          correct: false,
        },
      ],
    ]);
    if (gameWon) {
      setGameWon(false);
    } else if (gameLost) {
      setGameLost(false);
    }
    updateCurrentRow(0);
    updateCurrentIndex(0);
    getMelody();
  };

  const updateCurrentRow = (newRow: number): void => {
    setCurrentRow(newRow);
  };

  const updateCurrentIndex = (newIndex: number): void => {
    setCurrentIndex(newIndex);
  };

  const contextValue: Board = {
    gameBoard,
    currentRow,
    currentIndex,
    melody,
    gameWon,
    gameLost,
    updateGameWon,
    updateGameLost,
    getMelody,
    updateBoard,
    removeFromBoard,
    resetGame,
    updateCurrentRow,
    updateCurrentIndex,
  };

  return (
    <boardContext.Provider value={contextValue}>
      {children}
    </boardContext.Provider>
  );
};

const useBoardContext = () => {
  return useContext(boardContext);
};

export { useBoardContext, BoardContextProvider };
export type { NoteTile };
