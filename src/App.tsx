import { GameTiles } from './components/game/display/GameTiles';
import { HappyCat } from './components/info/HappyCat';
import { GameControlsRow } from './components/game/controls/GameControlsRow';
import { CorrectAnswer } from './components/info/CorrectAnswer';
import { Header } from './components/info/Header';
import { validGameNotes } from './constants/notes';
import { NoteInputButton } from './components/game/controls/NoteInputButton';
import { GameContextProvider } from './contexts/GameContext';
import { useEffect, useState } from 'react';
import { InformationModal } from './components/info-modal/InformationModal';
import { SettingsModal } from './components/settings/SettingsModal';

const NAMESPACE = 'soundle';
const MODAL_HAS_BEEN_SHOWN_KEY = 'modalHasBeenShown';

export const App: React.FC = () => {
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);

  useEffect(() => {
    const modalHasBeenShownValue = localStorage.getItem(
      `${NAMESPACE}::${MODAL_HAS_BEEN_SHOWN_KEY}`
    );
    if (!modalHasBeenShownValue) {
      setTimeout(() => {
        setShowInfoModal(true);
      }, 700);
      localStorage.setItem(`${NAMESPACE}::${MODAL_HAS_BEEN_SHOWN_KEY}`, 'true');
    }
  }, []);

  return (
    // The provider wraps the header and modals too, since the settings modal changes the game
    <GameContextProvider>
      <div className="bg-gray-300 min-h-dvh flex flex-col items-center">
        <Header setShowInfoModal={setShowInfoModal} setShowSettingsModal={setShowSettingsModal} />
        <main className="game-size flex flex-1 w-full flex-col items-center px-4 pb-4">
          {/* my-auto centers the game vertically but still lets it scroll if it overflows */}
          <div className="my-auto flex flex-col items-center gap-y-(--key-gap) gap-x-10 short-landscape:flex-row">
            <div className="relative">
              <HappyCat />
              <GameTiles />
            </div>
            <div className="flex flex-col items-center gap-y-(--key-gap)">
              <div className="grid grid-cols-6 gap-(--key-gap)">
                {validGameNotes.map((note) => (
                  <NoteInputButton note={note} key={note.noteNotation} />
                ))}
              </div>
              <GameControlsRow />
              <CorrectAnswer />
            </div>
          </div>
        </main>

        {showInfoModal && <InformationModal setClickedState={setShowInfoModal} />}
        {showSettingsModal && <SettingsModal setClickedState={setShowSettingsModal} />}
      </div>
    </GameContextProvider>
  );
};
