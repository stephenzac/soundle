import { useEffect, useState } from 'react';
import { NoteTile } from '../../contexts/GameContext';

interface NoteBoxProps {
  note: NoteTile;
}

export const NoteBox: React.FC<NoteBoxProps> = ({ note }) => {
  const [noteDisplayed, setNoteDisplayed] = useState<string>('');
  const [noteClass, setNoteClass] = useState<string>('');
  const [noteBoxStyle, setNoteBoxStyle] = useState<string>('note-box');

  useEffect(() => {
    // Render the note name
    if (note.noteName === '') {
      setNoteClass('note-animate');
    } else {
      setNoteDisplayed(note.noteName);
      setNoteClass('note-active');
    }

    // Different states of the NoteBox will render different styles
    if (note.answered) {
      if (note.correct) {
        setNoteBoxStyle('note-box-correct');
      } else if (note.answerIsClose) {
        setNoteBoxStyle('note-box-close-answer');
      } else {
        setNoteBoxStyle('note-box-incorrect');
      }
    } else {
      setNoteBoxStyle('note-box');
    }
  }, [note, note.answered]);

  return (
    <div className={`${noteBoxStyle}`} aria-label={`Box with ${note}`}>
      <p className={noteClass}>{noteDisplayed}</p>
    </div>
  );
};
