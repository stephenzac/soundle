import { useEffect, useState } from "react";
import { useGameContext } from "../contexts/GameContext";

const CorrectAnswer = () => {
  const { melody, gameLost } = useGameContext();
  const [animateClass, setAnimateClass] = useState("modal-animate-in");

  useEffect(() => {
    if (gameLost) {
      console.log("Game lost detected");
      setAnimateClass("modal-active");
    } else {
      handleClose();
    }
  }, [gameLost]);

  const handleClose = () => {
    setAnimateClass("modal-animate-out");
  };

  return (
    <>
      {gameLost && (
        <div
          className={`flex flex-row items-center gap-4 bg-gray-900 p-3 rounded-md border-2 border-slate-300 text-center font-bold text-xl mt-[-8px] ${animateClass}`}
        >
          <div>
            <img
              src="./sad-cat.gif"
              alt="GIF of sad banana cat crying"
              width={80}
            />
          </div>

          <div>
            <p>The correct notes were:</p>
            <p>{melody.join(", ")}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CorrectAnswer;
