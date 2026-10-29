import { use } from 'react';
import { GameContext } from '../../contexts/GameContext';

export const HappyCat: React.FC = () => {
  const { gameWon } = use(GameContext);

  return (
    <>
      {gameWon && (
        <div className="absolute top-0 left-1/2 z-10">
          <img
            className="w-[calc(var(--cell)*2.25)]"
            src="./happy-cat.gif"
            alt="GIF of happy cat dancing"
          />
        </div>
      )}
    </>
  );
};
