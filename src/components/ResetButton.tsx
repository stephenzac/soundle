import { useGameContext } from "../contexts/GameContext";

const ResetButton = () => {
  const { resetGame, gameWon, gameLost } = useGameContext();

  return (
    <>
      {(gameWon || gameLost) && (
        <button
          className="round-button font-bold"
          onClick={resetGame}
          aria-label="Reset game"
        >
          ↺
        </button>
      )}
    </>
  );
};

export default ResetButton;
