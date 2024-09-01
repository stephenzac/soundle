import { GameContextProvider } from './contexts/GameContext';
import GameTiles from './components/GameTiles';
import HappyCat from './components/HappyCat';
import NoteInputs from './components/NoteInputs';
import GameControlsRow from './components/GameControlsRow';
import CorrectAnswer from './components/CorrectAnswer';
import Header from './components/Header';

const App: React.FC = () => (
  <div className="bg-gray-800 h-screen flex flex-col items-center">
    <Header />
    <main className="flex flex-col items-center gap-2">
      <GameContextProvider>
        <GameTiles />
        <HappyCat />
        <NoteInputs />
        <GameControlsRow />
        <CorrectAnswer />
      </GameContextProvider>
    </main>
  </div>
);

export default App;
