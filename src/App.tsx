import MainGame from "./components/MainGame";
import { BoardContextProvider } from "./contexts/BoardContext";
import InformationButton from "./components/InformationButton";

const App = () => {
  return (
    <div className="bg-gray-800 h-screen flex flex-col items-center">
      <div className="w-10/12 max-w-80 flex flex-row place-items-center">
        <h1 className="text-center text-4xl text-slate-100 font-bold w-full pt-2 pb-4">
          Soundle
        </h1>
        <InformationButton />
      </div>
      <BoardContextProvider>
        <MainGame />
      </BoardContextProvider>
    </div>
  );
};

export default App;
