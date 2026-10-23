import { useState, useEffect } from 'react';
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

interface CloseButtonProps {
  children?: React.ReactNode;
  onClose: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ children, onClose }) => (
  <button
    className="flex items-center justify-center hover:cursor-pointer font-bold self-end w-8 h-8 pixel-border hover:bg-red-600 transition-all"
    onClick={onClose}
    aria-label="Close"
    style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}
  >
    {children}
  </button>
);

interface InformationModalProps {
  setClickedState: (newState: boolean) => void;
}

export const InformationModal: React.FC<InformationModalProps> = ({ setClickedState }) => {
  const [phase, setPhase] = useState<'enter' | 'active' | 'exit'>('enter');

  useEffect(() => {
    setPhase('active');
  }, []);

  const handleClose = () => {
    setPhase('exit');
    setTimeout(() => setClickedState(false), 100);
  };

  return (
    <>
      <div
        className={cn(
          'flex justify-center h-screen w-screen fixed top-0 bottom-0 left-0 right-0 pixel-modal-background',
          phase === 'enter' && 'background-animate-in',
          phase === 'active' && 'background-active',
          phase === 'exit' && 'background-animate-out'
        )}
        onClick={handleClose}
        role="presentation"
      />

      <section
        className={cn(
          'flex flex-col px-4 fixed inset-0 m-auto h-fit max-h-[calc(100dvh-2rem)] overflow-y-auto pixel-modal w-[calc(100%-2rem)] max-w-md lg:max-w-xl pt-4 pb-4 z-10',
          phase === 'enter' && 'modal-animate-in',
          phase === 'active' && 'modal-active',
          phase === 'exit' && 'modal-animate-out'
        )}
        role="dialogue"
        aria-describedby="modalDescription"
        aria-modal="true"
      >
        <CloseButton onClose={handleClose}>X</CloseButton>

        <div id="modalDescription">
          <header>
            <p className="modal-text text-slate-100 text-center mt-4 mb-6">
              Soundle is a Wordle-like ear training game to improve your sense of pitch. Listen to
              the five tones in concert pitch and guess them all correctly within 6 tries.
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
              B<span className="absolute top-0.5 right-0 text-xs">♭</span>
            </div>
            <figcaption className="modal-text ml-4">Incorrect note guess.</figcaption>
          </figure>

          <figure className="flex flex-row place-items-center mb-4">
            <div className="note-box h-9.5 lg:h-12" aria-label="Submit guess button example">
              ✓
            </div>
            <figcaption className="modal-text text-slate-100 w-full pl-4">
              Submit your guess for the tones played.
            </figcaption>
          </figure>

          <figure className="flex flex-row place-items-center mb-4">
            <div className="note-box h-9.5 lg:h-12" aria-label="Play melody button example">
              ♫
            </div>
            <figcaption className="modal-text text-slate-100 w-full pl-4">
              Listen to the random tones.
            </figcaption>
          </figure>

          <figure className="flex flex-row place-items-center mb-4">
            <div className="note-box h-9.5 lg:h-12" aria-label="Delete button example">
              ⌫
            </div>
            <figcaption className="modal-text text-slate-100 w-full pl-4">
              Delete a note from your guess.
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
};
