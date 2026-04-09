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

const NAMESPACE = 'soundle';
const SHOW_INITIAL_MODAL_KEY = 'showInitialModal';

export const App: React.FC = () => {
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  useEffect(() => {
    const showInitialModalValue = localStorage.getItem(`${NAMESPACE}::${SHOW_INITIAL_MODAL_KEY}`);
    if (!showInitialModalValue) {
      setShowInfoModal(true);
      localStorage.setItem(`${NAMESPACE}::${SHOW_INITIAL_MODAL_KEY}`, 'false');
    }
  }, []);

  return (
    <div className="bg-gray-300 min-h-screen flex flex-col items-center">
      <Header setShowInfoModal={setShowInfoModal} />
      <main className="flex flex-col items-center gap-2">
        <GameContextProvider>
          <HappyCat />
          <GameTiles />
          <HappyCat />
          <div className="w-80 grid grid-cols-6 gap-y-2 mt-2">
            {validGameNotes.map((note) => (
              <NoteInputButton note={note} key={note.noteNotation} />
            ))}
          </div>
          <GameControlsRow />
          <CorrectAnswer />
        </GameContextProvider>
      </main>

      {showInfoModal && <InformationModal setClickedState={setShowInfoModal} />}
    </div>
  );
};
