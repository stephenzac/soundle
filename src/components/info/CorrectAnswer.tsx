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
          className={`flex flex-row items-center gap-4 bg-gray-900 p-3 rounded-md border-2 border-slate-300 text-center font-bold text-xl ${animateClass}`}
        >
          <img
            src='./sad-cat.gif'
            alt='GIF of a sad banana cat crying'
            width={80}
          />

          <div>
            <p>The correct notes were:</p>
            <p>{melody.join(', ')}</p>
          </div>
        </div>
      )}
    </>
  );
};
