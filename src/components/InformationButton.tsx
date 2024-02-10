import { useState } from "react";

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
