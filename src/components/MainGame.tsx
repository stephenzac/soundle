import GameBox from "./GameBox";
import DeleteButton from "./DeleteButton";
import NoteInputButton from "./NoteInputButton";
import SubmitButton from "./SubmitButton";
import PlayMelodyButton from "./PlayMelodyButton";
import ActiveTest from "./ActiveTest";
import GitHubLink from "./GitHubLink";
import { BoardContextProvider } from "../contexts/BoardContext";

const MainGame = () => {
  return (
    <BoardContextProvider>
      <GameBox></GameBox>

      <div className="flex flex-row mt-4 justify-center">
        <NoteInputButton noteName={"C"} />
        <NoteInputButton noteName={"C♯"} />
        <NoteInputButton noteName={"D"} />
        <NoteInputButton noteName={"D♯"} />
        <NoteInputButton noteName={"E"} />
        <NoteInputButton noteName={"F"} />
      </div>
      <div className="flex flex-row mt-4 justify-center">
        <NoteInputButton noteName={"F♯"} />
        <NoteInputButton noteName={"G"} />
        <NoteInputButton noteName={"G♯"} />
        <NoteInputButton noteName={"A"} />
        <NoteInputButton noteName={"B♭"} />
        <NoteInputButton noteName={"B"} />
      </div>

      <div className="flex justify-center mt-4 space-x-8">
        <DeleteButton />
        <SubmitButton />
        <PlayMelodyButton />
      </div>

      <div className="flex justify-center mt-4">
        <GitHubLink />
      </div>

      <div className="flex justify-center mt-4">
        <ActiveTest />
      </div>
    </BoardContextProvider>
  );
};

export default MainGame;
