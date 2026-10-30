import { Fragment, use, useEffect, useState } from 'react';
import { GameContext } from '../../contexts/GameContext';
import { cn } from '../../lib/cn';
import { NoteName } from '../game/display/NoteName';
import { FlatSign } from '../game/display/FlatSign';
import { NOTE_LABELS } from '../../constants/notes';
import { NUM_ROWS } from '../../constants/game-board';
import { midiFromParts } from '../../lib/pitch';

// Shown in the keypad's place once a game ends: how it went and what the melody was (as tiles
// after a loss). It's sized to the keypad so the layout doesn't shift, and grows only if its
// content needs more room.
export const GameResult: React.FC = () => {
  const { melody, gameWon, gameLost, currentRow } = use(GameContext);
  const [entered, setEntered] = useState(false);

  // Wait a frame so the starting styles paint before transitioning in
  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className={cn(
        'flex flex-col justify-center gap-2 pixel-correct-answer p-3 text-left leading-relaxed',
        'w-[calc(var(--key)*6+var(--key-gap)*5)] min-h-[calc(var(--key)*2+var(--key-gap))]',
        entered ? 'modal-active' : 'modal-animate-in'
      )}
      role="status"
    >
      {/* The winning guess doesn't advance the row, so its index is the tries used minus one */}
      <p className="main-header">
        {gameWon ? `Solved in ${currentRow + 1}/${NUM_ROWS}!` : 'Out of tries'}
      </p>
      {/* A loss shows the answer as tiles, like a row of the board; a win already has it there */}
      <p className={cn(gameLost && 'sr-only')}>
        The notes were{' '}
        {melody.map((note, index) => (
          <Fragment key={index}>
            {index > 0 && ', '}
            {/* Keeps a note like "G♭4" from breaking across lines */}
            <span className="whitespace-nowrap">
              <NoteName midi={midiFromParts(NOTE_LABELS.indexOf(note.noteNotation), note.octave)} />
            </span>
          </Fragment>
        ))}
        .
      </p>
      {gameLost && (
        <div className="flex gap-[calc(var(--key)*0.12)]" aria-hidden="true">
          {melody.map((note, index) => (
            <div
              className="note-box-correct relative size-[calc(var(--key)*0.75)] [--tile-font:calc(var(--key)*0.75*0.3)]"
              key={index}
            >
              {note.noteNotation[0]}
              {note.noteNotation.length > 1 && <FlatSign variant="superscript" />}
              <span className="absolute right-[10%] bottom-[8%] text-[0.55em]">{note.octave}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
