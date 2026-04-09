import { OpenInformationButton } from '../info-modal/InformationModal';

import { GitHubLink } from './GitHubLink';

interface HeaderProps {
  setShowInfoModal: (newState: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ setShowInfoModal }) => {
  return (
    <>
      <div className="flex flex-row items-center justify-between w-full px-5 lg:px-7 header-container">
        <header>
          <h1 className="main-header text-left text-xl italic lg:text-4xl font-bold pt-3 pb-3">
            Soundle
          </h1>
        </header>

        <div className="flex flex-row items-center gap-2">
          <OpenInformationButton setClickedState={setShowInfoModal} />
          <GitHubLink />
        </div>
      </div>

      <div className="w-full pixel-divider mb-3 lg:mb-10" />
    </>
  );
};
