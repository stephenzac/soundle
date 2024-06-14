interface HappyCatProps {
  gifPath: string;
}

const HappyCat = ({ gifPath }: HappyCatProps) => {
  return (
    <div className="absolute left-1/2">
      <img src={gifPath} alt="GIF of happy cat dancing"></img>
    </div>
  );
};

export default HappyCat;
