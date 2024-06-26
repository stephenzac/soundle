import * as Tone from "tone";
import { NoteTile } from "./contexts/GameContext";

const MELODY_LENGTH = 5;
const NOTES = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];

export const CheckNotes = (
  submittedNotes: NoteTile[],
  actualNotes: string[]
): boolean => {
  let correctCount = 0;

  for (let i = 0; i < MELODY_LENGTH; i++) {
    submittedNotes[i].answered = true;

    if (submittedNotes[i].noteName == actualNotes[i]) {
      submittedNotes[i].correct = true;
      correctCount++;
    }
  }

  if (correctCount == MELODY_LENGTH) {
    return true;
  }
  return false;
};

export const GenerateNotes = (): string[] => {
  let generatedNotes = [];

  for (let i = 0; i < MELODY_LENGTH; i++) {
    let randomIndex = Math.floor(Math.random() * 12);
    generatedNotes.push(NOTES[randomIndex]);
  }

  return generatedNotes;
};

export const PlayMelody = (notes: string[]): void => {
  Tone.start();
  const synth = new Tone.Synth().toDestination();
  const now = Tone.now();

  notes.forEach((note: string, index: number) => {
    if (note.includes("♯")) {
      note = note.replace("♯", "#");
    } else if (note.includes("♭")) {
      note = note.replace("♭", "b");
    }

    const startTime = now + index / 1.75;
    synth.triggerAttack(`${note}4`, startTime);

    const noteDuration = Tone.Time("8n").toSeconds();
    synth.triggerRelease(startTime + noteDuration);
  });

  Tone.Transport.start();
};
