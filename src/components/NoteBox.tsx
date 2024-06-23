import { NoteTile } from "../contexts/BoardContext";

type NoteBoxProps = {
  note: NoteTile;
};

const NoteBox = ({ note }: NoteBoxProps) => {
  let noteBoxStyle = "note-box";

  // TODO: Add different colors for right note, wrong spot

  // different states of the NoteBox will render different styles
  if (note.answered) {
    noteBoxStyle = `note-box-${
      note.correct ? "correct" : "incorrect"
    } transition-all ease-in duration-350`;
  }

  return (
    <div className={`${noteBoxStyle}`}>
      <p>{note.noteName}</p>
    </div>
  );
};

export default NoteBox;
