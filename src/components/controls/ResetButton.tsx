import { use } from 'react';
import { GameContext } from '../../contexts/GameContext';

export const ResetButton: React.FC = () => {
  const { resetGame } = use(GameContext);

  return (
    <button
      className='round-button font-bold mr-16 animate-pulse-fast duration-0'
      onClick={resetGame}
      aria-label='Reset game'
    >
      ↺
    </button>
  );
};
