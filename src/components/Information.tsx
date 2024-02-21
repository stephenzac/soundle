const Information = () => {
  return (
    <div className="flex flex-col place-items-start absolute top-16 bg-gray-700 h-3/5 max-w-80 pt-4 ml-auto mr-auto rounded-lg border-2 border-slate-300">
      <p className="text-slate-100 text-center mb-5">
        Soundle is a Wordle-like ear training game to improve your sense of
        pitch. Listen to the five tones in concert pitch and guess them all
        correctly within 6 tries.
      </p>

      <div className="flex flex-row place-items-center mb-4">
        <div className="note-box-example">C</div>
        <p className="text-slate-100 w-full pl-4">
          Input a note as part of your guess.
        </p>
      </div>

      <div className="flex flex-row place-items-center mb-4">
        <div className="round-button-example font-bold">✓</div>
        <p className="text-slate-100 w-full pl-4">
          Submit your guess for the melody played.
        </p>
      </div>

      <div className="flex flex-row place-items-center mb-4">
        <div className="round-button-example">♫</div>
        <p className="text-slate-100 w-full pl-4">
          Playback the random melody.
        </p>
      </div>

      <div className="flex flex-row place-items-center mb-4">
        <div className="round-button-example">⌫</div>
        <p className="text-slate-100 w-full pl-4">
          Delete a note from your guess.
        </p>
      </div>
    </div>
  );
};

export default Information;
