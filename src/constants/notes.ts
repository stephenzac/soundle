export const NOTE_LABELS = [
  'C',
  'D♭',
  'D',
  'E♭',
  'E',
  'F',
  'G♭',
  'G',
  'A♭',
  'A',
  'B♭',
  'B',
] as const;
export type NoteNotationLabel = (typeof NOTE_LABELS)[number];

export const TONE_STRINGS = [
  'C',
  'Db',
  'D',
  'Eb',
  'E',
  'F',
  'Gb',
  'G',
  'Ab',
  'A',
  'Bb',
  'B',
] as const;
export type ToneString = (typeof TONE_STRINGS)[number];

export interface GameNote {
  noteNotation: NoteNotationLabel;
  tone: ToneString;
}

// A note in the melody. Guesses are by note name only, so only the melody carries an octave.
export interface MelodyNote extends GameNote {
  octave: number;
}

export const validGameNotes: GameNote[] = [
  { noteNotation: 'C', tone: 'C' },
  { noteNotation: 'D♭', tone: 'Db' },
  { noteNotation: 'D', tone: 'D' },
  { noteNotation: 'E♭', tone: 'Eb' },
  { noteNotation: 'E', tone: 'E' },
  { noteNotation: 'F', tone: 'F' },
  { noteNotation: 'G♭', tone: 'Gb' },
  { noteNotation: 'G', tone: 'G' },
  { noteNotation: 'A♭', tone: 'Ab' },
  { noteNotation: 'A', tone: 'A' },
  { noteNotation: 'B♭', tone: 'Bb' },
  { noteNotation: 'B', tone: 'B' },
];

// The same note moved by some semitones, wrapping around the octave. Used to turn concert note
// names into those written for a transposing instrument (and back, with negative semitones).
export const transposeNote = (note: GameNote, semitones: number): GameNote =>
  validGameNotes[(((NOTE_LABELS.indexOf(note.noteNotation) + semitones) % 12) + 12) % 12];

// How the five black-key notes are spelled on screen. Notes are always stored by their flat
// names (NOTE_LABELS); this only changes what's shown.
export type Accidentals = 'flats' | 'sharps';

const SHARP_LABELS = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'] as const;

// A pitch class's name as shown, like "D♭" or "C♯" for the same note
export const noteLabel = (pitchClass: number, accidentals: Accidentals): string =>
  (accidentals === 'sharps' ? SHARP_LABELS : NOTE_LABELS)[pitchClass];
