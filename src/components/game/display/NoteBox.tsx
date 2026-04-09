import { useCallback, useEffect, useState } from 'react';
import { NoteTile } from '../../../contexts/GameContext';

interface NoteBoxProps {
  currentNote: NoteTile;
}

export const NoteBox: React.FC<NoteBoxProps> = ({ currentNote }) => {
  const [noteDisplayed, setNoteDisplayed] = useState('');
  const [noteClass, setNoteClass] = useState('');
  const [noteBoxStyle, setNoteBoxStyle] = useState('note-box h-[50px]');

  const updateNoteboxStyle = useCallback(() => {
    if (currentNote.answered) {
      if (currentNote.correct) {
        setNoteBoxStyle('note-box-correct h-[50px]');
      } else if (currentNote.answerIsClose) {
        setNoteBoxStyle('note-box-close-answer h-[50px]');
      } else {
        setNoteBoxStyle('note-box-incorrect h-[50px]');
      }
    } else {
      setNoteBoxStyle('note-box h-[50px]');
    }
  }, [currentNote.answered, currentNote.correct, currentNote.answerIsClose]);

  useEffect(() => {
    if (currentNote.note === '') {
      setNoteClass('note-animate');
    } else {
      setNoteDisplayed(currentNote.note.noteNotation);
      setNoteClass('note-active');
    }

    updateNoteboxStyle();
  }, [currentNote.note, currentNote.answered, updateNoteboxStyle]);

  return (
    <div
      className={`${noteBoxStyle}`}
      aria-label={`Box with ${currentNote.note === '' ? 'nothing' : currentNote.note.noteNotation}`}
    >
      <p className={noteClass}>{noteDisplayed}</p>
    </div>
  );
};
