import { useGameContext } from "../contexts/GameContext";
import DeleteButton from "./DeleteButton";
import SubmitButton from "./SubmitButton";
import PlayMelodyButton from "./PlayMelodyButton";
import ResetButton from "./ResetButton";

const GameControlsRow = () => {
  const { gameWon, gameLost } = useGameContext();

  let divClassName =
    "flex justify-center mt-4 ml-16 space-x-8 transition-all duration-300";

  if (gameWon || gameLost) {
    divClassName =
      "flex justify-center mt-4 space-x-8 transition-all duration-300";
  }

  return (
    <div className={divClassName}>
      <DeleteButton />
      <SubmitButton />
      <PlayMelodyButton />
      {gameWon || gameLost ? (
        <ResetButton />
      ) : (
        <div className="w-8 h-8 opacity-0 dura"></div>
      )}
    </div>
  );
};

export default GameControlsRow;
