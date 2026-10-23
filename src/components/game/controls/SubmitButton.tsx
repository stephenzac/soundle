import { use } from 'react';

import { checkNotes } from '../../../lib/GameNotes';
import { NUM_ROWS, ROW_LENGTH } from '../../../constants/game-board';
import { GameContext } from '../../../contexts/GameContext';

export const SubmitButton: React.FC = () => {
  const {
    gameBoard,
    currentRow,
    currentIndex,
    updateCurrentRow,
    setCurrentIndex,
    melody,
    gameWon,
    gameLost,
    updateGameWon,
    updateGameLost,
  } = use(GameContext);

  const canSubmit = currentIndex === ROW_LENGTH && !(gameWon || gameLost);

  const handleSubmit = () => {
    if (gameWon || gameLost) return;

    // Check correctness of submitted notes
    if (currentIndex === ROW_LENGTH) {
      if (checkNotes(gameBoard[currentRow], melody)) {
        updateGameWon(true);
        return;
      }

      // Incorrect guess, move to next row
      if (currentRow <= NUM_ROWS - 1) {
        updateCurrentRow(currentRow + 1);

        if (currentRow === NUM_ROWS - 1) {
          updateGameLost(true);
          return;
        }

        // Back to beginning of row after moving to next row
        setCurrentIndex(0);
      }
    }
  };

  const buttonClassName = canSubmit ? 'round-button' : 'round-button-unclickable'

  return (
    <button
      className={buttonClassName}
      onClick={handleSubmit}
      aria-label="Submit melody guess"
    >
      ✓
    </button>
  );
};
