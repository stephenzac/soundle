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
    const currentSubmitted = submittedNotes[i];
    const currentActual = actualNotes[i];

    currentSubmitted.answered = true;

    if (currentSubmitted.noteName == currentActual) {
      currentSubmitted.correct = true;
      correctCount++;
    }

    // Check if guess is a half step off from actual note
    const noteDistance = Math.abs(
      NOTES.indexOf(currentSubmitted.noteName) - NOTES.indexOf(currentActual)
    );
    if (
      noteDistance === 1 ||
      (currentSubmitted.noteName === "B" && currentActual == "C") ||
      (currentSubmitted.noteName === "C" && currentActual === "B")
    ) {
      currentSubmitted.answerIsClose = true;
    }
  }

  return correctCount === MELODY_LENGTH;
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
