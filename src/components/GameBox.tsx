import NoteBoxRow from "./NoteBoxRow";
import { useBoardContext } from "../contexts/BoardContext";

const GameBox = () => {
  const { gameBoard } = useBoardContext();

  return (
    <div className="bg-gray-900 h-96 w-80 flex flex-col self-center justify-center border-2 border-slate-300 rounded-lg">
      <NoteBoxRow noteRow={gameBoard[0]} />
      <NoteBoxRow noteRow={gameBoard[1]} />
      <NoteBoxRow noteRow={gameBoard[2]} />
      <NoteBoxRow noteRow={gameBoard[3]} />
      <NoteBoxRow noteRow={gameBoard[4]} />
    </div>
  );
};

export default GameBox;
