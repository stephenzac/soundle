import { ReactNode, createContext, useContext, useState } from "react";
import { GenerateNotes } from "../GameNotes";

interface NoteTile {
    noteName: string;
    addedNote: boolean;
    deletedNote: boolean;
}

interface Board {
    gameBoard: string[][];
    currentRow: number;
    currentIndex: number;
    melody: string[];
    getMelody: () => void;
    updateBoard: (note: string, rowNumber: number, index: number)  => void;
    removeFromBoard: () => void;
    resetGame: () => void;
    updateCurrentRow: (newRow: number) => void;
    updateCurrentIndex: (newIndex: number) => void;
}

const boardContext = createContext<Board | undefined>(undefined);

const BoardContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ gameBoard, setBoard ] = useState<string[][]>([[], [], [], [], []]);
    const [ currentRow, setCurrentRow ] = useState<number>(0);
    const [ currentIndex, setCurrentIndex ] = useState<number>(0);
    const [ melody, setMelody] = useState<string[]>(GenerateNotes());

    const getMelody = (): void => {
        let newNotes: string[] = melody;
        newNotes = GenerateNotes();
        setMelody(newNotes);
    }

    const updateBoard = (note: string, rowNumber: number, index: number): void => {
        let newBoard: string[][] = gameBoard;
        newBoard[rowNumber][index] = note;
        setBoard(newBoard);
    }

    const removeFromBoard = (): void => {
        gameBoard[currentRow].pop();
    }

    const resetGame = () => {
        setBoard([[], [], [], [], []]);
        updateCurrentRow(0);
        updateCurrentIndex(0);
        getMelody();
    }

    const updateCurrentRow = (newRow: number): void => {
        setCurrentRow(newRow);
    }

    const updateCurrentIndex = (newIndex: number): void => {
        setCurrentIndex(newIndex);
    }

    const contextValue: Board = {
        gameBoard,
        currentRow,
        currentIndex,
        melody,
        getMelody,
        updateBoard,
        removeFromBoard,
        resetGame,
        updateCurrentRow,
        updateCurrentIndex
    };

    return (
        <boardContext.Provider value={contextValue}>
            {children}
        </boardContext.Provider>
    );
};

const useBoardContext = () => {
    return useContext(boardContext);
}

export {useBoardContext, BoardContextProvider}
