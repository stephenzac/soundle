import { use } from 'react';
import { ROW_LENGTH } from '../../constants/game-board';
import { NoteNotation } from '../../constants/notes';
import { GameContext, NoteTile } from '../../contexts/GameContext';

interface NoteInputProps {
  noteName: NoteNotation;
}

export const NoteInputButton: React.FC<NoteInputProps> = ({ noteName }) => {
  const {
    currentRow,
    currentIndex,
    setCurrentIndex,
    updateBoard,
    gameWon,
    gameLost,
  } = use(GameContext);

  const inputNote = () => {
    if (currentIndex >= ROW_LENGTH || gameWon || gameLost) return;

    setCurrentIndex(currentIndex + 1);
    const newNote: NoteTile = {
      noteName: noteName,
      answered: false,
      correct: false,
      answerIsClose: false,
    };
    updateBoard(newNote, currentRow, currentIndex);
  };

  return (
    <button
      className='note-input-button button-animation cursor-pointer'
      onClick={inputNote}
      aria-label={`Button to input note ${noteName}`}
    >
      {noteName}
    </button>
  );
};
