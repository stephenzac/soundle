import { NoteTile } from "../contexts/BoardContext";

interface NoteBoxProps {
  note: NoteTile;
}

const NoteBox = ({ note }: NoteBoxProps) => {
  let noteBoxStyle = "note-box mx-2";

  // different states of the NoteBox will render different styles
  if (note.answered) {
    if (note.correct) {
      noteBoxStyle = "note-box-correct mx-2 transition-all ease-in";
    } else {
      noteBoxStyle = "note-box-incorrect mx-2 transition-all ease-in";
    }
  }

  return (
    <div className={`${noteBoxStyle}`}>
      <div className="">{note.noteName}</div>
    </div>
  );
};

export default NoteBox;
