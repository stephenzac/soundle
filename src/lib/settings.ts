import { INSTRUMENT_IDS, octaveLimits } from '../constants/instruments';
import { DEFAULT_SETTINGS, GameSettings } from '../constants/settings';

const STORAGE_KEY = 'soundle::settings';
// Octave-only settings saved before instruments were added
const LEGACY_OCTAVE_KEY = 'soundle::octaveSettings';

const isValid = (value: unknown): value is GameSettings => {
  if (typeof value !== 'object' || value === null) return false;
  const { instrument, lowestOctave, octaveRange, writtenPitch, accidentals } = value as Record<
    string,
    unknown
  >;
  if (!INSTRUMENT_IDS.includes(instrument as GameSettings['instrument'])) return false;
  if (typeof writtenPitch !== 'boolean') return false;
  if (accidentals !== 'flats' && accidentals !== 'sharps') return false;
  if (!Number.isInteger(lowestOctave) || !Number.isInteger(octaveRange)) return false;

  const { lowestOctave: min, highestOctave: max } = octaveLimits(
    instrument as GameSettings['instrument']
  );
  const low = lowestOctave as number;
  const range = octaveRange as number;
  return low >= min && low <= max && range >= 1 && low + range - 1 <= max;
};

const read = (key: string): unknown => JSON.parse(localStorage.getItem(key) ?? 'null');

// Storage can be unavailable (private browsing, blocked site data), so fall back to defaults
export const loadSettings = (): GameSettings => {
  try {
    // Settings saved before the written-pitch and accidentals options lack them, so they get
    // their defaults
    const { writtenPitch, accidentals } = DEFAULT_SETTINGS;
    const saved = { writtenPitch, accidentals, ...(read(STORAGE_KEY) ?? {}) };
    if (isValid(saved)) return saved;

    const legacy = {
      instrument: DEFAULT_SETTINGS.instrument,
      writtenPitch,
      accidentals,
      ...(read(LEGACY_OCTAVE_KEY) ?? {}),
    };
    return isValid(legacy) ? legacy : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const saveSettings = (settings: GameSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    localStorage.removeItem(LEGACY_OCTAVE_KEY);
  } catch {
    // Settings still apply for this visit; they just won't be remembered
  }
};
