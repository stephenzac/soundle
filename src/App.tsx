import MainGame from "./components/MainGame";

const App = () => {

  return (
    <div className="bg-gray-800 h-screen flex flex-col">

      <h1 className="text-center text-4xl text-slate-100 font-bold w-full pt-2 pb-10">
        Melodle Clone
      </h1>
      
      <MainGame/>

    </div>
  );
};

export default App;
