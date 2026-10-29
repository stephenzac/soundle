import { NoteTile } from '../contexts/GameContext';
import {
  GameNote,
  MelodyNote,
  NoteNotationLabel,
  NOTE_LABELS,
  TONE_STRINGS,
} from '../constants/notes';
import { ROW_LENGTH } from '../constants/game-board';
import { OctaveSettings } from '../constants/octaves';

const checkNoteDistance = (
  submittedNote: NoteNotationLabel,
  actualNote: NoteNotationLabel
): number => {
  if (
    (submittedNote === 'B' && actualNote === 'C') ||
    (submittedNote === 'C' && actualNote === 'B')
  )
    return 1;

  return Math.abs(NOTE_LABELS.indexOf(submittedNote) - NOTE_LABELS.indexOf(actualNote));
};

export const checkNotes = (submittedNotes: NoteTile[], actualNotes: GameNote[]): boolean => {
  let correctCount = 0;

  submittedNotes.forEach((submittedNote, index) => {
    if (submittedNote.note === '') return false;

    if (submittedNote.note.noteNotation === actualNotes[index].noteNotation) {
      submittedNote.correct = true;
      correctCount++;
    }

    // Check if guess is a half step off
    const noteDistance = checkNoteDistance(
      submittedNote.note.noteNotation,
      actualNotes[index].noteNotation
    );
    if (noteDistance === 1) submittedNote.answerIsClose = true;

    submittedNote.answered = true;
  });

  return correctCount === ROW_LENGTH;
};

export const generateNotes = ({ lowestOctave, octaveRange }: OctaveSettings): MelodyNote[] => {
  const generatedNotes: MelodyNote[] = [];

  for (let i = 0; i < ROW_LENGTH; i++) {
    const randomIndex = Math.floor(Math.random() * 12);
    generatedNotes.push({
      noteNotation: NOTE_LABELS[randomIndex],
      tone: TONE_STRINGS[randomIndex],
      octave: lowestOctave + Math.floor(Math.random() * octaveRange),
    });
  }

  return generatedNotes;
};

// Tone creates an AudioContext as soon as it's imported, which browsers warn about when that
// happens before a user gesture. Importing it here, on the first play (always a click), avoids
// that and keeps it out of the initial bundle.
export const playMelody = async (notes: MelodyNote[]): Promise<void> => {
  const Tone = await import('tone');
  await Tone.start();
  const synth = new Tone.Synth().toDestination();
  const now = Tone.now();

  notes.forEach((note: MelodyNote, index: number) => {
    const startTime = now + index / 1.6;
    synth.triggerAttack(`${note.tone}${note.octave}`, startTime);

    const noteDuration = Tone.Time('8n').toSeconds();
    synth.triggerRelease(startTime + noteDuration);
  });

  Tone.getTransport().start();
};
