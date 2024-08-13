import { useState } from "react";
import { PlayMelody } from "../GameNotes";
import { useGameContext } from "../contexts/GameContext";

const MELODY_WAIT_TIME = 2900;

export const PlayMelodyButton = () => {
  const { melody } = useGameContext();
  const [playable, setPlayable] = useState(true);

  const melodyButtonClicked = () => {
    if (playable) {
      setPlayable(false);
      PlayMelody(melody);

      // prevent melody button spamming
      setTimeout(() => {
        setPlayable(true);
      }, MELODY_WAIT_TIME);
    }
  };

  return (
    <button
      className="round-button"
      onClick={melodyButtonClicked}
      aria-label="Play melody"
    >
      ♫
    </button>
  );
};

export default PlayMelodyButton;
