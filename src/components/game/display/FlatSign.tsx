import { cn } from '../../../lib/cn';

interface FlatSignProps {
  // superscript: raised just right of a letter centered in a tile or key, without pushing the
  // letter off-center (parent must be relative)
  // inline: flows in running text, sitting on the baseline at cap height
  variant: 'superscript' | 'inline';
}

// Press Start 2P has no ♭ glyph, so browsers fall back to whatever system font they pick
// (tiny and sitting low on Firefox). Drawing it as pixel art keeps it identical everywhere.
export const FlatSign: React.FC<FlatSignProps> = ({ variant }) => (
  <svg
    viewBox="0 0 5 9"
    className={cn(
      'inline-block w-auto',
      variant === 'superscript' &&
        'absolute top-[calc(50%-0.5em)] left-[calc(50%+0.5em)] h-[0.7em]',
      variant === 'inline' && 'h-[0.875em]'
    )}
    fill="currentColor"
    shapeRendering="crispEdges"
    role="img"
    aria-label="flat"
  >
    <path d="M0 0h1v9H0zM2 4h2v1H2zM1 5h1v1H1zM4 5h1v2H4zM3 7h1v1H3zM1 8h2v1H1z" />
  </svg>
);
