import { use } from 'react';
import { GameContext } from '../../../contexts/GameContext';
import { SpeakerIcon } from './SpeakerIcon';

// Beside a guessed row, playing its notes again. It hangs off the row's right edge (the row must
// be relative), so it doesn't widen the board or shift it off-center.
export const RowReplayButton: React.FC<{ row: number }> = ({ row }) => {
  const { replayRow } = use(GameContext);

  return (
    <button
      className="absolute left-full top-1/2 -translate-y-1/2 ml-[calc(var(--cell)*0.12)] h-[calc(var(--cell)*0.32)] p-[calc(var(--cell)*0.06)] box-content cursor-pointer text-black/55 hover:text-black active:translate-y-[calc(-50%+1px)]"
      onClick={() => replayRow(row)}
      aria-label={`Replay guess ${row + 1}`}
      title="Replay this guess"
    >
      <SpeakerIcon />
    </button>
  );
};
