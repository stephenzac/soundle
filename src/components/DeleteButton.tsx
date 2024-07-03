import { useEffect, useState } from "react";
import { useGameContext, NoteTile } from "../contexts/GameContext";

const BEGINNING_OF_ROW = 0;

const DeleteButton = () => {
  const [buttonClass, setButtonClass] = useState<string>("round-button");

  const {
    currentIndex,
    setCurrentIndex,
    currentRow,
    updateBoard,
    gameWon,
    gameLost,
  } = useGameContext();

  const DeleteNote = () => {
    if (currentIndex > BEGINNING_OF_ROW && !(gameWon || gameLost)) {
      setCurrentIndex(currentIndex - 1);
      const newNote: NoteTile = {
        noteName: "",
        answered: false,
        correct: false,
        answerIsClose: false,
      };
      updateBoard(newNote, currentRow, currentIndex - 1);
    }
  };

  useEffect(() => {
    if (currentIndex > BEGINNING_OF_ROW && !(gameWon || gameLost)) {
      setButtonClass("round-button");
    } else {
      setButtonClass("round-button-unclickable");
    }
  }, [currentIndex, gameWon, gameLost]);

  return (
    <button
      className={buttonClass}
      onClick={DeleteNote}
      aria-label="Delete note"
    >
      ⌫
    </button>
  );
};

export default DeleteButton;
