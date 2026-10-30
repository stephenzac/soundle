import { useEffect, useState } from 'react';
import { NoteTile } from '../../../contexts/GameContext';
import { cn } from '../../../lib/cn';
import { FlatSign } from './FlatSign';

interface NoteBoxProps {
  currentNote: NoteTile;
  // The empty tile the next note goes in, marked with a blinking cursor
  isNext: boolean;
}

const NOTE_EXIT_MS = 50;

export const NoteBox: React.FC<NoteBoxProps> = ({ currentNote, isNext }) => {
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
        'size-(--cell) relative',
        !answered && (isNext ? 'note-box-current' : 'note-box'),
        answered && correct && 'note-box-correct',
        answered && !correct && answerIsClose && 'note-box-close-answer',
        answered && !correct && !answerIsClose && 'note-box-incorrect'
      )}
      aria-label={`Box with ${currentNote.note === '' ? 'nothing' : currentNote.note.noteNotation}`}
      aria-current={isNext || undefined}
    >
      {isNext && (
        <span
          className="absolute bottom-[22%] left-1/2 -translate-x-1/2 w-[30%] h-[7%] min-h-0.5 bg-black animate-blink"
          aria-hidden="true"
        />
      )}
      <p className={isEmpty ? 'note-animate' : 'note-active'}>{noteDisplayed[0]}</p>
      {noteDisplayed.length > 1 && <FlatSign variant="superscript" />}
    </div>
  );
};
