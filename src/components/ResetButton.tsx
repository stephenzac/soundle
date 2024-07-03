import { useGameContext } from "../contexts/GameContext";

const ResetButton = () => {
  const { resetGame } = useGameContext();

  return (
    <button
      className="round-button font-bold mr-16"
      onClick={resetGame}
      aria-label="Reset game"
    >
      ↺
    </button>
  );
};

export default ResetButton;
