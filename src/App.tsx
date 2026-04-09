import { GameTiles } from './components/game/display/GameTiles';
import { HappyCat } from './components/info/HappyCat';
import { GameControlsRow } from './components/game/controls/GameControlsRow';
import { CorrectAnswer } from './components/info/CorrectAnswer';
import { Header } from './components/info/Header';
import { validGameNotes } from './constants/notes';
import { NoteInputButton } from './components/game/controls/NoteInputButton';
import { GameContextProvider } from './contexts/GameContext';

export const App: React.FC = () => (
  <div className="bg-gray-300 min-h-screen flex flex-col items-center">
    <Header />
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
  </div>
);
