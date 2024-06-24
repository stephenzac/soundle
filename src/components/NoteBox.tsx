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

  // TODO: Add different colors for right note, wrong spot

  // different states of the NoteBox will render different styles
  if (note.answered) {
    noteBoxStyle = `note-box-${
      note.correct ? "correct" : "incorrect"
    } transition-all ease-in duration-350`;
  }

  return (
    <div className={`${noteBoxStyle}`}>
      <p className={noteClass}>{noteDisplayed}</p>
    </div>
  );
};

export default NoteBox;
