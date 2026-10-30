import { DeleteButton } from './DeleteButton';
import { SubmitButton } from './SubmitButton';
import { PlayMelodyButton } from './PlayMelodyButton';
import { ReferenceButton } from './ReferenceButton';
import { ResetButton } from './ResetButton';
import { use } from 'react';
import { GameContext } from '../../../contexts/GameContext';

export const GameControlsRow: React.FC = () => {
  const { gameWon, gameLost } = use(GameContext);

  return (
    <div className="flex justify-center gap-(--controls-gap)">
      <DeleteButton />
      <SubmitButton />
      <PlayMelodyButton />
      {/* The reference note only helps while guessing, so its slot becomes reset once it's over */}
      {gameWon || gameLost ? <ResetButton /> : <ReferenceButton />}
    </div>
  );
};
