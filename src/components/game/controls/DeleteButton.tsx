import { use, useEffect, useState } from 'react';
import { GameContext, NoteTile } from '../../../contexts/GameContext';

export const DeleteButton: React.FC = () => {
  const [buttonClass, setButtonClass] = useState('round-button');

  const { currentIndex, setCurrentIndex, currentRow, updateBoard, gameWon, gameLost } =
    use(GameContext);

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

  useEffect(() => {
    if (currentIndex > 0 && !(gameWon || gameLost)) setButtonClass('round-button');
    else {
      setButtonClass('round-button-unclickable');
    }
  }, [currentIndex, gameWon, gameLost]);

  return (
    <button className={buttonClass} onClick={deleteNote} aria-label="Delete note">
      ⌫
    </button>
  );
};
