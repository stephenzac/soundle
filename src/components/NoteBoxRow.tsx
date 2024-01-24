import NoteBox from "./NoteBox";

interface NoteBoxRowProps {
    noteRow: string[];
};

const NoteBoxRow = ({ noteRow }: NoteBoxRowProps) => {

    return (
        <div className="flex justify-center h-8 my-5">
            <NoteBox note={noteRow[0]}/>
            <NoteBox note={noteRow[1]}/>
            <NoteBox note={noteRow[2]}/>
            <NoteBox note={noteRow[3]}/>
            <NoteBox note={noteRow[4]}/>
        </div>
    );
};

export default NoteBoxRow;