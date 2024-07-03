import { useState, useEffect } from "react";

type InformationModalProps = {
  setClickedState: (newState: boolean) => void;
};

const InformationModal = ({ setClickedState }: InformationModalProps) => {
  const [modalClass, setModalClass] = useState<string>("modal-animate-in");
  const [backgroundClass, setBackgroundClass] = useState<string>(
    "background-animate-in"
  );

  useEffect(() => {
    setModalClass("modal-active");
    setBackgroundClass("background-active");
  }, []);

  const handleClose = () => {
    setModalClass("modal-animate-out");
    setBackgroundClass("background-animate-out");

    setTimeout(() => {
      setClickedState(false);
    }, 100);
  };

  return (
    <>
      <div
        className={`flex justify-center h-screen w-screen fixed top-0 bottom-0 left-0 right-0 bg-gray-800 ${backgroundClass}`}
        onClick={handleClose}
        role="presentation"
      ></div>

      <section
        className={`flex flex-col px-2 absolute top-16 bg-gray-700 max-w-80 pt-2 pb-2 ml-auto mr-auto rounded-lg border-2 border-slate-300 ${modalClass} `}
        role="dialogue"
        aria-describedby="modalDescription"
        aria-modal="true"
      >
        <button
          className="hover:cursor-pointer font-bold self-end my-0"
          onClick={handleClose}
          aria-label="Close"
        >
          X
        </button>

        <div id="modalDescription">
          <header>
            <p className="text-slate-100 text-center mb-6">
              Soundle is a Wordle-like ear training game to improve your sense
              of pitch. Listen to the five tones in concert pitch and guess them
              all correctly within 6 tries.
            </p>
          </header>

          <figure className="flex flex-row place-items-center mb-4">
            <div
              className="note-box-example"
              aria-label="Note input button example"
            >
              C
            </div>
            <figcaption className="text-slate-100 pl-4">
              Input a note as part of your guess.
            </figcaption>
          </figure>

          <figure className="flex flex-row place-items-center mb-4">
            <div
              className="bg-green-700 font-bold grid place-items-center h-8 w-[30px] ml-2 border-2 border-slate-300 rounded-md"
              aria-label="Correct note guess example"
            >
              C
            </div>
            <figcaption className="ml-4">Correct note guess.</figcaption>
          </figure>

          <figure className="flex flex-row place-items-center mb-4">
            <div
              className="bg-amber-400 font-bold grid place-items-center h-8 w-[30px] ml-2 border-2 border-slate-300 rounded-md"
              aria-label="Close note guess example"
            >
              B
            </div>
            <figcaption className="ml-4">
              Note guess was off by a half step.
            </figcaption>
          </figure>

          <figure className="flex flex-row place-items-center mb-4">
            <div
              className="bg-red-700 font-bold grid place-items-center h-8 w-[30px] ml-2 border-2 border-slate-300 rounded-md"
              aria-label="Correct note guess example"
            >
              B♭
            </div>
            <figcaption className="ml-4">Incorrect note guess.</figcaption>
          </figure>

          <figure className="flex flex-row place-items-center mb-4">
            <div
              className="round-button-example font-bold"
              aria-label="Submit guess button example"
            >
              ✓
            </div>
            <figcaption className="text-slate-100 w-full pl-4">
              Submit your guess for the tones played.
            </figcaption>
          </figure>

          <figure className="flex flex-row place-items-center mb-4">
            <div
              className="round-button-example"
              aria-label="Play melody button example"
            >
              ♫
            </div>
            <figcaption className="text-slate-100 w-full pl-4">
              Listen to the random tones.
            </figcaption>
          </figure>

          <figure className="flex flex-row place-items-center mb-4">
            <div
              className="round-button-example"
              aria-label="Delete button example"
            >
              ⌫
            </div>
            <figcaption className="text-slate-100 w-full pl-4">
              Delete a note from your guess.
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
};

export default InformationModal;
