import { use } from 'react';
import { ROW_LENGTH } from '../../../constants/game-board';
import { GameContext } from '../../../contexts/GameContext';
import { SubmitIcon } from './SubmitIcon';

export const SubmitButton: React.FC = () => {
  const { currentIndex, submitGuess, gameWon, gameLost } = use(GameContext);

  const canSubmit = currentIndex === ROW_LENGTH && !(gameWon || gameLost);

  return (
    <button
      className={canSubmit ? 'round-button' : 'round-button-unclickable'}
      onClick={submitGuess}
      aria-label="Submit melody guess"
      aria-keyshortcuts="Enter"
      title="Submit guess (Enter)"
    >
      <SubmitIcon />
    </button>
  );
};
