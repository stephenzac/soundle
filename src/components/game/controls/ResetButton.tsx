import { use } from 'react';
import { GameContext } from '../../../contexts/GameContext';
import { ResetIcon } from './ResetIcon';

export const ResetButton: React.FC = () => {
  const { resetGame } = use(GameContext);

  return (
    <button
      className="round-button font-bold animate-pulse-fast duration-0"
      onClick={() => resetGame()}
      aria-label="Reset game"
    >
      <ResetIcon />
    </button>
  );
};
