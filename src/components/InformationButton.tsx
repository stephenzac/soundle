type InformationButtonProps = {
  setClickedState: (newState: boolean) => void;
};

const InformationButton: React.FC<InformationButtonProps> = ({
  setClickedState,
}) => {
  return (
    <button
      className="round-button font-bold"
      onClick={() => {
        setClickedState(true);
      }}
      aria-label="Show game information"
    >
      ?
    </button>
  );
};

export default InformationButton;
