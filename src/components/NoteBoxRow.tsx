import { NoteTile } from '../contexts/GameContext';
import NoteBox from './NoteBox';

interface NoteBoxRowProps {
  noteRow: NoteTile[];
}

const NoteBoxRow: React.FC<NoteBoxRowProps> = ({ noteRow }) => (
  <div className="flex flex-row gap-2 place-items-center justify-center h-9">
    {noteRow.map((note, index) => (
      <NoteBox note={note} key={index} />
    ))}
  </div>
);

export default NoteBoxRow;
