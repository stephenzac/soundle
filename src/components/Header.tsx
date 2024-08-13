import { useState } from "react";
import InformationModal from "./InformationModal";
import InformationButton from "./InformationButton";
import GitHubLink from "./GitHubLink";

const Header = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-row items-center justify-between w-full px-5 lg:px-7">
        <header>
          <h1 className="main-header text-left text-2xl italic lg:text-4xl font-bold pt-3 pb-3">
            Soundle
          </h1>
        </header>

        <div className="flex flex-row items-center gap-2">
          <InformationButton setClickedState={setShowInfo} />
          <GitHubLink />
        </div>
      </div>
      {showInfo && <InformationModal setClickedState={setShowInfo} />}

      <div className="w-full h-[1.5px] bg-slate-300 mb-6 lg:mb-10" />
    </>
  );
};

export default Header;
