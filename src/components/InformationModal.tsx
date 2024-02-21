import Information from "./Information";
import { useInformationContext } from "../contexts/InformationContext";

const InformationModal = () => {
  const { clicked, setClicked } = useInformationContext();

  const modalClicked = () => {
    setClicked(false);
  };

  if (clicked) {
    return (
      <>
        <div
          className="h-screen w-screen fixed top-0 bottom-0 left-0 right-0 bg-gray-800 opacity-60"
          onClick={modalClicked}
        ></div>
        <div className="flex place-items-center justify-center self-center">
          {clicked && <Information />}
        </div>
      </>
    );
  }
};

export default InformationModal;
