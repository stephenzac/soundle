import { use, useState } from 'react';
import { GameContext } from '../../contexts/GameContext';
import { INSTRUMENTS, INSTRUMENT_IDS, InstrumentId } from '../../constants/instruments';
import {
  GameSettings,
  QUIET_BELOW_OCTAVE,
  fitOctavesToInstrument,
  maxOctaveRange,
  octavesChanged,
} from '../../constants/settings';
import { loadInstrument } from '../../lib/audio';
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

interface InstrumentSelectProps {
  value: InstrumentId;
  onChange: (instrument: InstrumentId) => void;
}

// A native select, styled like the game's buttons when closed. Opening it shows the browser's
// own list (a wheel or sheet on phones), with keyboard and screen reader support built in.
const InstrumentSelect: React.FC<InstrumentSelectProps> = ({ value, onChange }) => (
  <div className="flex flex-col items-center gap-2 mb-5">
    <label htmlFor="instrumentSelect" className="modal-text">
      Instrument
    </label>
    <div className="relative">
      <select
        id="instrumentSelect"
        value={value}
        onChange={(event) => onChange(event.target.value as InstrumentId)}
        className="appearance-none w-44 h-11 pl-4 pr-10 pixel-border bg-[#b3b3b3] text-black text-[10px] lg:text-xs cursor-pointer button-animation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffeb3b]"
      >
        {INSTRUMENT_IDS.map((id) => (
          <option key={id} value={id}>
            {INSTRUMENTS[id].name}
          </option>
        ))}
      </select>
      {/* Pixel-art chevron in place of the browser's arrow, which appearance-none removes */}
      <svg
        viewBox="0 0 7 4"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-1.5 w-auto text-black"
        fill="currentColor"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        <path d="M0 0h7v1H0zM1 1h5v1H1zM2 2h3v1H2zM3 3h1v1H3z" />
      </svg>
    </div>
  </div>
);

interface SettingsModalProps {
  setClickedState: (newState: boolean) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ setClickedState }) => {
  const { settings, updateSettings } = use(GameContext);
  // Edits stay local until applied, since changing octaves replaces the melody in progress
  const [draft, setDraft] = useState<GameSettings>(settings);
  const { instrument, lowestOctave, octaveRange } = draft;
  const {
    name,
    lowestOctave: instrumentLowest,
    highestOctave: instrumentHighest,
  } = INSTRUMENTS[instrument];
  const highestOctave = lowestOctave + octaveRange - 1;
  const startsNewGame = octavesChanged(draft, settings);
  const hasChanges = startsNewGame || instrument !== settings.instrument;

  // The octaves last chosen with the steppers. Each instrument fits these into its own range, so
  // trying a narrow instrument while browsing doesn't shrink the choice for the rest.
  const [chosenOctaves, setChosenOctaves] = useState({
    lowestOctave: settings.lowestOctave,
    octaveRange: settings.octaveRange,
  });

  const selectInstrument = (newInstrument: InstrumentId) =>
    setDraft(fitOctavesToInstrument({ ...chosenOctaves, instrument: newInstrument }));

  const changeOctaves = (newSettings: GameSettings) => {
    const fitted = fitOctavesToInstrument(newSettings);
    setDraft(fitted);
    setChosenOctaves({ lowestOctave: fitted.lowestOctave, octaveRange: fitted.octaveRange });
  };

  const changeLowestOctave = (newLowestOctave: number) =>
    changeOctaves({ ...draft, lowestOctave: newLowestOctave });

  const changeOctaveRange = (newOctaveRange: number) =>
    changeOctaves({ ...draft, octaveRange: newOctaveRange });

  const apply = () => {
    updateSettings(draft);
    // Start downloading the instrument's samples now (this click is a user gesture), so it's
    // usually ready by the first play. Playing retries if this fails.
    loadInstrument(draft).catch(() => {});
  };

  return (
    <PixelModal onClose={() => setClickedState(false)} descriptionId="settingsDescription">
      {(close) => (
        <div className="flex flex-col items-center">
          <h2 className="main-header text-base lg:text-xl mt-2 mb-6">Settings</h2>

          <InstrumentSelect value={instrument} onChange={selectInstrument} />

          <Stepper
            id="lowestNoteLabel"
            label="Lowest note"
            value={`C${lowestOctave}`}
            canDecrement={lowestOctave > instrumentLowest}
            canIncrement={lowestOctave < instrumentHighest}
            onDecrement={() => changeLowestOctave(lowestOctave - 1)}
            onIncrement={() => changeLowestOctave(lowestOctave + 1)}
          />

          <Stepper
            id="octaveRangeLabel"
            label="Octave range"
            value={String(octaveRange)}
            canDecrement={octaveRange > 1}
            canIncrement={octaveRange < maxOctaveRange(draft)}
            onDecrement={() => changeOctaveRange(octaveRange - 1)}
            onIncrement={() => changeOctaveRange(octaveRange + 1)}
          />

          <div id="settingsDescription" className="modal-text text-center mb-6">
            <p>
              Tones play from C{lowestOctave} to B{highestOctave}. You still guess only the note
              names.
            </p>
            <p className="mt-3">
              {name} covers C{instrumentLowest} to B{instrumentHighest}.
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
              apply();
              close();
            }}
          >
            {startsNewGame ? 'Start new game' : 'Save'}
          </button>
        </div>
      )}
    </PixelModal>
  );
};
