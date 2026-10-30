import { use } from 'react';
import { GameContext } from '../../../contexts/GameContext';
import { cn } from '../../../lib/cn';
import { MelodyIcon } from './MelodyIcon';

export const PlayMelodyButton: React.FC = () => {
  const { playMelody, loadingSound, melodyPlayed, gameWon, gameLost } = use(GameContext);
  // True while an instrument's samples download before its first play
  const loading = loadingSound === 'melody';

  // Until a game's melody is first played, the button stands out so new players know to start here
  const needsAttention = !melodyPlayed && !(gameWon || gameLost);

  return (
    <button
      className={cn(
        needsAttention ? 'round-button-attention' : 'round-button',
        loading && 'animate-pulse'
      )}
      onClick={playMelody}
      aria-label="Play melody"
      aria-busy={loading}
      aria-keyshortcuts="Space"
      title="Play melody (Space)"
    >
      <MelodyIcon />
    </button>
  );
};
