import { useGameContext } from "../contexts/GameContext";
import { CheckNotes } from "../GameNotes";

const END_OF_ROW = 5;
const END_OF_BOARD = 5;

const SubmitButton = () => {
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

  const submit = () => {
    if (gameWon || gameLost) {
      return;
    }
    // Check correctness of submitted notes
    if (currentIndex === END_OF_ROW) {
      if (CheckNotes(gameBoard[currentRow], melody)) {
        updateGameWon(true);
        return;
      }

      // Incorrect guess, move to next row
      if (currentRow <= END_OF_BOARD) {
        updateCurrentRow(currentRow + 1);

        if (currentRow === END_OF_BOARD) {
          updateGameLost(true);
          return;
        }

        setCurrentIndex(0);
      }
    }
  };

  return (
    <button
      className="round-button font-bold"
      onClick={submit}
      aria-label="Submit melody guess"
    >
      ✓
    </button>
  );
};

export default SubmitButton;
