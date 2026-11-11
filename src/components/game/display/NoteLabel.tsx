import { FlatSign } from './FlatSign';
import { SharpSign } from './SharpSign';

// The drawn ♭ or ♯ for a note name's second character, if it has one
export const AccidentalSign: React.FC<{
  symbol: string | undefined;
  variant: 'superscript' | 'inline';
}> = ({ symbol, variant }) => {
  if (symbol === '♭') return <FlatSign variant={variant} />;
  if (symbol === '♯') return <SharpSign variant={variant} />;
  return null;
};

// A note name like "D♭" or "C♯": its letter, with the accidental drawn since the font has none
export const NoteLabel: React.FC<{ label: string; variant: 'superscript' | 'inline' }> = ({
  label,
  variant,
}) => (
  <>
    {label[0]}
    <AccidentalSign symbol={label[1]} variant={variant} />
  </>
);
