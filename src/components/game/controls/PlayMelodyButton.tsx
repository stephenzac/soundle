import { use, useState } from 'react';
import { playMelody } from '../../../lib/audio';
import { GameContext } from '../../../contexts/GameContext';
import { cn } from '../../../lib/cn';
import { MelodyIcon } from './MelodyIcon';

export const PlayMelodyButton: React.FC = () => {
  const { melody, settings, melodyPlayed, setMelodyPlayed, gameWon, gameLost } = use(GameContext);
  const [playable, setPlayable] = useState(true);
  // True while an instrument's samples download before its first play
  const [loading, setLoading] = useState(false);

  const melodyButtonClicked = async () => {
    if (!playable) return;
    setPlayable(false);
    setLoading(true);
    setMelodyPlayed(true);

    try {
      await playMelody(melody, settings);
    } catch (error) {
      console.error('Could not play the melody', error);
      setPlayable(true);
      return;
    } finally {
      setLoading(false);
    }

    // prevent melody button spamming
    setTimeout(() => setPlayable(true), 2900);
  };

  // Until a game's melody is first played, the button stands out so new players know to start here
  const needsAttention = !melodyPlayed && !(gameWon || gameLost);

  return (
    <button
      className={cn(
        needsAttention ? 'round-button-attention' : 'round-button',
        loading && 'animate-pulse'
      )}
      onClick={melodyButtonClicked}
      aria-label="Play melody"
      aria-busy={loading}
    >
      <MelodyIcon />
    </button>
  );
};
