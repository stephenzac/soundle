import MainGame from "./components/MainGame";
import GitHubLink from "./components/GitHubLink";
import InformationButton from "./components/InformationButton";
import { useState } from "react";
import InformationModal from "./components/InformationModal";

const App = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false);

  return (
    <div className="bg-gray-800 h-screen flex flex-col items-center">
      <header>
        <h1 className="main-header text-center text-4xl font-bold w-full pt-5 pb-4">
          Soundle
        </h1>
      </header>

      <MainGame />

      <footer className="flex flex-row justify-center items-center w-10/12 pr-1 max-w-80 gap-2 mt-2">
        <GitHubLink />
        <InformationButton setClickedState={setShowInfo} />
      </footer>

      {showInfo && <InformationModal setClickedState={setShowInfo} />}
    </div>
  );
};

export default App;
