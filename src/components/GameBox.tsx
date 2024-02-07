import NoteBoxRow from "./NoteBoxRow";
import { useBoardContext } from "../contexts/BoardContext";

const GameBox = () => {
  const { gameBoard } = useBoardContext();

  return (
    <div className="bg-gray-900 h-4/6 w-10/12 max-w-80 flex flex-col self-center justify-center border-2 border-slate-300 rounded-lg">
      {gameBoard.map((currentRow, index) => {
        return <NoteBoxRow noteRow={currentRow} key={index} />;
      })}
    </div>
  );
};

export default GameBox;
