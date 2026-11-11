import { cn } from '../../../lib/cn';

interface SharpSignProps {
  // Placed like FlatSign's variants: raised beside a centered letter, or in running text
  variant: 'superscript' | 'inline';
}

// Press Start 2P has no ♯ glyph either, so it's drawn as pixel art like the flat, at its height
export const SharpSign: React.FC<SharpSignProps> = ({ variant }) => (
  <svg
    viewBox="0 0 6 9"
    className={cn(
      'inline-block w-auto',
      variant === 'superscript' &&
        'absolute top-[calc(50%-0.5em)] left-[calc(50%+0.5em)] h-[0.7em]',
      variant === 'inline' && 'h-[0.875em]'
    )}
    fill="currentColor"
    shapeRendering="crispEdges"
    role="img"
    aria-label="sharp"
  >
    <path d="M1 1h1v8H1zM4 0h1v8H4zM0 3h6v1H0zM0 6h6v1H0z" />
  </svg>
);
