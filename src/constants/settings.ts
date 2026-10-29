import { INSTRUMENTS, InstrumentId } from './instruments';

// Octaves use scientific pitch notation, where C4 is middle C and A4 is 440 Hz.
// Below about C3, small phone and laptop speakers barely reproduce these sounds.
export const QUIET_BELOW_OCTAVE = 3;

export interface GameSettings {
  instrument: InstrumentId;
  // The octave of the lowest possible note (its C)
  lowestOctave: number;
  // How many consecutive octaves, starting at lowestOctave, the melody can use
  octaveRange: number;
}

// Synth, one octave from middle C: the original Soundle behavior
export const DEFAULT_SETTINGS: GameSettings = {
  instrument: 'synth',
  lowestOctave: 4,
  octaveRange: 1,
};

export const maxOctaveRange = ({ instrument, lowestOctave }: GameSettings): number =>
  INSTRUMENTS[instrument].highestOctave - lowestOctave + 1;

// Moves the octaves inside the instrument's range, changing as little of the choice as possible
export const fitOctavesToInstrument = (settings: GameSettings): GameSettings => {
  const { lowestOctave: min, highestOctave: max } = INSTRUMENTS[settings.instrument];
  const lowestOctave = Math.min(Math.max(settings.lowestOctave, min), max);
  const octaveRange = Math.min(settings.octaveRange, max - lowestOctave + 1);
  return { ...settings, lowestOctave, octaveRange };
};

export const octavesChanged = (a: GameSettings, b: GameSettings): boolean =>
  a.lowestOctave !== b.lowestOctave || a.octaveRange !== b.octaveRange;
