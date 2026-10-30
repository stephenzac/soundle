import { INSTRUMENTS, InstrumentId, octaveLimits } from './instruments';
import { midiFromName, midiFromParts, pitchClassOf } from '../lib/pitch';

// Below about C3, small phone and laptop speakers barely reproduce these sounds
export const QUIET_BELOW = midiFromParts(0, 3);

export interface GameSettings {
  instrument: InstrumentId;
  // The chosen octaves, in scientific pitch notation (C4 is middle C): from the C of
  // lowestOctave up through octaveRange octaves
  lowestOctave: number;
  octaveRange: number;
}

// Synth, one octave from middle C: the original Soundle behavior
export const DEFAULT_SETTINGS: GameSettings = {
  instrument: 'synth',
  lowestOctave: 4,
  octaveRange: 1,
};

export const maxOctaveRange = ({ instrument, lowestOctave }: GameSettings): number =>
  octaveLimits(instrument).highestOctave - lowestOctave + 1;

// Moves the octaves inside the instrument's limits, changing as little of the choice as possible
export const fitOctavesToInstrument = (settings: GameSettings): GameSettings => {
  const { lowestOctave: min, highestOctave: max } = octaveLimits(settings.instrument);
  const lowestOctave = Math.min(Math.max(settings.lowestOctave, min), max);
  const octaveRange = Math.min(settings.octaveRange, max - lowestOctave + 1);
  return { ...settings, lowestOctave, octaveRange };
};

export const octavesChanged = (a: GameSettings, b: GameSettings): boolean =>
  a.lowestOctave !== b.lowestOctave || a.octaveRange !== b.octaveRange;

// The notes (as MIDI numbers, ascending) a melody can use: every note of the chosen octaves the
// instrument can play. A chosen octave can run past the instrument's range (a trombone's
// lowest octave starts at E2, not C2), so any note name left out is added from the nearest
// octave the instrument can play. Every note name stays possible, as the 12 guess keys expect.
export const melodyPool = ({ instrument, lowestOctave, octaveRange }: GameSettings): number[] => {
  const instrumentLow = midiFromName(INSTRUMENTS[instrument].lowestNote);
  const instrumentHigh = midiFromName(INSTRUMENTS[instrument].highestNote);
  const chosenLow = midiFromParts(0, lowestOctave);
  const chosenHigh = midiFromParts(11, lowestOctave + octaveRange - 1);

  const pool: number[] = [];
  for (
    let midi = Math.max(chosenLow, instrumentLow);
    midi <= Math.min(chosenHigh, instrumentHigh);
    midi++
  ) {
    pool.push(midi);
  }

  for (let pitchClass = 0; pitchClass < 12; pitchClass++) {
    if (pool.some((midi) => pitchClassOf(midi) === pitchClass)) continue;

    let nearest: number | undefined;
    for (let midi = instrumentLow; midi <= instrumentHigh; midi++) {
      if (pitchClassOf(midi) !== pitchClass) continue;
      const distance = Math.min(Math.abs(midi - chosenLow), Math.abs(midi - chosenHigh));
      const nearestDistance =
        nearest === undefined
          ? Infinity
          : Math.min(Math.abs(nearest - chosenLow), Math.abs(nearest - chosenHigh));
      if (distance < nearestDistance) nearest = midi;
    }
    if (nearest !== undefined) pool.push(nearest);
  }

  return pool.sort((a, b) => a - b);
};

// The C to play as a reference: the one in the melody's notes closest to their middle, so it
// sits in the same register as the melody
export const referenceNote = (settings: GameSettings): number => {
  const pool = melodyPool(settings);
  const middle = (pool[0] + pool[pool.length - 1]) / 2;
  const cs = pool.filter((midi) => pitchClassOf(midi) === 0);
  return cs.reduce((best, c) => (Math.abs(c - middle) < Math.abs(best - middle) ? c : best));
};
