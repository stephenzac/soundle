import { useBoardContext } from "../contexts/BoardContext";

const BEGINNING_OF_ROW = 0;

const DeleteButton = () => {
    const { currentIndex, removeFromBoard } = useBoardContext();

    const DeleteNote = () => {  
        if (currentIndex > BEGINNING_OF_ROW) {
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