import { useBoardContext } from "../contexts/BoardContext";

const ROW_LENGTH = 4;

type NoteInputProps = {
  noteName: string;
};

const NoteInputButton = ({ noteName }: NoteInputProps) => {
  const {
    currentRow,
    currentIndex,
    updateCurrentIndex,
    updateBoard,
    gameWon,
    gameLost,
  } = useBoardContext();

  const InputNote = () => {
    if (!(gameWon || gameLost) && currentIndex <= ROW_LENGTH) {
      updateCurrentIndex(currentIndex + 1);
      updateBoard(noteName, currentRow, currentIndex);
    }
  };

  return (
    <button
      className="note-input-button button-animation mx-2 cursor-pointer"
      onClick={InputNote}
      aria-label={`Input note ${noteName}`}
    >
      {noteName}
    </button>
  );
};

export default NoteInputButton;
