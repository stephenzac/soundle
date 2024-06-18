import { useBoardContext } from "../contexts/BoardContext";

const BEGINNING_OF_ROW = 0;

const DeleteButton = () => {
  const { currentIndex, removeFromBoard, gameWon, gameLost } =
    useBoardContext();

  const DeleteNote = () => {
    if (currentIndex > BEGINNING_OF_ROW && !(gameWon || gameLost)) {
      removeFromBoard();
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
