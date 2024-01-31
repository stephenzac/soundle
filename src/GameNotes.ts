import * as Tone from "tone";
import { NoteTile } from "./contexts/BoardContext";

const MELODY_LENGTH = 5;
const NOTES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "B♭", "B"];

export const CheckNotes = (
  submittedNotes: NoteTile[],
  actualNotes: string[]
): boolean => {
  for (let i = 0; i < MELODY_LENGTH; i++) {
    if (submittedNotes[i].noteName != actualNotes[i]) {
      console.log(`${submittedNotes} != ${actualNotes}`);
      return false;
    }
  }
  return true;
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
  notes.map((note: string) => {
    console.log(note);
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(`${note}4`, "8n");
  });
};

export const RenderNote = (note: string): void => {};
