import { useBoardContext } from "../contexts/BoardContext";

const ResetButton = () => {
  const { resetGame } = useBoardContext();

  return (
    <button
      className="round-button font-bold"
      onClick={resetGame}
      aria-label="Reset game"
    >
      ↺
    </button>
  );
};

export default ResetButton;
