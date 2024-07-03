import { useGameContext } from "../contexts/GameContext";

const ResetButton = () => {
  const { resetGame } = useGameContext();

  return (
    <button
      className="round-button font-bold mr-16 animate-pulse-fast duration-0"
      onClick={resetGame}
      aria-label="Reset game"
    >
      ↺
    </button>
  );
};

export default ResetButton;
