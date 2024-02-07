import { NoteTile } from "../contexts/BoardContext";

interface NoteBoxProps {
  note: NoteTile;
}

const NoteBox = ({ note }: NoteBoxProps) => {
  //TODO: Add colors for guesses

  if (note && note.addedNote) {
    console.log("Animating addition...");
    note.addedNote = false;
  } else if (note && note.deletedNote) {
    console.log("Animating deletion...");
    note.deletedNote = false;
  }

  let noteBoxStyle = "note-box mx-2";

  // different states of the NoteBox will render different styles
  if (note.answered) {
    if (note.correct) {
      noteBoxStyle = "note-box-correct mx-2";
    } else {
      noteBoxStyle = "note-box-incorrect mx-2";
    }
  }

  return (
    <div
      className={`${noteBoxStyle}`}
      onAnimationEnd={() => {
        note.addedNote = false;
        note.deletedNote = false;
      }}
    >
      <div className="">{note.noteName}</div>
    </div>
  );
};

export default NoteBox;
