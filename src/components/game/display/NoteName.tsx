import { NOTE_LABELS } from '../../../constants/notes';
import { octaveOf, pitchClassOf } from '../../../lib/pitch';
import { FlatSign } from './FlatSign';

// A note in running text, like "E♭3", with the flat drawn since the font has no ♭
export const NoteName: React.FC<{ midi: number }> = ({ midi }) => {
  const label = NOTE_LABELS[pitchClassOf(midi)];
  return (
    <>
      {label[0]}
      {label.length > 1 && <FlatSign variant="inline" />}
      {octaveOf(midi)}
    </>
  );
};
