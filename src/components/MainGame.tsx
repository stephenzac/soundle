import GameBox from "./GameBox";
import DeleteButton from "./DeleteButton";
import NoteInputButton from "./NoteInputButton";
import SubmitButton from "./SubmitButton";
import PlayMelodyButton from "./PlayMelodyButton";
import ResetButton from "./ResetButton";
import GitHubLink from "./GitHubLink";
import { useBoardContext } from "../contexts/BoardContext";

const MainGame = () => {
  const { gameWon, gameLost } = useBoardContext();

  return (
    <>
      <GameBox></GameBox>

      <div className="absolute top-0 left 0 w-max">
        {gameWon && <img src={"../../public/images/happy-cat.gif "}></img>}
      </div>

      <div className="absolute top-0 left-0 w-48">
        {gameLost && <img src={"../../public/images/sad-cat.gif "}></img>}
      </div>

      <div className="flex flex-row mt-4 justify-center">
        <NoteInputButton noteName={"C"} />
        <NoteInputButton noteName={"D♭"} />
        <NoteInputButton noteName={"D"} />
        <NoteInputButton noteName={"E♭"} />
        <NoteInputButton noteName={"E"} />
        <NoteInputButton noteName={"F"} />
      </div>
      <div className="flex flex-row mt-4 justify-center">
        <NoteInputButton noteName={"F♯"} />
        <NoteInputButton noteName={"G"} />
        <NoteInputButton noteName={"A♭"} />
        <NoteInputButton noteName={"A"} />
        <NoteInputButton noteName={"B♭"} />
        <NoteInputButton noteName={"B"} />
      </div>

      <div className="flex justify-center mt-4 mb-10 space-x-8">
        <DeleteButton />
        <SubmitButton />
        <PlayMelodyButton />
        {(gameWon || gameLost) && <ResetButton />}
      </div>

      <div className="flex justify-center mt-4">
        <GitHubLink />
      </div>
    </>
  );
};

export default MainGame;
