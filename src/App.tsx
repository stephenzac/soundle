import MainGame from "./components/MainGame";
import GitHubLink from "./components/GitHubLink";
import InformationButton from "./components/InformationButton";
import { BoardContextProvider } from "./contexts/BoardContext";
import { useState } from "react";
import InformationModal from "./components/InformationModal";

const App = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false);

  return (
    <div className="bg-gray-800 h-screen flex flex-col items-center">
      <h1 className="text-center text-4xl font-bold w-full pt-2 pb-4">
        Soundle
      </h1>

      <BoardContextProvider>
        <MainGame />
      </BoardContextProvider>

      <div className="w-10/12 max-w-80 flex flex-row justify-center items-center space-x-4 mt-1">
        <GitHubLink />
        <InformationButton setClickedState={setShowInfo} />
      </div>

      <div className="flex flex-row justify-center items-center">
        {showInfo && <InformationModal setClickedState={setShowInfo} />}
      </div>
    </div>
  );
};

export default App;
