import { useState } from "react";
import { PlayMelody } from "../GameNotes";
import { useBoardContext } from "../contexts/BoardContext";

//TODO: Only play melody once per guess?

const MELODY_WAIT_TIME = 2600;

const PlayMelodyButton = () => {
  const { melody } = useBoardContext();
  const [clicked, setClicked] = useState(false);

  return (
    <div
      className="round-button"
      onClick={() => {
        if (!clicked) {
          setClicked(true);
          PlayMelody(melody);
          setTimeout(() => {
            setClicked(false);
          }, MELODY_WAIT_TIME);
        }
      }}
    >
      ♫
    </div>
  );
};

export default PlayMelodyButton;
