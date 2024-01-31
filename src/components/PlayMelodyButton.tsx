import { PlayMelody } from "../GameNotes";
import { useBoardContext } from "../contexts/BoardContext";

const PlayMelodyButton = () => {
  const { melody } = useBoardContext();

  return (
    <div
      className="round-button"
      onClick={() => {
        PlayMelody(melody);
      }}
    >
      ♫
    </div>
  );
};

export default PlayMelodyButton;
