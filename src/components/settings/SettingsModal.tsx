import { use, useState } from 'react';
import { GameContext } from '../../contexts/GameContext';
import {
  INSTRUMENTS,
  INSTRUMENT_IDS,
  InstrumentId,
  octaveLimits,
} from '../../constants/instruments';
import {
  GameSettings,
  QUIET_BELOW,
  fitOctavesToInstrument,
  maxOctaveRange,
  melodyPool,
  octavesChanged,
  transpositionOf,
} from '../../constants/settings';
import { midiFromName, midiFromParts } from '../../lib/pitch';
import { NoteName } from '../game/display/NoteName';
import { FlatSign } from '../game/display/FlatSign';
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
  value: React.ReactNode;
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
  <div className="flex flex-col items-start gap-2 mb-5">
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
  <div className="flex flex-col items-start gap-2">
    <label htmlFor="instrumentSelect" className="modal-text">
      Instrument
    </label>
    <div className="relative">
      <select
        id="instrumentSelect"
        value={value}
        onChange={(event) => onChange(event.target.value as InstrumentId)}
        className="appearance-none w-36 lg:w-44 h-11 pl-4 pr-10 pixel-border bg-[#b3b3b3] text-black text-[10px] lg:text-xs cursor-pointer button-animation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffeb3b]"
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

interface PitchToggleProps {
  writtenPitch: boolean;
  // The instrument's key, like "B♭"; undefined for an instrument that sounds as written
  instrumentKey: string | undefined;
  instrumentName: string;
  onChange: (writtenPitch: boolean) => void;
}

// Whether notes are named at concert pitch ("in C", as musicians say) or as written for the
// instrument. C is always there, chosen for instruments that sound as written, so the row beside
// the instrument select never sits empty. A transposing instrument's key slides in next to it.
// A radio group, so screen readers announce which is chosen.
const PitchToggle: React.FC<PitchToggleProps> = ({
  writtenPitch,
  instrumentKey,
  instrumentName,
  onChange,
}) => {
  // The last key shown, so it keeps its label while sliding out
  const [shownKey, setShownKey] = useState(instrumentKey ?? 'B♭');
  if (instrumentKey && instrumentKey !== shownKey) setShownKey(instrumentKey);

  const written = writtenPitch && instrumentKey !== undefined;
  const option = (
    selected: boolean,
    label: React.ReactNode,
    description: string,
    onSelect?: () => void
  ) => (
    <button
      role="radio"
      aria-checked={selected}
      aria-label={description}
      title={description}
      onClick={onSelect}
      className={cn(
        'h-11 px-3 whitespace-nowrap pixel-border text-black text-[10px] lg:text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffeb3b]',
        selected ? 'bg-[#ffeb3b] cursor-default' : 'bg-[#b3b3b3] cursor-pointer button-animation'
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col items-start gap-2">
      <span id="pitchToggleLabel" className="modal-text">
        Notes in
      </span>
      <div className="flex" role="radiogroup" aria-labelledby="pitchToggleLabel">
        {option(
          !written,
          'C',
          'Concert pitch',
          // Nothing to switch from on an instrument that sounds as written; leaving the saved
          // choice alone keeps it for the next transposing instrument
          instrumentKey ? () => onChange(false) : undefined
        )}
        {/* Grows from no width to its own, and back: a grid column animates where width: auto
            can't. Inert while hidden, so it can't be tabbed to. */}
        <div
          className={cn(
            'grid transition-[grid-template-columns,opacity] duration-150 ease-out motion-reduce:transition-none',
            instrumentKey ? 'grid-cols-[1fr] opacity-100' : 'grid-cols-[0fr] opacity-0'
          )}
          inert={!instrumentKey}
        >
          {/* Clips the button while narrow, with a pixel of room for its outer border. The button
              keeps its full width (w-max) and is revealed, rather than squeezed, which would wrap
              its label onto two lines mid-slide. */}
          <div className="min-w-0 overflow-hidden -my-px py-px pr-px">
            <div className="pl-1 w-max">
              {option(
                written,
                <>
                  {shownKey[0]}
                  {shownKey.length > 1 && <FlatSign variant="inline" />}
                </>,
                `Written for ${shownKey} ${instrumentName.toLowerCase()}`,
                () => onChange(true)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SettingsModalProps {
  setClickedState: (newState: boolean) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ setClickedState }) => {
  const { settings, updateSettings } = use(GameContext);
  // Edits stay local until applied, since changing octaves replaces the melody in progress
  const [draft, setDraft] = useState<GameSettings>(settings);
  const { instrument, lowestOctave, octaveRange, writtenPitch } = draft;
  const { name, lowestNote, highestNote, transposition } = INSTRUMENTS[instrument];
  // Notes below are named the way the player chose: concert pitch, or written for the instrument
  const shown = transpositionOf(draft);
  const { lowestOctave: lowestAllowed, highestOctave: highestAllowed } = octaveLimits(instrument);
  const pool = melodyPool(draft);
  const instrumentLow = midiFromName(lowestNote);
  const startsNewGame = octavesChanged(draft, settings);
  const hasChanges =
    startsNewGame || instrument !== settings.instrument || writtenPitch !== settings.writtenPitch;

  // The octaves last chosen with the steppers. Each instrument fits these into its own range, so
  // trying a narrow instrument while browsing doesn't shrink the choice for the rest.
  const [chosenOctaves, setChosenOctaves] = useState({
    lowestOctave: settings.lowestOctave,
    octaveRange: settings.octaveRange,
  });

  const selectInstrument = (newInstrument: InstrumentId) =>
    setDraft(fitOctavesToInstrument({ ...chosenOctaves, instrument: newInstrument, writtenPitch }));

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
    <PixelModal
      title="Settings"
      onClose={() => setClickedState(false)}
      descriptionId="settingsDescription"
    >
      {(close) => (
        <div className="flex flex-col items-start">
          <div className="flex flex-wrap items-start gap-x-2 gap-y-5 mb-5">
            <InstrumentSelect value={instrument} onChange={selectInstrument} />
            <PitchToggle
              writtenPitch={writtenPitch}
              instrumentKey={transposition?.key}
              instrumentName={name}
              onChange={(written) => setDraft({ ...draft, writtenPitch: written })}
            />
          </div>

          <Stepper
            id="lowestNoteLabel"
            label="Lowest note"
            // The instrument's lowest note when it starts partway through the chosen octave
            value={
              <NoteName midi={Math.max(midiFromParts(0, lowestOctave), instrumentLow) + shown} />
            }
            canDecrement={lowestOctave > lowestAllowed}
            canIncrement={lowestOctave < highestAllowed}
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

          <div id="settingsDescription" className="modal-text text-left mb-6">
            <p>
              Tones play from <NoteName midi={pool[0] + shown} /> to{' '}
              <NoteName midi={pool[pool.length - 1] + shown} />
              {shown !== 0 && ' as written'}. You still guess only the note names.
            </p>
            <p className="mt-3">
              {name} plays <NoteName midi={instrumentLow + shown} /> to{' '}
              <NoteName midi={midiFromName(highestNote) + shown} />
              {shown !== 0 && ' as written'}.
            </p>
            {pool[0] < QUIET_BELOW && (
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
