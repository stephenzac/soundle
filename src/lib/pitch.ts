// Notes as MIDI numbers, where C4 (middle C) is 60 and A4 (440 Hz) is 69. Octaves follow
// scientific pitch notation, so each octave runs from C to B.

const SHARP_NAMES = ['C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs', 'A', 'As', 'B'];

// Parses names in the sample files' style, where "s" means sharp: "E2", "As4"
export const midiFromName = (name: string): number =>
  (Number(name.slice(-1)) + 1) * 12 + SHARP_NAMES.indexOf(name.slice(0, -1));

export const midiFromParts = (pitchClass: number, octave: number): number =>
  (octave + 1) * 12 + pitchClass;

// 0 for C through 11 for B, indexing NOTE_LABELS and TONE_STRINGS
export const pitchClassOf = (midi: number): number => midi % 12;

export const octaveOf = (midi: number): number => Math.floor(midi / 12) - 1;
