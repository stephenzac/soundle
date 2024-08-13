import GameTiles from "./GameTiles";
import HappyCat from "./HappyCat";
import GameControlsRow from "./GameControlsRow";
import CorrectAnswer from "./CorrectAnswer";
import NoteInputs from "./NoteInputs";
import { GameContextProvider } from "../contexts/GameContext";

const MainGame = () => {
  return (
    <main className="flex flex-col items-center gap-5">
      <GameContextProvider>
        <GameTiles />
        <HappyCat gifPath={"./happy-cat.gif"} />
        <NoteInputs />
        <GameControlsRow />
        <CorrectAnswer />
      </GameContextProvider>
    </main>
  );
};

export default MainGame;
