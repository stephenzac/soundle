import { use } from 'react';
import { NoteBox } from './NoteBox';
import { GameContext } from '../../contexts/GameContext';

export const GameTiles: React.FC = () => {
  const { gameBoard } = use(GameContext);

  return (
    <>
      {gameBoard.map((row, rowNum) => (
        <div className='grid grid-rows-6 grid-cols-5 gap-x-2 h-11' key={rowNum}>
          {row.map((note, noteIndex) => (
            <NoteBox note={note} key={noteIndex} />
          ))}
        </div>
      ))}
    </>
  );
};
