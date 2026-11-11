import { use, useEffect, useState } from 'react';
import { GameContext, NoteTile } from '../../../contexts/GameContext';
import { NOTE_LABELS, noteLabel, transposeNote } from '../../../constants/notes';
import { cn } from '../../../lib/cn';
import { AccidentalSign } from './NoteLabel';
import { HintArrow } from './HintArrow';

interface NoteBoxProps {
  currentNote: NoteTile;
  // The empty tile the next note goes in, marked with a blinking cursor
  isNext: boolean;
  // A just-submitted tile that hasn't turned over yet, so its result stays hidden
  concealed: boolean;
  // Turning over to show its result
  flipping: boolean;
  // Its tone is playing during a replay
  highlighted: boolean;
}

const NOTE_EXIT_MS = 50;

export const NoteBox: React.FC<NoteBoxProps> = ({
  currentNote,
  isNext,
  concealed,
  flipping,
  highlighted,
}) => {
  const { transposition, settings } = use(GameContext);
  const [noteDisplayed, setNoteDisplayed] = useState('');
  // Tiles hold concert notes; the name shown follows the chosen pitch and accidentals
  const noteName =
    currentNote.note === ''
      ? ''
      : noteLabel(
          NOTE_LABELS.indexOf(transposeNote(currentNote.note, transposition).noteNotation),
          settings.accidentals
        );

  const isEmpty = currentNote.note === '';
  const { correct, closeDirection } = currentNote;
  const answered = currentNote.answered && !concealed;

  useEffect(() => {
    if (noteName === '') {
      const clearAfterExit = window.setTimeout(() => {
        setNoteDisplayed('');
      }, NOTE_EXIT_MS);
      return () => clearTimeout(clearAfterExit);
    }

    setNoteDisplayed(noteName);
  }, [noteName]);

  return (
    <div
      className={cn(
        'size-(--cell) relative',
        !answered && (isNext ? 'note-box-current' : 'note-box'),
        answered && correct && 'note-box-correct',
        answered && !correct && closeDirection && 'note-box-close-answer',
        answered && !correct && !closeDirection && 'note-box-incorrect',
        flipping && 'motion-safe:animate-flip',
        highlighted && 'z-10 scale-110 outline-3 outline-[#ffeb3b]'
      )}
      aria-label={`Box with ${noteName === '' ? 'nothing' : noteName}${
        !answered
          ? ''
          : correct
            ? ', correct'
            : closeDirection
              ? `, a half step ${closeDirection === 'up' ? 'low' : 'high'}`
              : ', wrong'
      }`}
      aria-current={isNext || undefined}
    >
      {isNext && (
        <span
          className="absolute bottom-[22%] left-1/2 -translate-x-1/2 w-[30%] h-[7%] min-h-0.5 bg-black animate-blink"
          aria-hidden="true"
        />
      )}
      <p className={isEmpty ? 'note-animate' : 'note-active'}>{noteDisplayed[0]}</p>
      <AccidentalSign symbol={noteDisplayed[1]} variant="superscript" />
      {answered && closeDirection && <HintArrow direction={closeDirection} />}
    </div>
  );
};
