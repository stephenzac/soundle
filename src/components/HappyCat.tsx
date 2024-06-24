import { useGameContext } from "../contexts/GameContext";

type HappyCatProps = {
  gifPath: string;
};

const HappyCat = ({ gifPath }: HappyCatProps) => {
  const { gameWon } = useGameContext();

  return (
    <>
      {gameWon && (
        <div className="absolute left-1/2">
          <img
            className="w-28"
            src={gifPath}
            alt="GIF of happy cat dancing"
          ></img>
        </div>
      )}
    </>
  );
};

export default HappyCat;
