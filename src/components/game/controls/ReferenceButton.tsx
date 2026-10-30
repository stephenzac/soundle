import { use } from 'react';
import { GameContext } from '../../../contexts/GameContext';
import { cn } from '../../../lib/cn';
import { TuningForkIcon } from './TuningForkIcon';

// Plays a C in the melody's register, so players without perfect pitch can work out the
// melody's notes relative to it. A tuning fork alone doesn't say which note it plays, so a popup
// names it: briefly after each press, and while hovered or focused from the keyboard.
export const ReferenceButton: React.FC = () => {
  const { playReference, loadingSound, referenceHintVisible } = use(GameContext);
  const loading = loadingSound === 'reference';

  return (
    <div className="group relative">
      <button
        className={cn('round-button', loading && 'animate-pulse')}
        onClick={playReference}
        aria-label="Play reference note C"
        aria-busy={loading}
        aria-keyshortcuts="R"
      >
        <TuningForkIcon />
      </button>

      {/* Right-aligned with the button, the last in its row, so it never runs off the screen */}
      <div
        className={cn(
          'absolute right-0 bottom-[calc(100%+10px)] z-10 pointer-events-none transition-all duration-150',
          referenceHintVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-has-focus-visible:opacity-100 group-has-focus-visible:translate-y-0'
        )}
        aria-hidden="true"
      >
        <p className="whitespace-nowrap bg-[#343434] text-white text-[8px] lg:text-[10px] px-2 py-1.5 border-2 border-black pixel-shadow-sm">
          Reference C
        </p>
        {/* Pixel tail pointing down at the button's center */}
        <svg
          viewBox="0 0 8 4"
          className="absolute top-full right-[calc(var(--btn)/2-6px)] w-3 h-1.5"
          shapeRendering="crispEdges"
        >
          <path d="M0 0h8v1H0zM1 1h6v1H1zM2 2h4v1H2zM3 3h2v1H3z" fill="#000" />
          <path d="M1 0h6v1H1zM2 1h4v1H2zM3 2h2v1H3z" fill="#343434" />
        </svg>
      </div>
    </div>
  );
};
