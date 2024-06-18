import { NoteTile } from "../contexts/BoardContext";

interface NoteBoxProps {
  note: NoteTile;
}

const NoteBox = ({ note }: NoteBoxProps) => {
  let noteBoxStyle = "note-box mx-2";

  // TODO: Add different colors for right note, wrong spot

  // different states of the NoteBox will render different styles
  if (note.answered) {
    noteBoxStyle = `note-box-${
      note.correct ? "correct" : "incorrect"
    } mx-2 transition-all ease-in duration-350`;
  }

  return (
    <div className={`${noteBoxStyle}`}>
      <div className="">{note.noteName}</div>
    </div>
  );
};

export default NoteBox;
