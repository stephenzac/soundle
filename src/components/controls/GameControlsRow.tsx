import { useGameContext } from '../../contexts/GameContext';
import { DeleteButton } from './DeleteButton';
import { SubmitButton } from './SubmitButton';
import { PlayMelodyButton } from './PlayMelodyButton';
import { ResetButton } from './ResetButton';

export const GameControlsRow: React.FC = () => {
  const { gameWon, gameLost } = useGameContext();

  return (
    <div
      className={`flex justify-center space-x-8 transition-all duration-300 mt-2 ${
        !(gameWon || gameLost) ? 'ml-16' : ''
      }`}
    >
      <DeleteButton />
      <SubmitButton />
      <PlayMelodyButton />
      {gameWon || gameLost ? (
        <ResetButton />
      ) : (
        <div className='w-8 h-8 opacity-0' />
      )}
    </div>
  );
};
