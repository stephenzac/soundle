import { useGameContext, NoteTile } from "../contexts/GameContext";

const BEGINNING_OF_ROW = 0;

const DeleteButton = () => {
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
      };
      updateBoard(newNote, currentRow, currentIndex - 1);
    }
  };

  return (
    <button
      className="round-button"
      onClick={DeleteNote}
      aria-label="Delete note"
    >
      ⌫
    </button>
  );
};

export default DeleteButton;
