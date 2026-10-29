import { use, useState } from 'react';
import { GameContext } from '../../contexts/GameContext';
import {
  HIGHEST_OCTAVE,
  LOWEST_OCTAVE,
  OctaveSettings,
  QUIET_BELOW_OCTAVE,
  maxOctaveRange,
} from '../../constants/octaves';
import { cn } from '../../lib/cn';
import { PixelModal } from '../modal/PixelModal';
import { SettingsIcon } from './SettingsIcon';

interface OpenSettingsButtonProps {
  setClickedState: (newState: boolean) => void;
}

export const OpenSettingsButton: React.FC<OpenSettingsButtonProps> = ({ setClickedState }) => (
  <button className="round-button" onClick={() => setClickedState(true)} aria-label="Show settings">
    <SettingsIcon />
  </button>
);

interface StepperProps {
  id: string;
  label: string;
  value: string;
  canDecrement: boolean;
  canIncrement: boolean;
  onDecrement: () => void;
  onIncrement: () => void;
}

const Stepper: React.FC<StepperProps> = ({
  id,
  label,
  value,
  canDecrement,
  canIncrement,
  onDecrement,
  onIncrement,
}) => (
  <div className="flex flex-col items-center gap-2 mb-5">
    <span id={id} className="modal-text">
      {label}
    </span>
    <div className="flex items-center gap-4" role="group" aria-labelledby={id}>
      <button
        className={canDecrement ? 'round-button' : 'round-button-unclickable'}
        disabled={!canDecrement}
        onClick={onDecrement}
        aria-label={`Decrease ${label.toLowerCase()}`}
      >
        -
      </button>
      <output className="modal-text min-w-[4ch] text-center" aria-live="polite">
        {value}
      </output>
      <button
        className={canIncrement ? 'round-button' : 'round-button-unclickable'}
        disabled={!canIncrement}
        onClick={onIncrement}
        aria-label={`Increase ${label.toLowerCase()}`}
      >
        +
      </button>
    </div>
  </div>
);

interface SettingsModalProps {
  setClickedState: (newState: boolean) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ setClickedState }) => {
  const { octaveSettings, updateOctaveSettings } = use(GameContext);
  // Edits stay local until applied, since applying replaces the melody in progress
  const [draft, setDraft] = useState<OctaveSettings>(octaveSettings);
  const { lowestOctave, octaveRange } = draft;
  const highestOctave = lowestOctave + octaveRange - 1;
  const hasChanges =
    lowestOctave !== octaveSettings.lowestOctave || octaveRange !== octaveSettings.octaveRange;

  const changeLowestOctave = (newLowestOctave: number) =>
    setDraft({
      lowestOctave: newLowestOctave,
      // Keep the top of the range at or below the highest supported octave
      octaveRange: Math.min(octaveRange, maxOctaveRange(newLowestOctave)),
    });

  const changeOctaveRange = (newOctaveRange: number) =>
    setDraft({ lowestOctave, octaveRange: newOctaveRange });

  return (
    <PixelModal onClose={() => setClickedState(false)} descriptionId="settingsDescription">
      {(close) => (
        <div className="flex flex-col items-center">
          <h2 className="main-header text-base lg:text-xl mt-2 mb-6">Octaves</h2>

          <Stepper
            id="lowestNoteLabel"
            label="Lowest note"
            value={`C${lowestOctave}`}
            canDecrement={lowestOctave > LOWEST_OCTAVE}
            canIncrement={lowestOctave < HIGHEST_OCTAVE}
            onDecrement={() => changeLowestOctave(lowestOctave - 1)}
            onIncrement={() => changeLowestOctave(lowestOctave + 1)}
          />

          <Stepper
            id="octaveRangeLabel"
            label="Octave range"
            value={String(octaveRange)}
            canDecrement={octaveRange > 1}
            canIncrement={octaveRange < maxOctaveRange(lowestOctave)}
            onDecrement={() => changeOctaveRange(octaveRange - 1)}
            onIncrement={() => changeOctaveRange(octaveRange + 1)}
          />

          <div id="settingsDescription" className="modal-text text-center mb-6">
            <p>
              Tones play from C{lowestOctave} to B{highestOctave}. You still guess only the note
              names.
            </p>
            {lowestOctave < QUIET_BELOW_OCTAVE && (
              <p className="text-yellow-300 mt-3">
                Notes this low can be hard to hear on phone and laptop speakers.
              </p>
            )}
          </div>

          <button
            className={cn(
              'pixel-border bg-[#b3b3b3] text-black text-[10px] lg:text-xs px-4 h-11',
              hasChanges ? 'cursor-pointer button-animation' : 'opacity-40 cursor-not-allowed'
            )}
            disabled={!hasChanges}
            onClick={() => {
              updateOctaveSettings(draft);
              close();
            }}
          >
            Start new game
          </button>
        </div>
      )}
    </PixelModal>
  );
};
