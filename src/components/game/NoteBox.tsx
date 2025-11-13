import { useEffect, useState } from 'react';
import { NoteTile } from '../../contexts/GameContext';

interface NoteBoxProps {
  currentNote: NoteTile;
}

export const NoteBox: React.FC<NoteBoxProps> = ({ currentNote }) => {
  const [noteDisplayed, setNoteDisplayed] = useState('');
  const [noteClass, setNoteClass] = useState('');
  const [noteBoxStyle, setNoteBoxStyle] = useState('note-box');

  useEffect(() => {
    if (currentNote.note === '') {
      setNoteClass('note-animate');
    } else {
      setNoteDisplayed(currentNote.note.noteNotation);
      setNoteClass('note-active');
    }

    // Different states of the NoteBox will render different styles
    if (currentNote.answered) {
      if (currentNote.correct) {
        setNoteBoxStyle('note-box-correct');
      } else if (currentNote.answerIsClose) {
        setNoteBoxStyle('note-box-close-answer');
      } else {
        setNoteBoxStyle('note-box-incorrect');
      }
    } else {
      setNoteBoxStyle('note-box');
    }
  }, [currentNote.note, currentNote.answered]);

  return (
    <div
      className={`${noteBoxStyle}`}
      aria-label={`Box with ${currentNote.note === '' ? 'nothing' : currentNote.note.noteNotation}`}
    >
      <p className={noteClass}>{noteDisplayed}</p>
    </div>
  );
};
