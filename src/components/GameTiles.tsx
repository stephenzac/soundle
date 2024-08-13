import NoteBoxRow from "./NoteBoxRow";
import { useGameContext } from "../contexts/GameContext";

const GameTiles = () => {
  const { gameBoard } = useGameContext();

  return (
    <div className="flex flex-col gap-4">
      {gameBoard.map((currentRow, index) => {
        return <NoteBoxRow noteRow={currentRow} key={index} />;
      })}
    </div>
  );
};

export default GameTiles;
