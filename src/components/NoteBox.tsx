
interface NoteBoxProps {
    note: string;
}

const NoteBox = ({ note }: NoteBoxProps) => {

    return (
        <div className="note-box mx-2" onCompositionUpdate={() => {
            console.log(`Adding ${note}`)
        }}>
            {note}
        </div>
    );
};

export default NoteBox;