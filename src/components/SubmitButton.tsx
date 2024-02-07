import { useBoardContext } from "../contexts/BoardContext";
import { CheckNotes } from "../GameNotes";

const END_OF_ROW = 5;
const END_OF_BOARD = 4;

const SubmitButton = () => {
  const {
    gameBoard,
    currentRow,
    currentIndex,
    updateCurrentRow,
    updateCurrentIndex,
    melody,
    updateGameWon,
    updateGameLost,
  } = useBoardContext();

  const submit = () => {
    // Check correctness of submitted notes
    if (currentIndex === END_OF_ROW) {
      if (CheckNotes(gameBoard[currentRow], melody)) {
        updateGameWon(true);
      }

      // Incorrect guess, move to next row
      if (currentRow <= END_OF_BOARD) {
        updateCurrentRow(currentRow + 1);

        if (currentRow === END_OF_BOARD) {
          updateGameLost(true);
          return;
        }

        updateCurrentIndex(0);
      }
    }
  };

  return (
    <div className="round-button font-bold" onClick={submit}>
      ✓
    </div>
  );
};

export default SubmitButton;
