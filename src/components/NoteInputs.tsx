import { musicNotes } from '../constants/notes';
import NoteInputButton from './NoteInputButton';

const NoteInputs: React.FC = () => (
  <div className="w-80 grid grid-cols-6 gap-x-3 gap-y-2 mt-1">
    {musicNotes.map((note) => (
      <NoteInputButton noteName={note} key={note} />
    ))}
  </div>
);

export default NoteInputs;
