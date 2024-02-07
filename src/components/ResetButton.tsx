import { useBoardContext } from "../contexts/BoardContext";

const ResetButton = () => {
  const { resetGame } = useBoardContext();

  return (
    <div className="round-button font-bold" onClick={resetGame}>
      ↺
    </div>
  );
};

export default ResetButton;
