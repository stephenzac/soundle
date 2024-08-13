import NoteInputButton from "./NoteInputButton";

const NoteInputs: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-center">
        <NoteInputButton noteName={"C"} />
        <NoteInputButton noteName={"D♭"} />
        <NoteInputButton noteName={"D"} />
        <NoteInputButton noteName={"E♭"} />
        <NoteInputButton noteName={"E"} />
        <NoteInputButton noteName={"F"} />
      </div>
      <div className="flex flex-row justify-center">
        <NoteInputButton noteName={"G♭"} />
        <NoteInputButton noteName={"G"} />
        <NoteInputButton noteName={"A♭"} />
        <NoteInputButton noteName={"A"} />
        <NoteInputButton noteName={"B♭"} />
        <NoteInputButton noteName={"B"} />
      </div>
    </div>
  );
};

export default NoteInputs;
