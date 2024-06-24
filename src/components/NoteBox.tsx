import { useEffect, useState } from "react";
import { NoteTile } from "../contexts/GameContext";

type NoteBoxProps = {
  note: NoteTile;
};

const NoteBox = ({ note }: NoteBoxProps) => {
  const [noteClass, setNoteClass] = useState<string>("note-animate-in");

  useEffect(() => {
    if (note.noteName === "") {
      setNoteClass("note-animate-in");
      console.log("Note is now empty");
    } else {
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
      <p className={noteClass}>{note.noteName}</p>
    </div>
  );
};

export default NoteBox;
