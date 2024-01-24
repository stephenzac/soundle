import { useBoardContext } from "../contexts/BoardContext";

const DeleteButton = () => {
    const { currentIndex, updateCurrentIndex, removeFromBoard} = useBoardContext();

    const DeleteNote = () => {
        console.log("Note deleted");

        if (currentIndex > 0) {
            updateCurrentIndex( currentIndex - 1);
            removeFromBoard();
        }

    };

    return (
        <div className="round-button" onClick={DeleteNote}>
            ⌫
        </div>
    );
};

export default DeleteButton;