import { useEffect, useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import { CheckNotes } from "../GameNotes";

const END_OF_ROW = 5;
const END_OF_BOARD = 5;

const SubmitButton: React.FC = () => {
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
    "round-button-unclickable"
  );

  useEffect(() => {
    if (currentIndex === END_OF_ROW) {
      setButtonClass("round-button");
    } else {
      if (buttonClass != "round-button-unclickable") {
        setButtonClass("round-button-unclickable");
      }
    }

    if (gameWon || gameLost) {
      setButtonClass("round-button-unclickable");
    }
  }, [currentIndex, gameWon, gameLost]);

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

        // Back to beginning of row after moving to next row
        setCurrentIndex(0);
      }
    }
  };

  return (
    <button
      className={buttonClass}
      onClick={submit}
      aria-label="Submit melody guess"
    >
      ✓
    </button>
  );
};

export default SubmitButton;
