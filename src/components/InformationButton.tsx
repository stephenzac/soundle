interface InformationButtonProps {
  setClickedState: (newState: boolean) => void;
}

const InformationButton = ({ setClickedState }: InformationButtonProps) => {
  return (
    <div
      className="round-button font-bold"
      onClick={() => {
        setClickedState(true);
      }}
    >
      ?
    </div>
  );
};

export default InformationButton;
