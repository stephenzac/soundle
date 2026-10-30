import { PixelModal } from '../modal/PixelModal';
import { FlatSign } from '../game/display/FlatSign';
import { MelodyIcon } from '../game/controls/MelodyIcon';
import { SettingsIcon } from '../settings/SettingsIcon';
import { SubmitIcon } from '../game/controls/SubmitIcon';
import { DeleteIcon } from '../game/controls/DeleteIcon';

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

export const InformationModal: React.FC<InformationModalProps> = ({ setClickedState }) => (
  <PixelModal onClose={() => setClickedState(false)} descriptionId="modalDescription">
    <div id="modalDescription">
      <header>
        <p className="modal-text text-slate-100 text-center mt-4 mb-6">
          Soundle is a Wordle-like ear training game to improve your sense of pitch. Listen to the
          five tones in concert pitch and guess them all correctly within 6 tries.
        </p>
      </header>

      <figure className="flex flex-row place-items-center mb-4">
        <div className="note-box h-9.5 lg:h-12" aria-label="Note input button example">
          C
        </div>
        <figcaption className="modal-text text-slate-100 pl-4">
          Input a note as part of your guess.
        </figcaption>
      </figure>

      <figure className="flex flex-row place-items-center mb-4">
        <div
          className="note-box-correct h-9.5 lg:h-12 font-bold grid place-items-center"
          aria-label="Correct note guess example"
        >
          C
        </div>
        <figcaption className="modal-text ml-4">Correct note guess.</figcaption>
      </figure>

      <figure className="flex flex-row place-items-center mb-4">
        <div
          className="note-box-close-answer h-9.5 lg:h-12 font-bold grid place-items-center"
          aria-label="Close note guess example"
        >
          B
        </div>
        <figcaption className="modal-text ml-4">Note guess was off by a half step.</figcaption>
      </figure>

      <figure className="flex flex-row place-items-center mb-4">
        <div
          className="note-box-incorrect h-9.5 lg:h-12 font-bold grid place-items-center relative"
          aria-label="Correct note guess example"
        >
          B<FlatSign variant="superscript" />
        </div>
        <figcaption className="modal-text ml-4">Incorrect note guess.</figcaption>
      </figure>

      <figure className="flex flex-row place-items-center mb-4">
        <div className="note-box h-9.5 lg:h-12" aria-label="Submit guess button example">
          <SubmitIcon />
        </div>
        <figcaption className="modal-text text-slate-100 w-full pl-4">
          Submit your guess for the tones played.
        </figcaption>
      </figure>

      <figure className="flex flex-row place-items-center mb-4">
        <div className="note-box h-9.5 lg:h-12" aria-label="Play melody button example">
          <MelodyIcon />
        </div>
        <figcaption className="modal-text text-slate-100 w-full pl-4">
          Listen to the random tones.
        </figcaption>
      </figure>

      <figure className="flex flex-row place-items-center mb-4">
        <div className="note-box h-9.5 lg:h-12" aria-label="Delete button example">
          <DeleteIcon />
        </div>
        <figcaption className="modal-text text-slate-100 w-full pl-4">
          Delete a note from your guess.
        </figcaption>
      </figure>

      <figure className="flex flex-row place-items-center mb-4">
        <div className="note-box h-9.5 lg:h-12" aria-label="Settings button example">
          <SettingsIcon />
        </div>
        <figcaption className="modal-text text-slate-100 w-full pl-4">
          Choose the instrument and octaves the tones play in.
        </figcaption>
      </figure>

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
