import { useState } from "react";
import { PlayMelody } from "../GameNotes";
import { useBoardContext } from "../contexts/BoardContext";

const MELODY_WAIT_TIME = 2600;

const PlayMelodyButton = () => {
  const { melody } = useBoardContext();
  const [clicked, setClicked] = useState(false);

  const melodyButtonClicked = () => {
    if (!clicked) {
      setClicked(true);
      PlayMelody(melody);

      // prevent melody button spamming
      setTimeout(() => {
        setClicked(false);
      }, MELODY_WAIT_TIME);
    }
  };

  return (
    <div className="round-button" onClick={melodyButtonClicked}>
      ♫
    </div>
  );
};

export default PlayMelodyButton;
