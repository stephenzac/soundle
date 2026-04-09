import { use, useEffect, useState } from 'react';
import { GameContext } from '../../contexts/GameContext';

export const CorrectAnswer: React.FC = () => {
  const { melody, gameLost } = use(GameContext);
  const [animateClass, setAnimateClass] = useState('modal-animate-in');

  useEffect(() => {
    if (gameLost) setAnimateClass('modal-active');
    else handleClose();
  }, [gameLost]);

  const handleClose = () => setAnimateClass('modal-animate-out');
  return (
    <>
      {gameLost && (
        <div
          className={`flex flex-row items-center gap-4 pixel-correct-answer p-4 text-center ${animateClass}`}
        >
          <img src="./sad-cat.gif" alt="GIF of a sad banana cat crying" width={80} />

          <div className="text-md">
            <p>The correct notes were:</p>
            <p>{Array.from(melody.map((note) => note.noteNotation)).join(', ')}</p>
          </div>
        </div>
      )}
    </>
  );
};
