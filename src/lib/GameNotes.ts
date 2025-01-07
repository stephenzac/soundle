import * as Tone from 'tone';
import { NoteTile } from '../contexts/GameContext';
import { NoteNotation, musicNotes } from '../constants/notes';
import { ROW_LENGTH } from '../constants/game-board';

const checkNoteDistance = (
  submittedNote: NoteNotation | '',
  actualNote: NoteNotation | ''
): number => {
  if (submittedNote === '' || actualNote === '') return -1;
  if (
    (submittedNote === 'B' && actualNote === 'C') ||
    (submittedNote === 'C' && actualNote === 'B')
  )
    return 1;

  return Math.abs(
    musicNotes.indexOf(submittedNote) - musicNotes.indexOf(actualNote)
  );
};

export const checkNotes = (
  submittedNotes: NoteTile[],
  actualNotes: NoteNotation[]
): boolean => {
  let correctCount = 0;

  for (let i = 0; i < ROW_LENGTH; i++) {
    const submittedNote = submittedNotes[i];
    const actualNote: NoteNotation = actualNotes[i];

    submittedNote.answered = true;

    if (submittedNote.noteName === actualNote) {
      submittedNote.correct = true;
      correctCount++;
    }

    // // Check if guess is a half step off
    const noteDistance = checkNoteDistance(submittedNote.noteName, actualNote);
    if (noteDistance === 1) submittedNote.answerIsClose = true;
  }

  return correctCount === ROW_LENGTH;
};

export const generateNotes = (): NoteNotation[] => {
  let generatedNotes: NoteNotation[] = [];

  for (let i = 0; i < ROW_LENGTH; i++) {
    let randomIndex = Math.floor(Math.random() * 12);
    generatedNotes.push(musicNotes[randomIndex]);
  }

  return generatedNotes;
};

export const playMelody = async (notes: NoteNotation[]): Promise<void> => {
  await Tone.start();
  const synth = new Tone.Synth().toDestination();
  const now = Tone.now();

  notes.forEach((note: NoteNotation, index: number) => {
    if (note.includes('♯')) {
      note = note.replace('♯', '#') as NoteNotation;
    } else if (note.includes('♭')) {
      note = note.replace('♭', 'b') as NoteNotation;
    }

    const startTime = now + index / 1.75;
    synth.triggerAttack(`${note}4`, startTime);

    const noteDuration = Tone.Time('8n').toSeconds();
    synth.triggerRelease(startTime + noteDuration);
  });

  Tone.Transport.start();
};
