import NoteBoxRow from "./NoteBoxRow";
import { useBoardContext } from "../contexts/BoardContext";

const GameTiles = () => {
  const { gameBoard } = useBoardContext();

  return (
    <div className="flex flex-col gap-4 my-4">
      {gameBoard.map((currentRow, index) => {
        return <NoteBoxRow noteRow={currentRow} key={index} />;
      })}
    </div>
  );
};

export default GameTiles;
