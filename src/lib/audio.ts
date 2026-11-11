import type * as ToneModule from 'tone';
import { INSTRUMENTS } from '../constants/instruments';
import { MelodyNote } from '../constants/notes';
import { GameSettings, melodyPool, referenceNote } from '../constants/settings';
import { midiFromName, toneNameOf } from './pitch';

// Both Tone.Synth and Tone.Sampler fit this shape
interface Voice {
  triggerAttackRelease: (note: string, duration: number, time: number) => unknown;
  connect: (destination: ToneModule.InputNode) => unknown;
  dispose: () => unknown;
}

interface LoadedInstrument {
  // A new voice for each playback, so one can be stopped without cutting off the others (and a
  // one-note-at-a-time synth can play the reference over the melody)
  createVoice: () => Voice;
  // Sampled notes are raised to the synth's level, with a compressor catching their peaks
  sampled: boolean;
}

// A melody, guess, or reference note that's been scheduled
export interface Playback {
  // Seconds until the first note sounds, so visuals can be timed to it
  startsIn: number;
  // Fades out what's sounding and cancels the notes not yet played
  stop: () => void;
}

// Tone creates an AudioContext as soon as it's imported, which browsers warn about when that
// happens before a user gesture. Callers only load it from a click, which also keeps it out of
// the initial bundle.
let tonePromise: Promise<typeof ToneModule> | undefined;
const loadTone = () => (tonePromise ??= import('tone'));

// The recordings needed for these notes: those inside their range, plus the nearest one on
// each side so the notes at the edges are shifted from a close recording
const samplesForNotes = (samples: readonly string[], notes: number[]) => {
  const lowest = notes[0];
  const highest = notes[notes.length - 1];
  const inside = samples.filter((s) => midiFromName(s) >= lowest && midiFromName(s) <= highest);
  const below = samples.filter((s) => midiFromName(s) < lowest).at(-1);
  const above = samples.find((s) => midiFromName(s) > highest);
  return [below, ...inside, above].filter((s) => s !== undefined);
};

// The recordings vary a lot in level (up to 16 dB between neighboring notes) and some start
// with silence, which a short melody note makes obvious. Each sample is trimmed and leveled.
const LEAD_IN_SECONDS = 0.01;
const LOUDNESS_WINDOW_SECONDS = 0.25;
// A melody note plus its release never lasts longer than this, so later audio doesn't matter
const AUDIBLE_SECONDS = 1;
const TARGET_RMS = 10 ** (-18 / 20);
const MAX_PEAK = 0.98;
// Raises sampled notes to the synth's level (both about -16 dB over the 0.55 s after a note
// starts). Leveling there directly would leave piano and trombone uneven, since their sharp
// attacks would hit MAX_PEAK first, so an instant-attack compressor catches those peaks instead.
const SAMPLER_VOLUME_DB = 1.5;

const peakOf = (channels: Float32Array[], start: number, end: number) => {
  let peak = 0;
  for (const data of channels) {
    for (const v of data.subarray(start, end)) peak = Math.max(peak, Math.abs(v));
  }
  return peak;
};

const firstIndexAbove = (channels: Float32Array[], level: number, from = 0) =>
  Math.min(
    ...channels.map((data) => {
      const index = data.findIndex((v, i) => i >= from && Math.abs(v) > level);
      return index === -1 ? data.length : index;
    })
  );

// Trims the quiet or breathy lead-in and scales the sample so its first moments, the part a
// melody note is heard by, sit at TARGET_RMS without clipping
export const levelSample = (channels: Float32Array[], sampleRate: number): Float32Array[] => {
  const audible = Math.floor(AUDIBLE_SECONDS * sampleRate);
  const overallPeak = peakOf(channels, 0, Infinity);
  if (overallPeak === 0) return channels;

  // Measure against the loudest point near the start, not one from a swell much later
  const roughStart = firstIndexAbove(channels, overallPeak * 0.01);
  const notePeak = peakOf(channels, roughStart, roughStart + audible);
  const firstSound = firstIndexAbove(channels, notePeak * 0.1, roughStart);
  const start = Math.max(0, firstSound - Math.floor(LEAD_IN_SECONDS * sampleRate));
  const trimmed = channels.map((data) => data.slice(start));

  const windowEnd = Math.floor(LOUDNESS_WINDOW_SECONDS * sampleRate);
  let sumOfSquares = 0;
  let count = 0;
  for (const data of trimmed) {
    for (const v of data.subarray(0, windowEnd)) sumOfSquares += v * v;
    count += Math.min(windowEnd, data.length);
  }
  const rms = Math.sqrt(sumOfSquares / count);
  const gain = Math.min(TARGET_RMS / rms, MAX_PEAK / peakOf(trimmed, 0, audible));

  for (const data of trimmed) for (let i = 0; i < data.length; i++) data[i] *= gain;
  return trimmed;
};

const instruments = new Map<string, Promise<LoadedInstrument>>();

// Loads the instrument for these settings, downloading only the samples their octaves need.
// Cached, so calling it again (to preload, then to play) costs nothing.
export const loadInstrument = (settings: GameSettings): Promise<LoadedInstrument> => {
  const { instrument, lowestOctave, octaveRange } = settings;
  const key = `${instrument}:${lowestOctave}:${octaveRange}`;
  const cached = instruments.get(key);
  if (cached) return cached;

  const loaded = loadTone().then(async (Tone): Promise<LoadedInstrument> => {
    const { samples } = INSTRUMENTS[instrument];
    if (!samples) return { createVoice: () => new Tone.Synth(), sampled: false };

    const buffers = await Promise.all(
      samplesForNotes(samples, melodyPool(settings)).map(async (s) => {
        const audio = await Tone.ToneAudioBuffer.load(`./samples/${instrument}/${s}.mp3`);
        const channels = Array.from({ length: audio.numberOfChannels }, (_, c) =>
          audio.getChannelData(c)
        );
        const leveled = levelSample(channels, audio.sampleRate);
        // Kept as plain AudioBuffers, which a voice's disposal can't release
        return [s.replace('s', '#'), Tone.ToneAudioBuffer.fromArray(leveled).get()] as const;
      })
    );
    const urls: Record<string, AudioBuffer> = {};
    for (const [note, buffer] of buffers) if (buffer) urls[note] = buffer;

    // The short attack smooths the cut where levelSample trimmed into the note
    return {
      createVoice: () =>
        new Tone.Sampler({ urls, attack: 0.005, release: 0.3, volume: SAMPLER_VOLUME_DB }),
      sampled: true,
    };
  });

  // Forget a failed load (e.g. offline) so the next attempt retries
  loaded.catch(() => instruments.delete(key));
  instruments.set(key, loaded);
  return loaded;
};

// Time from the start of one melody note to the next
export const NOTE_SPACING_SECONDS = 0.8;
// Covers the longest release (the synth's, 1 s) before a finished playback is cleaned up
const RELEASE_SECONDS = 1.5;
// Quick enough to feel instant, slow enough not to click
const STOP_FADE_SECONDS = 0.03;

// Plays the notes one after another, starting now, on a voice of their own. Resolves once
// they're scheduled (after any download).
const playNotes = async (notes: string[], settings: GameSettings): Promise<Playback> => {
  const Tone = await loadTone();
  await Tone.start();
  const { createVoice, sampled } = await loadInstrument(settings);
  const { noteSeconds } = INSTRUMENTS[settings.instrument];

  const voice = createVoice();
  const output = new Tone.Gain(1);
  voice.connect(output);
  const compressor = sampled
    ? new Tone.Compressor({ threshold: -2, ratio: 20, attack: 0, release: 0.1, knee: 0 })
    : undefined;
  if (compressor) output.chain(compressor, Tone.getDestination());
  else output.toDestination();

  // Tone.now() is a little ahead of the audio clock, so scheduling never falls behind it
  const now = Tone.now();
  notes.forEach((note, index) => {
    voice.triggerAttackRelease(note, noteSeconds, now + index * NOTE_SPACING_SECONDS);
  });
  const startsIn = now - Tone.getContext().currentTime;

  let disposed = false;
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    voice.dispose();
    output.dispose();
    compressor?.dispose();
  };
  const lastsSeconds =
    startsIn + (notes.length - 1) * NOTE_SPACING_SECONDS + noteSeconds + RELEASE_SECONDS;
  const cleanup = window.setTimeout(dispose, lastsSeconds * 1000);

  return {
    startsIn,
    stop: () => {
      if (disposed) return;
      clearTimeout(cleanup);
      output.gain.rampTo(0, STOP_FADE_SECONDS);
      window.setTimeout(dispose, STOP_FADE_SECONDS * 1000 + 50);
    },
  };
};

export const playMelody = (notes: MelodyNote[], settings: GameSettings): Promise<Playback> =>
  playNotes(
    notes.map((note) => `${note.tone}${note.octave}`),
    settings
  );

export const playReference = (settings: GameSettings): Promise<Playback> =>
  playNotes([toneNameOf(referenceNote(settings))], settings);

// Plays any notes, given as MIDI numbers, at the melody's pace
export const playTones = (midis: number[], settings: GameSettings): Promise<Playback> =>
  playNotes(midis.map(toneNameOf), settings);
