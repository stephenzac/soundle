import { useEffect, useState } from "react";
import { NoteTile } from "../contexts/GameContext";

type NoteBoxProps = {
  note: NoteTile;
};

const NoteBox = ({ note }: NoteBoxProps) => {
  const [noteDisplayed, setNoteDisplayed] = useState<string>("");
  const [noteClass, setNoteClass] = useState<string>("");

  useEffect(() => {
    if (note.noteName === "") {
      setNoteClass("note-animate");
    } else {
      setNoteDisplayed(note.noteName);
      setNoteClass("note-active");
    }
  }, [note]);

  let noteBoxStyle = "note-box";

  // different states of the NoteBox will render different styles
  if (note.answered) {
    if (note.correct) {
      noteBoxStyle = "note-box-correct";
    } else if (note.answerIsClose) {
      noteBoxStyle = "note-box-close-answer";
    } else {
      noteBoxStyle = "note-box-incorrect";
    }
  }

  return (
    <div className={`${noteBoxStyle}`}>
      <p className={noteClass}>{noteDisplayed}</p>
    </div>
  );
};

export default NoteBox;
