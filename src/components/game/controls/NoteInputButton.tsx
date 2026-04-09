import { use } from 'react';
import { ROW_LENGTH } from '../../../constants/game-board';
import { GameNote } from '../../../constants/notes';
import { GameContext, NoteTile } from '../../../contexts/GameContext';

interface NoteInputProps {
  note: GameNote;
}

export const NoteInputButton: React.FC<NoteInputProps> = ({ note }) => {
  const { currentRow, currentIndex, setCurrentIndex, updateBoard, gameWon, gameLost } =
    use(GameContext);

  const inputNote = () => {
    if (currentIndex >= ROW_LENGTH || gameWon || gameLost) return;
    setCurrentIndex(currentIndex + 1);

    const newNote: NoteTile = {
      note,
      answered: false,
      correct: false,
      answerIsClose: false,
    };
    updateBoard(newNote, currentRow, currentIndex);
  };

  return (
    <button
      className="note-input-button button-animation cursor-pointer relative"
      onClick={inputNote}
      aria-label={`Button to input note ${note.noteNotation}`}
    >
      {note.noteNotation[0]}
      <span className="absolute top-1 right-0.5 text-s">{note.noteNotation[1]}</span>
    </button>
  );
};
