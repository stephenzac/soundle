import { useEffect, useState } from 'react';
import { useGameContext } from '../../contexts/GameContext';
import { checkNotes } from '../../lib/GameNotes';
import { NUM_ROWS, ROW_LENGTH } from '../../constants/game-board';

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
  } = useGameContext();

  const [buttonClass, setButtonClass] = useState<string>(
    'round-button-unclickable'
  );

  useEffect(() => {
    if (currentIndex === ROW_LENGTH) {
      setButtonClass('round-button');
    } else {
      if (buttonClass != 'round-button-unclickable')
        setButtonClass('round-button-unclickable');
    }

    if (gameWon || gameLost) setButtonClass('round-button-unclickable');
  }, [currentIndex, gameWon, gameLost]);

  const submit = () => {
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

  return (
    <button
      className={buttonClass}
      onClick={submit}
      aria-label='Submit melody guess'
    >
      ✓
    </button>
  );
};
