export const INSTRUMENT_IDS = [
  'synth',
  'piano',
  'guitar',
  'bass',
  'trumpet',
  'trombone',
  'tuba',
  'flute',
  'clarinet',
  'alto-sax',
] as const;
export type InstrumentId = (typeof INSTRUMENT_IDS)[number];

export interface Instrument {
  name: string;
  // The octaves this instrument can play (C of lowestOctave to B of highestOctave). For sampled
  // instruments, no note is more than 3 semitones beyond its lowest or highest recording.
  lowestOctave: number;
  highestOctave: number;
  // Seconds each melody note is held before release
  noteSeconds: number;
  // Recorded notes in public/samples/<id>/<note>.mp3 ("s" means sharp, as in As4.mp3).
  // Absent for the synth, which needs no samples.
  samples?: readonly string[];
}

export const INSTRUMENTS: Record<InstrumentId, Instrument> = {
  synth: { name: 'Synth', lowestOctave: 1, highestOctave: 7, noteSeconds: 0.25 },
  piano: {
    name: 'Piano',
    lowestOctave: 1,
    highestOctave: 7,
    noteSeconds: 0.55,
    samples: [
      ...[1, 2, 3, 4, 5, 6, 7].flatMap((octave) => ['C', 'Ds', 'Fs', 'A'].map((n) => n + octave)),
      'C8',
    ],
  },
  guitar: {
    name: 'Guitar',
    lowestOctave: 2,
    highestOctave: 4,
    noteSeconds: 0.55,
    samples: ['D2', 'F2', 'Gs2', 'B2', 'D3', 'F3', 'Gs3', 'B3', 'D4', 'F4', 'Gs4', 'B4', 'D5'],
  },
  bass: {
    name: 'Bass',
    lowestOctave: 1,
    highestOctave: 4,
    noteSeconds: 0.55,
    samples: [
      ...[1, 2, 3, 4].flatMap((octave) => ['Cs', 'E', 'G', 'As'].map((n) => n + octave)),
      'Cs5',
    ],
  },
  trumpet: {
    name: 'Trumpet',
    lowestOctave: 4,
    highestOctave: 5,
    noteSeconds: 0.55,
    samples: ['F3', 'A3', 'C4', 'Ds4', 'G4', 'As4', 'D5', 'F5', 'A5', 'C6'],
  },
  trombone: {
    name: 'Trombone',
    lowestOctave: 2,
    highestOctave: 3,
    noteSeconds: 0.55,
    // The source set mixes in slow-swelling notes (Gs2, C3, Ds3, Gs3, As3, D4) that sound quiet
    // and late in a short melody note, so only its quick-attack recordings are used
    samples: ['As1', 'Cs2', 'Ds2', 'F2', 'As2', 'D3', 'F3', 'C4'],
  },
  tuba: {
    name: 'Tuba',
    lowestOctave: 2,
    highestOctave: 3,
    noteSeconds: 0.55,
    samples: ['F1', 'As1', 'Ds2', 'As2', 'D3', 'F3', 'As3', 'D4'],
  },
  flute: {
    name: 'Flute',
    lowestOctave: 4,
    highestOctave: 6,
    noteSeconds: 0.55,
    samples: ['C4', 'E4', 'A4', 'C5', 'E5', 'A5', 'C6', 'E6', 'A6', 'C7'],
  },
  clarinet: {
    name: 'Clarinet',
    lowestOctave: 3,
    highestOctave: 5,
    noteSeconds: 0.55,
    samples: ['D3', 'F3', 'As3', 'D4', 'F4', 'As4', 'D5', 'F5', 'As5', 'D6', 'Fs6'],
  },
  'alto-sax': {
    name: 'Alto sax',
    lowestOctave: 3,
    highestOctave: 5,
    noteSeconds: 0.55,
    samples: ['Cs3', 'E3', 'G3', 'As3', 'Cs4', 'E4', 'G4', 'As4', 'Cs5', 'E5', 'G5', 'A5'],
  },
};
