import {
  DEFAULT_OCTAVE_SETTINGS,
  HIGHEST_OCTAVE,
  LOWEST_OCTAVE,
  OctaveSettings,
  maxOctaveRange,
} from '../constants/octaves';

const STORAGE_KEY = 'soundle::octaveSettings';

const isValid = (value: unknown): value is OctaveSettings => {
  if (typeof value !== 'object' || value === null) return false;
  const { lowestOctave, octaveRange } = value as Record<string, unknown>;

  return (
    Number.isInteger(lowestOctave) &&
    Number.isInteger(octaveRange) &&
    (lowestOctave as number) >= LOWEST_OCTAVE &&
    (lowestOctave as number) <= HIGHEST_OCTAVE &&
    (octaveRange as number) >= 1 &&
    (octaveRange as number) <= maxOctaveRange(lowestOctave as number)
  );
};

// Storage can be unavailable (private browsing, blocked site data), so fall back to defaults
export const loadOctaveSettings = (): OctaveSettings => {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
    return isValid(parsed) ? parsed : DEFAULT_OCTAVE_SETTINGS;
  } catch {
    return DEFAULT_OCTAVE_SETTINGS;
  }
};

export const saveOctaveSettings = (settings: OctaveSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Settings still apply for this visit; they just won't be remembered
  }
};
