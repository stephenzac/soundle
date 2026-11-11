import { use } from 'react';
import { GameNote, NOTE_LABELS, noteLabel } from '../../../constants/notes';
import { GameContext } from '../../../contexts/GameContext';
import { NoteLabel } from '../../game/display/NoteLabel';

interface NoteInputProps {
  note: GameNote;
}

export const NoteInputButton: React.FC<NoteInputProps> = ({ note }) => {
  const { inputNote, settings } = use(GameContext);
  const label = noteLabel(NOTE_LABELS.indexOf(note.noteNotation), settings.accidentals);

  return (
    <button
      className="note-input-button button-animation cursor-pointer relative"
      onClick={() => inputNote(note)}
      aria-label={`Button to input note ${label}`}
    >
      <NoteLabel label={label} variant="superscript" />
    </button>
  );
};
