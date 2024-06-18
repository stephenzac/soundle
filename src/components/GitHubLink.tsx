const GitHubLink = () => {
  return (
    <div className="flex flex-row place-items-center">
      <a
        className="flex place-items-center gap-2 font-bold text-sm text-white h-12 ml-2 underline hover:scale-110 transition-all"
        href="https://github.com/stephenzac"
        target="_blank"
      >
        <img
          src={"./github-mark-white.png"}
          className="w-7 h-7 flex place-items-center"
        ></img>
        stephenzac
      </a>
    </div>
  );
};

export default GitHubLink;
