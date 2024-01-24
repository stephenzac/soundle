import * as Tone from "tone";

const MELODY_LENGTH: number = 5;
const NOTES: string[] = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "B♭", "B"];

export const CheckNotes = (submittedNotes: string[], actualNotes: string[]): boolean => {
    for (let i = 0; i < MELODY_LENGTH; i++) {
        if (submittedNotes[i] != actualNotes[i]) {
            console.log(`${submittedNotes} != ${actualNotes}`);
            return false;
        }
    }

    return true;
}

export const GenerateNotes = (): string[] => {
    let generatedNotes: string[] = [];

    for (let i = 0; i < MELODY_LENGTH; i++) {
        let randomIndex: number = Math.floor(Math.random() * 12);
        generatedNotes.push(NOTES[randomIndex]);
    }

    return generatedNotes;
}

export const PlayMelody = (notes: string[]): void => {
    notes.map((note: string) => {
        console.log(note);
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease(`${note}4`, "8n");
    });
}