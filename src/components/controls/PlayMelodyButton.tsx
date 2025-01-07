import { useState } from 'react';
import { playMelody } from '../../lib/GameNotes';
import { useGameContext } from '../../contexts/GameContext';

export const PlayMelodyButton: React.FC = () => {
  const { melody } = useGameContext();
  const [playable, setPlayable] = useState<boolean>(true);

  const melodyButtonClicked = () => {
    if (!playable) return;
    setPlayable(false);
    playMelody(melody);

    // prevent melody button spamming
    setTimeout(() => setPlayable(true), 2900);
  };

  return (
    <button
      className='round-button'
      onClick={melodyButtonClicked}
      aria-label='Play melody'
    >
      ♫
    </button>
  );
};
