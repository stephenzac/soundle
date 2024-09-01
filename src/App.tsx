import { GameContextProvider } from './contexts/GameContext';
import GameTiles from './components/GameTiles';
import HappyCat from './components/HappyCat';
import GameControlsRow from './components/GameControlsRow';
import CorrectAnswer from './components/CorrectAnswer';
import Header from './components/Header';
import { musicNotes } from './constants/notes';
import NoteInputButton from './components/NoteInputButton';

const App: React.FC = () => (
  <div className="bg-gray-800 h-screen flex flex-col items-center">
    <Header />
    <main className="flex flex-col items-center gap-2">
      <GameContextProvider>
        <GameTiles />
        <HappyCat />
        <div className="w-80 grid grid-cols-6 gap-x-3 gap-y-2 mt-1">
          {musicNotes.map((note) => (
            <NoteInputButton noteName={note} key={note} />
          ))}
        </div>
        <GameControlsRow />
        <CorrectAnswer />
      </GameContextProvider>
    </main>
  </div>
);

export default App;
