import NoteBoxRow from "./NoteBoxRow";
import { useGameContext } from "../contexts/GameContext";
import NoteBox from "./NoteBox";
import { useEffect } from "react";

const GameTiles = () => {
  const { gameBoard, currentIndex } = useGameContext();

  useEffect(() => {
    console.log("Board changed");
  }, [currentIndex]);

  return (
    <div className="flex flex-col gap-4 my-4">
      {gameBoard.map((currentRow, currentRowIndex) => {
        return (
          <div
            className="flex flex-row gap-2 place-items-center justify-center h-9"
            key={currentRowIndex}
          >
            {currentRow.map((note, noteIndex) => {
              return <NoteBox note={note} key={noteIndex} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GameTiles;
