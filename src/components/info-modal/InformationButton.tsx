interface InformationButtonProps {
  setClickedState: (newState: boolean) => void;
}

export const InformationButton: React.FC<InformationButtonProps> = ({
  setClickedState,
}) => (
  <button
    className='round-button font-bold'
    onClick={() => setClickedState(true)}
    aria-label='Show game information'
  >
    ?
  </button>
);
