import MainGame from "./components/MainGame";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="bg-gray-800 h-screen flex flex-col items-center">
      <Header />
      <MainGame />
    </div>
  );
};

export default App;
