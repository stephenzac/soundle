import { use } from 'react';
import { GameContext } from '../../../contexts/GameContext';

export const ResetButton: React.FC = () => {
  const { resetGame } = use(GameContext);

  return (
    <button
      className="round-button font-bold animate-pulse-fast duration-0"
      onClick={resetGame}
      aria-label="Reset game"
    >
      <span className="relative -top-0.5 text-[1.25em] leading-none">↺</span>
    </button>
  );
};
