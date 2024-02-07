import { useBoardContext } from "../contexts/BoardContext";

const ROW_LENGTH = 4;

interface NoteInputProps {
  noteName: string;
}

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
    <div
      className="note-box button-animation mx-2 cursor-pointer"
      onClick={InputNote}
    >
      {noteName}
    </div>
  );
};

export default NoteInputButton;
