interface SadCatProps {
  gifPath: string;
}

const SadCat = ({ gifPath }: SadCatProps) => {
  return (
    <div className="absolute left-1/3 w-48">
      <img src={gifPath} alt="GIF of banana cat crying"></img>
    </div>
  );
};

export default SadCat;
