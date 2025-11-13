import * as Tone from 'tone';
import { NoteTile } from '../contexts/GameContext';
import {
  GameNote,
  NoteLabel,
  NOTE_LABELS,
  TONE_STRINGS,
} from '../constants/notes';
import { ROW_LENGTH } from '../constants/game-board';

const checkNoteDistance = (
  submittedNote: NoteLabel | '',
  actualNote: NoteLabel | ''
): number => {
  if (submittedNote === '' || actualNote === '') return -1;
  if (
    (submittedNote === 'B' && actualNote === 'C') ||
    (submittedNote === 'C' && actualNote === 'B')
  )
    return 1;

  return Math.abs(
    NOTE_LABELS.indexOf(submittedNote) - NOTE_LABELS.indexOf(actualNote)
  );
};

export const checkNotes = (
  submittedNotes: NoteTile[],
  actualNotes: GameNote[]
): boolean => {
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

export const generateNotes = (): GameNote[] => {
  let generatedNotes: GameNote[] = [];

  for (let i = 0; i < ROW_LENGTH; i++) {
    let randomIndex = Math.floor(Math.random() * 12);
    generatedNotes.push({
      noteNotation: NOTE_LABELS[randomIndex],
      tone: TONE_STRINGS[randomIndex],
    });
  }

  return generatedNotes;
};

export const playMelody = async (notes: GameNote[]): Promise<void> => {
  await Tone.start();
  const synth = new Tone.Synth().toDestination();
  const now = Tone.now();

  notes.forEach((note: GameNote, index: number) => {
    const startTime = now + index / 1.6;
    synth.triggerAttack(`${note.tone}4`, startTime);

    const noteDuration = Tone.Time('8n').toSeconds();
    synth.triggerRelease(startTime + noteDuration);
  });

  Tone.Transport.start();
};
