import { useBoardContext } from "../contexts/BoardContext";
import { CheckNotes } from "../GameNotes";

const END_OF_ROW = 5;
const LAST_ROW_INDEX = 4;
const END_OF_BOARD = 4;

const SubmitButton = () => {
    const { gameBoard, currentRow, currentIndex, updateCurrentRow, updateCurrentIndex, melody, resetGame } = useBoardContext();

    const submit = () => {
        // Check correctness of submitted notes
        if (currentIndex === END_OF_ROW) {
            if (CheckNotes(gameBoard[currentRow], melody)) {
                console.log("Correct!");
                resetGame();
                return;
                
            } else {
                console.log("Incorrect.");
            }
            
            // Incorrect guess, move to next row
            if (currentRow < LAST_ROW_INDEX) {
                updateCurrentRow(currentRow + 1);
            }
            updateCurrentIndex(0);
        }

        if (currentRow === END_OF_BOARD) {
            // TODO: end of game logic? (losing)
        }
    };

    return (
        <div className="round-button font-bold" onClick={submit}>
            ✓
        </div>
    );
};

export default SubmitButton;