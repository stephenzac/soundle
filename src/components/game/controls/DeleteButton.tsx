import { use } from 'react';
import { GameContext } from '../../../contexts/GameContext';
import { DeleteIcon } from './DeleteIcon';

export const DeleteButton: React.FC = () => {
  const { currentIndex, deleteNote, gameWon, gameLost, reveal } = use(GameContext);

  const canDeleteNote = currentIndex > 0 && !(gameWon || gameLost) && !reveal;

  return (
    <button
      className={canDeleteNote ? 'round-button' : 'round-button-unclickable'}
      onClick={deleteNote}
      aria-label="Delete note"
      aria-keyshortcuts="Backspace"
      title="Delete note (Backspace)"
    >
      <DeleteIcon />
    </button>
  );
};
