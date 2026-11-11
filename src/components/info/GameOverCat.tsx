import { use } from 'react';
import { GameContext } from '../../contexts/GameContext';

// A cat over the board when the game ends: dancing for a win, crying for a loss
export const GameOverCat: React.FC = () => {
  const { gameWon, gameLost } = use(GameContext);
  if (!(gameWon || gameLost)) return null;

  return (
    <div className="absolute top-0 left-1/2 z-10">
      <img
        className="w-[calc(var(--cell)*2.25)]"
        src={gameWon ? './happy-cat.gif' : './sad-cat.gif'}
        alt={gameWon ? 'GIF of happy cat dancing' : 'GIF of a sad banana cat crying'}
      />
    </div>
  );
};
