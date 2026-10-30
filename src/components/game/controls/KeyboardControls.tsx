import { use, useEffect, useEffectEvent } from 'react';
import { validGameNotes } from '../../../constants/notes';
import { GameContext } from '../../../contexts/GameContext';

// Each letter's natural note, as an index into validGameNotes (which runs C, D♭, D, ...)
const NATURAL_NOTES: Record<string, number> = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };

interface KeyboardControlsProps {
  // While a modal is open, its own controls get the keyboard
  disabled: boolean;
}

// Plays the game from a keyboard: A to G enter notes (with Shift for the flat), Backspace
// deletes, Enter submits (or starts a new game once it's over), Space plays the melody and R the
// reference note
export const KeyboardControls: React.FC<KeyboardControlsProps> = ({ disabled }) => {
  const {
    inputNote,
    deleteNote,
    submitGuess,
    playMelody,
    playReference,
    resetGame,
    gameWon,
    gameLost,
  } = use(GameContext);

  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (disabled || event.ctrlKey || event.metaKey || event.altKey) return;
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLSelectElement ||
      event.target instanceof HTMLTextAreaElement
    )
      return;

    const key = event.key.toLowerCase();
    if (key in NATURAL_NOTES) {
      // There's no C♭ or F♭ key, so Shift+C and Shift+F do nothing
      if (event.shiftKey && (key === 'c' || key === 'f')) return;
      if (event.repeat) return;
      inputNote(validGameNotes[NATURAL_NOTES[key] - (event.shiftKey ? 1 : 0)]);
      return;
    }

    switch (event.key) {
      case 'Backspace':
        deleteNote();
        break;
      case 'Enter':
        // Also stops a focused button (say, the last note key clicked) from being pressed too
        event.preventDefault();
        if (event.repeat) return;
        if (gameWon || gameLost) resetGame();
        else submitGuess();
        break;
      case ' ':
        // Also stops the page from scrolling and a focused button from being pressed
        event.preventDefault();
        if (!event.repeat) void playMelody();
        break;
      case 'r':
      case 'R':
        if (!event.repeat) void playReference();
        break;
    }
  });

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return null;
};
