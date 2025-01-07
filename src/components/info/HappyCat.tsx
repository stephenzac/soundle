import { useGameContext } from '../../contexts/GameContext';

const HappyCat: React.FC = () => {
  const { gameWon } = useGameContext();

  return (
    <>
      {gameWon && (
        <div className='absolute left-1/2'>
          <img
            className='w-28'
            src='./happy-cat.gif'
            alt='GIF of happy cat dancing'
          />
        </div>
      )}
    </>
  );
};

export default HappyCat;
