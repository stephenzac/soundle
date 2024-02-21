import { ReactNode, createContext, useContext, useState } from "react";

interface InformationContext {
  clicked: boolean;
  setClicked: (newState: boolean) => void;
}

const infoContext = createContext<InformationContext>({} as InformationContext);

const InformationContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [clicked, setIsClicked] = useState(false);

  const setClicked = (newState: boolean) => {
    setIsClicked(!clicked);
  };

  const contextValue: InformationContext = {
    clicked,
    setClicked,
  };

  return (
    <infoContext.Provider value={contextValue}>{children}</infoContext.Provider>
  );
};

const useInformationContext = () => {
  return useContext(infoContext);
};

export { useInformationContext, InformationContextProvider };
