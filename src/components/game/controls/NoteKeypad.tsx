import { use } from 'react';
import { validGameNotes } from '../../../constants/notes';
import { GameContext } from '../../../contexts/GameContext';
import { GameResult } from '../../info/GameResult';
import { NoteInputButton } from './NoteInputButton';

// The 12 note keys, or once the game ends (and they can't be used), the result in their place.
// Taking the keypad's spot keeps the game from growing taller than the screen.
export const NoteKeypad: React.FC = () => {
  const { gameWon, gameLost } = use(GameContext);

  if (gameWon || gameLost) return <GameResult />;

  return (
    <div className="grid grid-cols-6 gap-(--key-gap)">
      {validGameNotes.map((note) => (
        <NoteInputButton note={note} key={note.noteNotation} />
      ))}
    </div>
  );
};
