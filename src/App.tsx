import MainGame from "./components/MainGame";
import { BoardContextProvider } from "./contexts/BoardContext";

const App = () => {
  return (
    <div className="bg-gray-800 h-screen flex flex-col items-center">
      <h1 className="text-center text-4xl text-slate-100 font-bold w-full pt-2 pb-4">
        Soundle
      </h1>
      <BoardContextProvider>
        <MainGame />
      </BoardContextProvider>
    </div>
  );
};

export default App;
