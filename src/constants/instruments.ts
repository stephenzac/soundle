import { midiFromName, midiFromParts, octaveOf } from '../lib/pitch';

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
  // The instrument's usual playable range at concert (sounding) pitch, in the samples' naming
  // ("s" means sharp). Where the recordings don't reach the real range, it stops 3 semitones
  // past the last recording, the furthest a note is shifted without sounding unnatural.
  lowestNote: string;
  highestNote: string;
  // Seconds each melody note is held before release
  noteSeconds: number;
  // Recorded notes in public/samples/<id>/<note>.mp3 ("s" means sharp, as in As4.mp3).
  // Absent for the synth, which needs no samples.
  samples?: readonly string[];
  // For instruments whose music is written in another key: how many semitones above the
  // sounding pitch their notes are written, and the key they're in (a B-flat trumpet's written C
  // sounds as a concert B-flat)
  transposition?: { semitones: number; key: string };
}

export const INSTRUMENTS: Record<InstrumentId, Instrument> = {
  // Not a real instrument, so it keeps the full C1 to B7 range
  synth: { name: 'Synth', lowestNote: 'C1', highestNote: 'B7', noteSeconds: 0.25 },
  piano: {
    name: 'Piano',
    // Full 88-key range; A0 to B0 are shifted down from the C1 recording
    lowestNote: 'A0',
    highestNote: 'C8',
    noteSeconds: 0.55,
    samples: [
      ...[1, 2, 3, 4, 5, 6, 7].flatMap((octave) => ['C', 'Ds', 'Fs', 'A'].map((n) => n + octave)),
      'C8',
    ],
  },
  guitar: {
    name: 'Guitar',
    // Standard tuning starts at E2. A 19-fret guitar reaches B5, but the recordings stop at D5
    lowestNote: 'E2',
    highestNote: 'F5',
    noteSeconds: 0.55,
    samples: ['D2', 'F2', 'Gs2', 'B2', 'D3', 'F3', 'Gs3', 'B3', 'D4', 'F4', 'Gs4', 'B4', 'D5'],
  },
  bass: {
    name: 'Bass',
    // 4-string bass in standard tuning, E1 up to the 24th fret on the G string
    lowestNote: 'E1',
    highestNote: 'G4',
    noteSeconds: 0.55,
    samples: [
      ...[1, 2, 3, 4].flatMap((octave) => ['Cs', 'E', 'G', 'As'].map((n) => n + octave)),
      'Cs5',
    ],
  },
  trumpet: {
    name: 'Trumpet',
    // B-flat trumpet: written F#3 to C6, sounding a whole step lower
    lowestNote: 'E3',
    highestNote: 'As5',
    noteSeconds: 0.55,
    samples: ['F3', 'A3', 'C4', 'Ds4', 'G4', 'As4', 'D5', 'F5', 'A5', 'C6'],
    transposition: { semitones: 2, key: 'B♭' },
  },
  trombone: {
    name: 'Trombone',
    // Tenor trombone without an F trigger bottoms out at E2 (only unreliable pedal tones lie
    // below). Players reach C5 to D5, but the source's quick-attack recordings stop at F4.
    lowestNote: 'E2',
    highestNote: 'Gs4',
    noteSeconds: 0.55,
    // The source set mixes in slow-swelling notes (Gs2, C3, Ds3, Gs3, As3, D4) that sound quiet
    // and late in a short melody note, so only its quick-attack recordings are used
    samples: ['As1', 'Cs2', 'Ds2', 'F2', 'As2', 'D3', 'F3', 'C4', 'Ds4', 'F4'],
  },
  tuba: {
    name: 'Tuba',
    // Orchestral tuba
    lowestNote: 'E1',
    highestNote: 'F4',
    noteSeconds: 0.55,
    samples: ['F1', 'As1', 'Ds2', 'As2', 'D3', 'F3', 'As3', 'D4'],
  },
  flute: {
    name: 'Flute',
    // Concert flute with a C foot
    lowestNote: 'C4',
    highestNote: 'C7',
    noteSeconds: 0.55,
    samples: ['C4', 'E4', 'A4', 'C5', 'E5', 'A5', 'C6', 'E6', 'A6', 'C7'],
  },
  clarinet: {
    name: 'Clarinet',
    // B-flat clarinet: written E3 to C7, sounding D3 to B-flat 6. The recordings stop at F#6.
    lowestNote: 'D3',
    highestNote: 'A6',
    noteSeconds: 0.55,
    samples: ['D3', 'F3', 'As3', 'D4', 'F4', 'As4', 'D5', 'F5', 'As5', 'D6', 'Fs6'],
    transposition: { semitones: 2, key: 'B♭' },
  },
  'alto-sax': {
    name: 'Alto sax',
    // E-flat alto sax: written B-flat 3 to F6, sounding a major sixth lower
    lowestNote: 'Cs3',
    highestNote: 'Gs5',
    noteSeconds: 0.55,
    samples: ['Cs3', 'E3', 'G3', 'As3', 'Cs4', 'E4', 'G4', 'As4', 'Cs5', 'E5', 'G5', 'A5'],
    transposition: { semitones: 9, key: 'E♭' },
  },
};

// How much of an octave (C to B) must be playable for it to be offered as a choice. Notes in a
// chosen octave that the instrument can't play are moved to an octave it can (see melodyPool).
const MIN_PLAYABLE_NOTES_PER_OCTAVE = 6;

// The octaves offered in settings: those where the instrument plays at least half the notes
export const octaveLimits = (instrument: InstrumentId) => {
  const low = midiFromName(INSTRUMENTS[instrument].lowestNote);
  const high = midiFromName(INSTRUMENTS[instrument].highestNote);
  const playable = (octave: number) =>
    Math.min(high, midiFromParts(11, octave)) - Math.max(low, midiFromParts(0, octave)) + 1;

  let lowestOctave = octaveOf(low);
  if (playable(lowestOctave) < MIN_PLAYABLE_NOTES_PER_OCTAVE) lowestOctave++;
  let highestOctave = octaveOf(high);
  if (playable(highestOctave) < MIN_PLAYABLE_NOTES_PER_OCTAVE) highestOctave--;
  return { lowestOctave, highestOctave };
};
