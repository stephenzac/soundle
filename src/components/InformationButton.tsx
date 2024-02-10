import { useState } from "react";
import Information from "./Information";

const InformationButton = () => {
  const [clicked, setClicked] = useState(false);

  const buttonClicked = () => {
    if (!clicked) {
      console.log("Showing information");
      setClicked(true);
    }
  };

  return (
    <div className="round-button font-bold" onClick={buttonClicked}>
      ?
    </div>
  );
};

export default InformationButton;
