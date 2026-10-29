import { OpenInformationButton } from '../info-modal/InformationModal';
import { OpenSettingsButton } from '../settings/SettingsModal';

import { GitHubLink } from './GitHubLink';

interface HeaderProps {
  setShowInfoModal: (newState: boolean) => void;
  setShowSettingsModal: (newState: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ setShowInfoModal, setShowSettingsModal }) => {
  return (
    <>
      <div className="flex flex-row items-center justify-between w-full px-4 sm:px-5 lg:px-7 header-container">
        <header>
          <h1 className="main-header text-left text-xl max-[22.5rem]:text-lg italic lg:text-4xl font-bold py-3 short-landscape:py-1.5">
            Soundle
          </h1>
        </header>
        <div className="flex flex-row items-center gap-2">
          <OpenSettingsButton setClickedState={setShowSettingsModal} />
          <OpenInformationButton setClickedState={setShowInfoModal} />
          <GitHubLink />
        </div>
      </div>
      <div className="w-full pixel-divider mb-3 lg:mb-6" />
    </>
  );
};
