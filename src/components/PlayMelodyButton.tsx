import { useState } from "react";
import { PlayMelody } from "../GameNotes";
import { useBoardContext } from "../contexts/BoardContext";

const MELODY_WAIT_TIME = 2600;

const PlayMelodyButton = () => {
  const { melody, melodyPlayed, updateMelodyPlayed, gameWon, gameLost } =
    useBoardContext();
  const [clicked, setClicked] = useState(false);

  const melodyButtonClicked = () => {
    if (!clicked && !melodyPlayed) {
      setClicked(true);
      PlayMelody(melody);
      if (!(gameWon || gameLost)) {
        updateMelodyPlayed(true);
      }

      // prevent melody button spamming
      setTimeout(() => {
        setClicked(false);
      }, MELODY_WAIT_TIME);
    }
  };

  return (
    <div
      className={!melodyPlayed ? "round-button" : "round-button-unclickable"}
      onClick={melodyButtonClicked}
    >
      ♫
    </div>
  );
};

export default PlayMelodyButton;
