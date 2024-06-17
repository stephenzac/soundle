import GameBox from "./GameBox";
import DeleteButton from "./DeleteButton";
import NoteInputButton from "./NoteInputButton";
import SubmitButton from "./SubmitButton";
import PlayMelodyButton from "./PlayMelodyButton";
import ResetButton from "./ResetButton";
import HappyCat from "./HappyCat";
import SadCat from "./SadCat";
import { useBoardContext } from "../contexts/BoardContext";

const MainGame = () => {
  const { gameWon, gameLost } = useBoardContext();

  return (
    <>
      <GameBox></GameBox>

      {gameWon && <HappyCat gifPath={"./happy-cat.gif"} />}

      {gameLost && <SadCat gifPath="./sad-cat.gif" />}

      <div className="flex flex-row mt-4 justify-center">
        <NoteInputButton noteName={"C"} />
        <NoteInputButton noteName={"D♭"} />
        <NoteInputButton noteName={"D"} />
        <NoteInputButton noteName={"E♭"} />
        <NoteInputButton noteName={"E"} />
        <NoteInputButton noteName={"F"} />
      </div>
      <div className="flex flex-row mt-4 justify-center">
        <NoteInputButton noteName={"Gb"} />
        <NoteInputButton noteName={"G"} />
        <NoteInputButton noteName={"A♭"} />
        <NoteInputButton noteName={"A"} />
        <NoteInputButton noteName={"B♭"} />
        <NoteInputButton noteName={"B"} />
      </div>

      <div className="flex justify-center mt-4 space-x-8">
        <DeleteButton />
        <SubmitButton />
        <PlayMelodyButton />
        {(gameWon || gameLost) && <ResetButton />}
      </div>
    </>
  );
};

export default MainGame;
