// Octaves use scientific pitch notation, where C4 is middle C and A4 is 440 Hz.
export const LOWEST_OCTAVE = 1;
// B7 (~3951 Hz) is the highest note the melody can use, matching the top of a piano's range.
export const HIGHEST_OCTAVE = 7;
// Below about C3, small phone and laptop speakers barely reproduce a synth tone.
export const QUIET_BELOW_OCTAVE = 3;

export interface OctaveSettings {
  // The octave of the lowest possible note (its C)
  lowestOctave: number;
  // How many consecutive octaves, starting at lowestOctave, the melody can use
  octaveRange: number;
}

// One octave from middle C: the original Soundle behavior
export const DEFAULT_OCTAVE_SETTINGS: OctaveSettings = { lowestOctave: 4, octaveRange: 1 };

export const maxOctaveRange = (lowestOctave: number): number => HIGHEST_OCTAVE - lowestOctave + 1;
