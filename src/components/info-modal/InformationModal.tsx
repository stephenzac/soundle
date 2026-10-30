import { PixelModal } from '../modal/PixelModal';
import { FlatSign } from '../game/display/FlatSign';
import { MelodyIcon } from '../game/controls/MelodyIcon';
import { SettingsIcon } from '../settings/SettingsIcon';
import { SubmitIcon } from '../game/controls/SubmitIcon';
import { DeleteIcon } from '../game/controls/DeleteIcon';
import { ResetIcon } from '../game/controls/ResetIcon';
import { cn } from '../../lib/cn';

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

// One control and what it does. The example is decorative; the caption carries the meaning.
const ControlExample: React.FC<{ example: React.ReactNode; children: React.ReactNode }> = ({
  example,
  children,
}) => (
  <figure className="flex flex-row items-center gap-4">
    <div className="note-box h-9.5 lg:h-12 shrink-0" aria-hidden="true">
      {example}
    </div>
    <figcaption className="modal-text">{children}</figcaption>
  </figure>
);

// A guessed note's tile color after a guess, with its meaning underneath
const FeedbackExample: React.FC<{ className: string; example: React.ReactNode; label: string }> = ({
  className,
  example,
  label,
}) => (
  <figure className="flex flex-col items-center gap-2 text-center">
    <div className={cn(className, 'h-9.5 lg:h-12 relative')} aria-hidden="true">
      {example}
    </div>
    <figcaption className="modal-text">{label}</figcaption>
  </figure>
);

export const InformationModal: React.FC<InformationModalProps> = ({ setClickedState }) => (
  <PixelModal
    title="How to play"
    onClose={() => setClickedState(false)}
    descriptionId="modalDescription"
  >
    <div id="modalDescription" className="flex flex-col gap-3">
      <p className="modal-text">Name the five tones you hear, in order, within 6 tries.</p>
      <p className="modal-text mb-2">
        Notes can repeat. Only the note name counts, not the octave. Tones are in concert pitch: as
        they sound, not transposed.
      </p>

      <ControlExample example={<MelodyIcon />}>
        Play the tones. Replay them as often as you like.
      </ControlExample>
      <ControlExample example="C">
        Enter a note. Sharps are written as flats, so C sharp is D
        <FlatSign variant="inline" />.
      </ControlExample>
      <ControlExample example={<DeleteIcon />}>Delete the last note.</ControlExample>
      <ControlExample example={<SubmitIcon />}>Submit a full guess.</ControlExample>

      <div className="grid grid-cols-3 gap-2 my-2">
        <FeedbackExample className="note-box-correct" example="C" label="Right note" />
        <FeedbackExample className="note-box-close-answer" example="B" label="Half step off" />
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

      <ControlExample example={<SettingsIcon />}>Choose the instrument and octaves.</ControlExample>
      <ControlExample example={<ResetIcon />}>Start a new melody once a game ends.</ControlExample>

      <p className="modal-text text-slate-300 text-center text-[8px]! lg:text-[10px]! mt-2">
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
