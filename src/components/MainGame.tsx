import GameTiles from "./GameTiles";
import NoteInputButton from "./NoteInputButton";
import HappyCat from "./HappyCat";
import SadCat from "./SadCat";
import GameControlsRow from "./GameControlsRow";
import { GameContextProvider } from "../contexts/GameContext";

const MainGame = () => {
  return (
    <main>
      <GameContextProvider>
        <GameTiles />

        <HappyCat gifPath={"./happy-cat.gif"} />
        <SadCat gifPath="./sad-cat.gif" />

        <div className="flex flex-row mt-4 justify-center">
          <NoteInputButton noteName={"C"} />
          <NoteInputButton noteName={"D♭"} />
          <NoteInputButton noteName={"D"} />
          <NoteInputButton noteName={"E♭"} />
          <NoteInputButton noteName={"E"} />
          <NoteInputButton noteName={"F"} />
        </div>
        <div className="flex flex-row mt-4 justify-center">
          <NoteInputButton noteName={"G♭"} />
          <NoteInputButton noteName={"G"} />
          <NoteInputButton noteName={"A♭"} />
          <NoteInputButton noteName={"A"} />
          <NoteInputButton noteName={"B♭"} />
          <NoteInputButton noteName={"B"} />
        </div>

        <GameControlsRow />
      </GameContextProvider>
    </main>
  );
};

export default MainGame;
