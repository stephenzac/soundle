import { use } from 'react';
import { Accidentals, noteLabel } from '../../../constants/notes';
import { GameContext } from '../../../contexts/GameContext';
import { octaveOf, pitchClassOf } from '../../../lib/pitch';
import { NoteLabel } from './NoteLabel';

// A note in running text, like "E♭3", spelled with the chosen accidentals. Settings passes its
// unsaved choice so the preview matches.
export const NoteName: React.FC<{ midi: number; accidentals?: Accidentals }> = ({
  midi,
  accidentals,
}) => {
  const { settings } = use(GameContext);
  return (
    <>
      <NoteLabel
        label={noteLabel(pitchClassOf(midi), accidentals ?? settings.accidentals)}
        variant="inline"
      />
      {octaveOf(midi)}
    </>
  );
};
