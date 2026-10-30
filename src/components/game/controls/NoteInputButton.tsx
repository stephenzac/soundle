import { use } from 'react';
import { GameNote } from '../../../constants/notes';
import { GameContext } from '../../../contexts/GameContext';
import { FlatSign } from '../../game/display/FlatSign';

interface NoteInputProps {
  note: GameNote;
}

export const NoteInputButton: React.FC<NoteInputProps> = ({ note }) => {
  const { inputNote } = use(GameContext);

  return (
    <button
      className="note-input-button button-animation cursor-pointer relative"
      onClick={() => inputNote(note)}
      aria-label={`Button to input note ${note.noteNotation}`}
    >
      {note.noteNotation[0]}
      {note.noteNotation.length > 1 && <FlatSign variant="superscript" />}
    </button>
  );
};
