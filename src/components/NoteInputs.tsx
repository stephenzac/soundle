import { musicNotes } from '../constants/notes';
import NoteInputButton from './NoteInputButton';

const NoteInputs: React.FC = () => (
  <div className="w-11/12 grid grid-cols-6 gap-y-2">
    {musicNotes.map((note) => (
      <NoteInputButton noteName={note} key={note} />
    ))}
  </div>
);

export default NoteInputs;
