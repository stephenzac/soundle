import { useGameContext } from "../contexts/GameContext";

type SadCatProps = {
  gifPath: string;
};

const SadCat = ({ gifPath }: SadCatProps) => {
  const { gameLost } = useGameContext();

  return (
    <>
      {gameLost && (
        <div className="absolute left-1/3 w-48">
          <img
            className="w-28"
            src={gifPath}
            alt="GIF of banana cat crying"
          ></img>
        </div>
      )}
    </>
  );
};

export default SadCat;
