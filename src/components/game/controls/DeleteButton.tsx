import { use } from 'react';
import { GameContext, NoteTile } from '../../../contexts/GameContext';
import { DeleteIcon } from './DeleteIcon';

export const DeleteButton: React.FC = () => {
  const { currentIndex, setCurrentIndex, currentRow, updateBoard, gameWon, gameLost } =
    use(GameContext);

  const canDeleteNote = currentIndex > 0 && !(gameWon || gameLost);

  const deleteNote = () => {
    if (currentIndex === 0 || gameWon || gameLost) return;

    setCurrentIndex(currentIndex - 1);
    const newNote: NoteTile = {
      note: '',
      answered: false,
      correct: false,
      answerIsClose: false,
    };
    updateBoard(newNote, currentRow, currentIndex - 1);
  };

  return (
    <button
      className={canDeleteNote ? 'round-button' : 'round-button-unclickable'}
      onClick={deleteNote}
      aria-label="Delete note"
    >
      <DeleteIcon />
    </button>
  );
};
