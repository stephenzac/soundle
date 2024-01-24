import { useBoardContext } from "../contexts/BoardContext";
import { CheckNotes } from "../GameNotes";

const SubmitButton = () => {
    const { gameBoard, currentRow, currentIndex, updateCurrentRow, updateCurrentIndex, melody, resetGame } = useBoardContext();

    const submit = () => {
        // Check correctness of submitted notes
        if (currentIndex === 5) {
            if (CheckNotes(gameBoard[currentRow], melody)) {
                console.log("Correct!");
                resetGame();
                return;
                
            } else {
                console.log("Incorrect.");
            }
            
            // Incorrect guess, move to next row
            if (currentRow < 4) {
                updateCurrentRow(currentRow + 1);
            }
            updateCurrentIndex(0);
        }

        if (currentRow === 4) {
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