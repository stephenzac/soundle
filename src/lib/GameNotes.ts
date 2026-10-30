import { NoteTile } from '../contexts/GameContext';
import { GameNote, MelodyNote, NOTE_LABELS, TONE_STRINGS } from '../constants/notes';
import { ROW_LENGTH } from '../constants/game-board';
import { GameSettings, melodyPool } from '../constants/settings';
import { octaveOf, pitchClassOf } from './pitch';

// Scores a full row against the melody, returning new tiles. A wrong note a half step from the
// right one gets the direction of the right note, wrapping around the octave (B to C is up).
export const scoreGuess = (row: NoteTile[], melody: GameNote[]): NoteTile[] =>
  row.map((tile, index) => {
    if (tile.note === '') return tile;

    const guessed = NOTE_LABELS.indexOf(tile.note.noteNotation);
    const actual = NOTE_LABELS.indexOf(melody[index].noteNotation);
    const semitonesUp = (actual - guessed + 12) % 12;
    return {
      ...tile,
      answered: true,
      correct: semitonesUp === 0,
      closeDirection: semitonesUp === 1 ? 'up' : semitonesUp === 11 ? 'down' : null,
    };
  });

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
