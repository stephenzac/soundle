import { NoteTile } from "../contexts/BoardContext";

interface NoteBoxProps {
    note: NoteTile;
}

const NoteBox = ({ note }: NoteBoxProps) => {

    if (note && note.addedNote) {
        console.log("Animating addition...");
        note.addedNote = false;
    }

    else if (note && note.deletedNote) {
        console.log("Animating deletion...");
        note.deletedNote = false;
    }

    return (
        <div 
            className={(note.noteName) !== "" ? "note-box mx-2" : "note-box mx-2"}
            onAnimationEnd={() => {
                note.addedNote = false;
                note.deletedNote = false;
            }}
        >
            <div className="font-bold">
                {note === undefined ? "" : note.noteName}
            </div>
        </div>
    );
};

export default NoteBox;