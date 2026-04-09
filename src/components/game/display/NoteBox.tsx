import { useCallback, useEffect, useState } from 'react';
import { NoteTile } from '../../../contexts/GameContext';

interface NoteBoxProps {
  currentNote: NoteTile;
}

const NOTE_EXIT_MS = 50;

export const NoteBox: React.FC<NoteBoxProps> = ({ currentNote }) => {
  const [noteDisplayed, setNoteDisplayed] = useState('');
  const [noteClass, setNoteClass] = useState('');
  const [noteBoxStyle, setNoteBoxStyle] = useState('note-box h-[50px] relative');

  const updateNoteboxStyle = useCallback(() => {
    if (currentNote.answered) {
      if (currentNote.correct) {
        setNoteBoxStyle('note-box-correct h-[50px] relative');
      } else if (currentNote.answerIsClose) {
        setNoteBoxStyle('note-box-close-answer h-[50px] relative');
      } else {
        setNoteBoxStyle('note-box-incorrect h-[50px] relative');
      }
    } else {
      setNoteBoxStyle('note-box h-[50px] relative');
    }
  }, [currentNote.answered, currentNote.correct, currentNote.answerIsClose]);

  useEffect(() => {
    if (currentNote.note === '') {
      setNoteClass('note-animate');
      const clearAfterExit = window.setTimeout(() => {
        setNoteDisplayed('');
      }, NOTE_EXIT_MS);
      updateNoteboxStyle();
      return () => clearTimeout(clearAfterExit);
    }

    setNoteDisplayed(currentNote.note.noteNotation);
    setNoteClass('note-active');
    updateNoteboxStyle();
  }, [currentNote.note, currentNote.answered, updateNoteboxStyle]);

  return (
    <div
      className={`${noteBoxStyle}`}
      aria-label={`Box with ${currentNote.note === '' ? 'nothing' : currentNote.note.noteNotation}`}
    >
      <p className={noteClass}>{noteDisplayed[0]}</p>
      {noteDisplayed.length > 1 && (
        <span className="absolute top-1 right-0.5 text-s">{noteDisplayed[1]}</span>
      )}
    </div>
  );
};
