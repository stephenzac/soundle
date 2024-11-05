import { useGameContext } from '../../contexts/GameContext';
import { NoteBox } from './NoteBox';

export const GameTiles: React.FC = () => {
  const { gameBoard } = useGameContext();

  return (
    <>
      {gameBoard.map((row, index) => (
        <div className='grid grid-rows-6 grid-cols-5 gap-x-2 h-11' key={index}>
          {row.map((note, index) => (
            <NoteBox note={note} key={index} />
          ))}
        </div>
      ))}
    </>
  );
};
