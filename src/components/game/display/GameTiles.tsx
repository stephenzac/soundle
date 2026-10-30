import { use } from 'react';
import { NoteBox } from './NoteBox';
import { GameContext } from '../../../contexts/GameContext';

export const GameTiles: React.FC = () => {
  const { gameBoard, currentRow, currentIndex, gameWon, gameLost } = use(GameContext);
  const gameOver = gameWon || gameLost;

  return (
    <div className="flex flex-col gap-y-0.5">
      {gameBoard.map((row, rowNum) => (
        <div className="grid grid-cols-5" key={rowNum}>
          {row.map((note, noteIndex) => (
            <NoteBox
              currentNote={note}
              isNext={!gameOver && rowNum === currentRow && noteIndex === currentIndex}
              key={noteIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
