import { GameTiles } from './components/game/GameTiles';
import { HappyCat } from './components/info/HappyCat';
import { GameControlsRow } from './components/controls/GameControlsRow';
import { CorrectAnswer } from './components/info/CorrectAnswer';
import { Header } from './components/info/Header';
import { musicNotes } from './constants/notes';
import { NoteInputButton } from './components/controls/NoteInputButton';
import { GameContextProvider } from './contexts/GameContext';

export const App: React.FC = () => (
  <div className='bg-gray-800 min-h-screen flex flex-col items-center'>
    <Header />
    <main className='flex flex-col items-center gap-2'>
      <GameContextProvider>
        <HappyCat />
        <GameTiles />
        <HappyCat />
        <div className='w-80 grid grid-cols-6 gap-x-3 gap-y-2 mt-1'>
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
