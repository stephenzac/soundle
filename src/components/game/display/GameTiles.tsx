import { use } from 'react';
import { NoteBox } from './NoteBox';
import { RowReplayButton } from './RowReplayButton';
import { GameContext } from '../../../contexts/GameContext';
import { cn } from '../../../lib/cn';

export const GameTiles: React.FC = () => {
  const {
    gameBoard,
    currentRow,
    currentIndex,
    gameWon,
    gameLost,
    reveal,
    playingTile,
    rowShaking,
  } = use(GameContext);
  const gameOver = gameWon || gameLost;

  return (
    <div className="flex flex-col gap-y-0.5">
      {gameBoard.map((row, rowNum) => {
        const revealing = reveal?.row === rowNum;
        return (
          <div
            className={cn(
              'grid grid-cols-5 relative',
              rowShaking && rowNum === currentRow && 'motion-safe:animate-row-shake'
            )}
            key={rowNum}
          >
            {row.map((note, noteIndex) => (
              <NoteBox
                currentNote={note}
                isNext={!gameOver && rowNum === currentRow && noteIndex === currentIndex}
                concealed={revealing && noteIndex >= reveal.revealed}
                flipping={revealing && noteIndex < reveal.flipped}
                highlighted={playingTile?.row === rowNum && playingTile.index === noteIndex}
                key={noteIndex}
              />
            ))}
            {row.every((tile) => tile.answered) && !revealing && <RowReplayButton row={rowNum} />}
          </div>
        );
      })}
    </div>
  );
};
