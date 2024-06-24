import { useState } from "react";
import { PlayMelody } from "../GameNotes";
import { useGameContext } from "../contexts/GameContext";

const MELODY_WAIT_TIME = 2700;

const PlayMelodyButton = () => {
  const { melody, melodyPlayed, setMelodyPlayed, gameWon, gameLost } =
    useGameContext();
  const [clicked, setClicked] = useState(false);

  const melodyButtonClicked = () => {
    if (!clicked && !melodyPlayed) {
      setClicked(true);
      PlayMelody(melody);
      if (!(gameWon || gameLost)) {
        setMelodyPlayed(true);
      }

      // prevent melody button spamming
      setTimeout(() => {
        setClicked(false);
      }, MELODY_WAIT_TIME);
    }
  };

  return (
    <button
      className={!melodyPlayed ? "round-button" : "round-button-unclickable"}
      onClick={melodyButtonClicked}
      aria-label="Play melody"
    >
      ♫
    </button>
  );
};

export default PlayMelodyButton;
