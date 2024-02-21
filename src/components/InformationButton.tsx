import { useInformationContext } from "../contexts/InformationContext";

const InformationButton = () => {
  const { clicked, setClicked } = useInformationContext();

  const buttonClicked = () => {
    setClicked(true);
  };

  return (
    <div className="round-button font-bold" onClick={buttonClicked}>
      ?
    </div>
  );
};

export default InformationButton;
