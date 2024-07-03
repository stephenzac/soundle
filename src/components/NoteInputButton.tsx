import { NoteTile, useGameContext } from "../contexts/GameContext";

const ROW_LENGTH = 4;

type NoteInputProps = {
  noteName: string;
};

const NoteInputButton = ({ noteName }: NoteInputProps) => {
  const {
    currentRow,
    currentIndex,
    setCurrentIndex,
    updateBoard,
    gameWon,
    gameLost,
  } = useGameContext();

  const InputNote = () => {
    if (!(gameWon || gameLost) && currentIndex <= ROW_LENGTH) {
      setCurrentIndex(currentIndex + 1);
      const newNote: NoteTile = {
        noteName: noteName,
        answered: false,
        correct: false,
        answerIsClose: false,
      };
      updateBoard(newNote, currentRow, currentIndex);
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
