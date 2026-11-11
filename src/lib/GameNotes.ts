import { NoteTile } from '../contexts/GameContext';
import { GameNote, MelodyNote, NOTE_LABELS, TONE_STRINGS } from '../constants/notes';
import { ROW_LENGTH } from '../constants/game-board';
import { GameSettings, melodyPool } from '../constants/settings';
import { midiFromParts, octaveOf, pitchClassOf } from './pitch';

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

// The notes to play for a guessed row. A guess is only a note name, so each is played in the
// octave closest to the melody's note at that spot (among those the instrument plays): a B
// guessed for a C4 sounds as B3, a half step below, as the arrow says.
export const guessTones = (
  row: NoteTile[],
  melody: MelodyNote[],
  settings: GameSettings
): number[] => {
  const pool = melodyPool(settings);
  return row.map((tile, index) => {
    const target = midiFromParts(
      NOTE_LABELS.indexOf(melody[index].noteNotation),
      melody[index].octave
    );
    const guessed =
      tile.note === '' ? pitchClassOf(target) : NOTE_LABELS.indexOf(tile.note.noteNotation);
    const options = pool.filter((midi) => pitchClassOf(midi) === guessed);
    return options.reduce((best, midi) =>
      Math.abs(midi - target) < Math.abs(best - target) ? midi : best
    );
  });
};
