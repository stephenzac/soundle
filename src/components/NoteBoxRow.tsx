import { NoteTile } from "../contexts/BoardContext";
import NoteBox from "./NoteBox";

interface NoteBoxRowProps {
  noteRow: NoteTile[];
}

const NoteBoxRow = ({ noteRow }: NoteBoxRowProps) => {
  return (
    <div className="flex justify-center h-6 my-5">
      {noteRow.map((note, index) => {
        return <NoteBox note={note} key={index} />;
      })}
    </div>
  );
};

export default NoteBoxRow;
