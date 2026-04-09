import { useState, useEffect } from 'react';

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
    className="flex items-center justify-center hover:cursor-pointer font-bold self-end my-0 w-8 h-8 pixel-border hover:bg-red-600 transition-all"
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
  const [modalClass, setModalClass] = useState('modal-animate-in');
  const [backgroundClass, setBackgroundClass] = useState('background-animate-in');

  useEffect(() => {
    setModalClass('modal-active');
    setBackgroundClass('background-active');
  }, []);

  const handleClose = () => {
    setModalClass('modal-animate-out');
    setBackgroundClass('background-animate-out');
    setTimeout(() => setClickedState(false), 100);
  };

  return (
    <>
      <div
        className={`flex justify-center h-screen w-screen fixed top-0 bottom-0 left-0 right-0 pixel-modal-background ${backgroundClass}`}
        onClick={handleClose}
        role="presentation"
      />

      <section
        className={`flex flex-col px-4 absolute top-4 lg:top-12 pixel-modal w-80 lg:w-1/4 pt-4 pb-4 ml-auto mr-auto z-10 ${modalClass} `}
        role="dialogue"
        aria-describedby="modalDescription"
        aria-modal="true"
      >
        <CloseButton onClose={handleClose}>X</CloseButton>

        <div id="modalDescription">
          <header>
            <p className="modal-text text-slate-100 text-center mb-6 mx-4">
              Soundle is a Wordle-like ear training game to improve your sense of pitch. Listen to
              the five tones in concert pitch and guess them all correctly within 6 tries.
            </p>
          </header>

          <figure className="flex flex-row place-items-center mb-4">
            <div className="note-box-example" aria-label="Note input button example">
              C
            </div>
            <figcaption className="modal-text text-slate-100 pl-4">
              Input a note as part of your guess.
            </figcaption>
          </figure>

          <figure className="flex flex-row place-items-center mb-4">
            <div
              className="note-box-correct font-bold grid place-items-center ml-2"
              style={{ height: '32px', width: '32px' }}
              aria-label="Correct note guess example"
            >
              C
            </div>
            <figcaption className="modal-text ml-4">Correct note guess.</figcaption>
          </figure>

          <figure className="flex flex-row place-items-center mb-4">
            <div
              className="note-box-close-answer font-bold grid place-items-center ml-2"
              style={{ height: '32px', width: '32px' }}
              aria-label="Close note guess example"
            >
              B
            </div>
            <figcaption className="modal-text ml-4">Note guess was off by a half step.</figcaption>
          </figure>

          <figure className="flex flex-row place-items-center mb-4">
            <div
              className="note-box-incorrect font-bold grid place-items-center ml-2"
              style={{ height: '32px', width: '32px' }}
              aria-label="Correct note guess example"
            >
              B♭
            </div>
            <figcaption className="modal-text ml-4">Incorrect note guess.</figcaption>
          </figure>

          <figure className="flex flex-row place-items-center mb-4">
            <div
              className="round-button-example font-bold"
              aria-label="Submit guess button example"
            >
              ✓
            </div>
            <figcaption className="modal-text text-slate-100 w-full pl-4">
              Submit your guess for the tones played.
            </figcaption>
          </figure>

          <figure className="flex flex-row place-items-center mb-4">
            <div className="round-button-example" aria-label="Play melody button example">
              ♫
            </div>
            <figcaption className="modal-text text-slate-100 w-full pl-4">
              Listen to the random tones.
            </figcaption>
          </figure>

          <figure className="flex flex-row place-items-center mb-4">
            <div className="round-button-example" aria-label="Delete button example">
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
