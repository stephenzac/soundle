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
export type NoteLabel = (typeof NOTE_LABELS)[number];

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
  noteNotation: NoteLabel;
  tone: ToneString;
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
