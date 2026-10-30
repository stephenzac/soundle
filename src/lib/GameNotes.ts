import { NoteTile } from '../contexts/GameContext';
import {
  GameNote,
  MelodyNote,
  NoteNotationLabel,
  NOTE_LABELS,
  TONE_STRINGS,
} from '../constants/notes';
import { ROW_LENGTH } from '../constants/game-board';
import { GameSettings, melodyPool } from '../constants/settings';
import { octaveOf, pitchClassOf } from './pitch';

const checkNoteDistance = (
  submittedNote: NoteNotationLabel,
  actualNote: NoteNotationLabel
): number => {
  if (
    (submittedNote === 'B' && actualNote === 'C') ||
    (submittedNote === 'C' && actualNote === 'B')
  )
    return 1;

  return Math.abs(NOTE_LABELS.indexOf(submittedNote) - NOTE_LABELS.indexOf(actualNote));
};

export const checkNotes = (submittedNotes: NoteTile[], actualNotes: GameNote[]): boolean => {
  let correctCount = 0;

  submittedNotes.forEach((submittedNote, index) => {
    if (submittedNote.note === '') return false;

    if (submittedNote.note.noteNotation === actualNotes[index].noteNotation) {
      submittedNote.correct = true;
      correctCount++;
    }

    // Check if guess is a half step off
    const noteDistance = checkNoteDistance(
      submittedNote.note.noteNotation,
      actualNotes[index].noteNotation
    );
    if (noteDistance === 1) submittedNote.answerIsClose = true;

    submittedNote.answered = true;
  });

  return correctCount === ROW_LENGTH;
};

const randomItem = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

// Each note name is equally likely, then one of its octaves in the pool is picked at random.
// (Picking from the pool directly would favor names that appear in more octaves.)
export const generateNotes = (settings: GameSettings): MelodyNote[] => {
  const pool = melodyPool(settings);

  return Array.from({ length: ROW_LENGTH }, () => {
    const pitchClass = Math.floor(Math.random() * 12);
    const midi = randomItem(pool.filter((note) => pitchClassOf(note) === pitchClass));
    return {
      noteNotation: NOTE_LABELS[pitchClass],
      tone: TONE_STRINGS[pitchClass],
      octave: octaveOf(midi),
    };
  });
};
