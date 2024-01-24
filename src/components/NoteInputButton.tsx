import { useBoardContext } from "../contexts/BoardContext";

const ROW_LENGTH = 4;

const NoteInputButton = ({ note }: {note: string}) => {
    const { currentRow, currentIndex, updateCurrentIndex, updateBoard } = useBoardContext();

    const InputNote = () => {
        if (currentIndex <= ROW_LENGTH) {
            updateCurrentIndex(currentIndex + 1);
            updateBoard(note, currentRow, currentIndex);
        }
    };

    return (
        <div className="note-box button-animation mx-2 cursor-pointer" onClick={InputNote}>
            {note}
        </div>
    );
};

export default NoteInputButton;