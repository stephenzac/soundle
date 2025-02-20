import { use, useContext } from 'react';
import { GameContext } from '../../contexts/GameContext';

export const HappyCat: React.FC = () => {
  const { gameWon } = use(GameContext);

  return (
    <>
      {gameWon && (
        <div className='absolute left-1/2'>
          <img
            className='w-28'
            src='./happy-cat.gif'
            alt='GIF of happy cat dancing'
          />
        </div>
      )}
    </>
  );
};
