import { DeleteButton } from './DeleteButton';
import { SubmitButton } from './SubmitButton';
import { PlayMelodyButton } from './PlayMelodyButton';
import { ResetButton } from './ResetButton';
import { use } from 'react';
import { GameContext } from '../../../contexts/GameContext';
import { cn } from '../../../lib/cn';

export const GameControlsRow: React.FC = () => {
  const { gameWon, gameLost } = use(GameContext);

  return (
    <div
      className={cn(
        'flex justify-center gap-(--controls-gap) transition-all duration-300',
        // Shift by half a slot so the three visible buttons stay centered while the reset slot
        // is hidden (a transform, unlike a margin, doesn't widen the row on narrow screens)
        !(gameWon || gameLost) && 'translate-x-[calc((var(--btn)+var(--controls-gap))/2)]'
      )}
    >
      <DeleteButton />
      <SubmitButton />
      <PlayMelodyButton />
      {gameWon || gameLost ? <ResetButton /> : <div className="size-(--btn) opacity-0" />}
    </div>
  );
};
