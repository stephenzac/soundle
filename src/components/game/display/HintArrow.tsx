import { cn } from '../../../lib/cn';

// Pixel-art arrow in a tile's right corner for a guess a half step off. It hops toward the
// right note, so it reads as "move this way" rather than "your guess was high".
export const HintArrow: React.FC<{ direction: 'up' | 'down' }> = ({ direction }) => (
  <svg
    viewBox="0 0 5 5"
    className={cn(
      'absolute right-[10%] h-[0.5em] w-auto motion-safe:animate-nudge',
      // Each sits in the corner it points to, above or below any flat sign, and hops toward
      // the right note
      direction === 'up' ? 'top-[10%]' : 'bottom-[10%] rotate-180'
    )}
    fill="currentColor"
    shapeRendering="crispEdges"
    aria-hidden="true"
  >
    <path d="M2 0h1v1H2zM1 1h3v1H1zM0 2h5v1H0zM2 3h1v2H2z" />
  </svg>
);
