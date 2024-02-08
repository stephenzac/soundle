import MainGame from "./components/MainGame";
import { BoardContextProvider } from "./contexts/BoardContext";

const App = () => {
  // TODO:Change title
  return (
    <div className="bg-gray-800 h-screen flex flex-col">
      <h1 className="text-center text-4xl text-slate-100 font-bold w-full pt-2 pb-4">
        Melodle Clone
      </h1>
      <BoardContextProvider>
        <MainGame />
      </BoardContextProvider>
    </div>
  );
};

export default App;
