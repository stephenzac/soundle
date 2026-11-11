import { PixelModal } from '../modal/PixelModal';
import { FlatSign } from '../game/display/FlatSign';
import { MelodyIcon } from '../game/controls/MelodyIcon';
import { SettingsIcon } from '../settings/SettingsIcon';
import { SubmitIcon } from '../game/controls/SubmitIcon';
import { DeleteIcon } from '../game/controls/DeleteIcon';
import { ResetIcon } from '../game/controls/ResetIcon';
import { TuningForkIcon } from '../game/controls/TuningForkIcon';
import { HintArrow } from '../game/display/HintArrow';
import { SpeakerIcon } from '../game/display/SpeakerIcon';
import { cn } from '../../lib/cn';
import { use } from 'react';
import { GameContext } from '../../contexts/GameContext';
import { INSTRUMENTS } from '../../constants/instruments';

interface OpenInformationButtonProps {
  setClickedState: (newState: boolean) => void;
}

export const OpenInformationButton: React.FC<OpenInformationButtonProps> = ({
  setClickedState,
}) => (
  <button
    className="round-button font-bold"
    onClick={() => setClickedState(true)}
    aria-label="Show game information"
  >
    i
  </button>
);

interface InformationModalProps {
  setClickedState: (newState: boolean) => void;
}

// One control and its name, in a two-column grid. The icon is decorative; the label carries the
// meaning.
const ControlExample: React.FC<{ example: React.ReactNode; children: React.ReactNode }> = ({
  example,
  children,
}) => (
  <li className="flex flex-row items-center gap-2">
    {/* A little smaller on the narrowest phones, so one-word labels fit beside it */}
    <div className="note-box h-8 min-[22rem]:h-9.5 lg:h-10 shrink-0" aria-hidden="true">
      {example}
    </div>
    <span className="modal-text">{children}</span>
  </li>
);

// A guessed note's tile color after a guess, with its meaning underneath
const FeedbackExample: React.FC<{ className: string; example: React.ReactNode; label: string }> = ({
  className,
  example,
  label,
}) => (
  <figure className="flex flex-col items-center gap-1.5 text-center">
    {/* Sized like a board tile, with the letter at the board's 30% of the tile, so the hint
        arrow has the same room above and below the letter as it does in the game */}
    <div className={cn(className, 'size-12 [--tile-font:0.9rem] relative')} aria-hidden="true">
      {example}
    </div>
    <figcaption className="modal-text">{label}</figcaption>
  </figure>
);

const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="modal-text text-[#ffeb3b] mb-3">{children}</h3>
);

// A pixel square for list bullets, since the font has no bullet glyph
const Tip: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <li className={cn('flex gap-2', className)}>
    <span className="mt-[0.55em] size-1 shrink-0 bg-current" aria-hidden="true" />
    <span>{children}</span>
  </li>
);

// Short sections with room between them: the goal, what a guess's colors mean, the controls by
// name, then the finer rules, which matter less on a first read
export const InformationModal: React.FC<InformationModalProps> = ({ setClickedState }) => {
  const { settings, transposition } = use(GameContext);
  const { name, transposition: instrumentTransposition } = INSTRUMENTS[settings.instrument];
  const key = instrumentTransposition?.key ?? '';

  return (
    <PixelModal
      title="How to play"
      onClose={() => setClickedState(false)}
      descriptionId="modalDescription"
    >
      <div id="modalDescription" className="flex flex-col gap-6">
        <p className="modal-text">Name the five tones you hear, in order. You have 6 tries.</p>

        <section>
          <SectionHeading>After each guess</SectionHeading>
          <div className="grid grid-cols-3 gap-2">
            <FeedbackExample className="note-box-correct" example="C" label="Right note" />
            <FeedbackExample
              className="note-box-close-answer"
              example={
                <>
                  B<HintArrow direction="up" />
                </>
              }
              label="Half step off"
            />
            <FeedbackExample
              className="note-box-incorrect"
              example={
                <>
                  B<FlatSign variant="superscript" />
                </>
              }
              label="Further off"
            />
          </div>
          <p className="modal-text text-slate-300 mt-3">Arrows point to the answer.</p>
        </section>

        <section>
          <SectionHeading>Controls</SectionHeading>
          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-3">
            <ControlExample example={<MelodyIcon />}>Listen</ControlExample>
            <ControlExample example={<TuningForkIcon />}>Reference C</ControlExample>
            <ControlExample example="C">Add note</ControlExample>
            <ControlExample example={<DeleteIcon />}>Delete</ControlExample>
            <ControlExample example={<SubmitIcon />}>Submit</ControlExample>
            <ControlExample
              example={
                <span className="block h-[0.9em]">
                  <SpeakerIcon />
                </span>
              }
            >
              Replay guess
            </ControlExample>
            <ControlExample example={<SettingsIcon />}>Settings</ControlExample>
            <ControlExample example={<ResetIcon />}>New game</ControlExample>
          </ul>
        </section>

        <section>
          <SectionHeading>Good to know</SectionHeading>
          <ul className="modal-text text-slate-300 flex flex-col gap-2">
            <Tip>Notes can repeat. Only the name counts, not the octave.</Tip>
            <Tip>
              Sharps are written as flats: C sharp is D<FlatSign variant="inline" />.
            </Tip>
            <Tip>
              {transposition === 0 ? (
                'Tones are in concert pitch, as they sound.'
              ) : (
                <>
                  Notes are named as written for {key[0]}
                  {key.length > 1 && <FlatSign variant="inline" />} {name.toLowerCase()}.
                </>
              )}
            </Tip>
            {/* Only for devices with a mouse, which usually have a keyboard too */}
            <Tip className="hidden pointer-fine:flex">
              Keyboard: A to G, Shift for flats, Enter, Backspace, Space to play, R for the C.
            </Tip>
          </ul>
        </section>

        <p className="modal-text text-slate-400 text-center text-[8px]! lg:text-[10px]!">
          Instrument samples from{' '}
          <a
            className="underline"
            href="https://github.com/nbrosowsky/tonejs-instruments"
            target="_blank"
            rel="noreferrer"
          >
            tonejs-instruments
          </a>{' '}
          by Nicholaus P. Brosowsky,{' '}
          <a
            className="underline"
            href="https://creativecommons.org/licenses/by/3.0/"
            target="_blank"
            rel="noreferrer"
          >
            CC BY 3.0
          </a>
          .
        </p>
      </div>
    </PixelModal>
  );
};
