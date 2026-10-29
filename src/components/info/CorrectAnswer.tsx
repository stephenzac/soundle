import { Fragment, use, useEffect, useState } from 'react';
import { GameContext } from '../../contexts/GameContext';
import { cn } from '../../lib/cn';
import { FlatSign } from '../game/display/FlatSign';

export const CorrectAnswer: React.FC = () => {
  const { melody, gameLost } = use(GameContext);
  const [animateClass, setAnimateClass] = useState<
    'modal-animate-in' | 'modal-active' | 'modal-animate-out'
  >('modal-animate-in');

  useEffect(() => {
    if (gameLost) setAnimateClass('modal-active');
    else handleClose();
  }, [gameLost]);

  const handleClose = () => setAnimateClass('modal-animate-out');

  return (
    <>
      {gameLost && (
        <div
          className={cn(
            'flex flex-row items-center gap-4 pixel-correct-answer p-4 text-center',
            animateClass
          )}
        >
          <img src="./sad-cat.gif" alt="GIF of a sad banana cat crying" width={80} />

          <div>
            <p>The correct notes were:</p>
            <p>
              {melody.map((note, index) => (
                <Fragment key={index}>
                  {index > 0 && ', '}
                  {note.noteNotation[0]}
                  {note.noteNotation.length > 1 && <FlatSign variant="inline" />}
                  {note.octave}
                </Fragment>
              ))}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
