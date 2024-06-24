import { NoteTile } from "../contexts/GameContext";
import NoteBox from "./NoteBox";

type NoteBoxRowProps = {
  noteRow: NoteTile[];
};

const NoteBoxRow = ({ noteRow }: NoteBoxRowProps) => {
  return (
    <div className="flex flex-row gap-2 place-items-center justify-center h-9">
      {noteRow.map((note, index) => {
        return <NoteBox note={note} key={index} />;
      })}
    </div>
  );
};

export default NoteBoxRow;
