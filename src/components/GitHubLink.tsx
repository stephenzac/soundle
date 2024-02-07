// import icon from "./github-mark-white.png";

const GitHubLink = () => {
  return (
    <div className="flex flex-row place-items-center">
      <img
        src={"./github-mark-white.png"}
        className="w-7 h-7 flex place-items-center"
      ></img>

      <a
        className="font-bold text-sm text-white h-12 ml-2 flex place-items-center underline"
        href="https://github.com/stephenzac"
        target="_blank"
      >
        stephenzac
      </a>
    </div>
  );
};

export default GitHubLink;
