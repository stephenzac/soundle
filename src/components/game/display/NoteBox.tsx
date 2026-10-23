import { useEffect, useState } from 'react';
import { NoteTile } from '../../../contexts/GameContext';
import { cn } from '../../../lib/cn';

interface NoteBoxProps {
  currentNote: NoteTile;
}

const NOTE_EXIT_MS = 50;

export const NoteBox: React.FC<NoteBoxProps> = ({ currentNote }) => {
  const [noteDisplayed, setNoteDisplayed] = useState('');

  const isEmpty = currentNote.note === '';
  const { answered, correct, answerIsClose } = currentNote;

  useEffect(() => {
    if (currentNote.note === '') {
      const clearAfterExit = window.setTimeout(() => {
        setNoteDisplayed('');
      }, NOTE_EXIT_MS);
      return () => clearTimeout(clearAfterExit);
    }

    setNoteDisplayed(currentNote.note.noteNotation);
  }, [currentNote.note]);

  return (
    <div
      className={cn(
        'h-12.5 relative',
        !answered && 'note-box',
        answered && correct && 'note-box-correct',
        answered && !correct && answerIsClose && 'note-box-close-answer',
        answered && !correct && !answerIsClose && 'note-box-incorrect'
      )}
      aria-label={`Box with ${currentNote.note === '' ? 'nothing' : currentNote.note.noteNotation}`}
    >
      <p className={isEmpty ? 'note-animate' : 'note-active'}>{noteDisplayed[0]}</p>
      {noteDisplayed.length > 1 && (
        <span className="absolute top-1 right-0.5 text-s">{noteDisplayed[1]}</span>
      )}
    </div>
  );
};
