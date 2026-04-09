export const GitHubLink: React.FC = () => (
  <div className="flex flex-row place-items-center">
    <a
      className="flex place-items-center gap-2 pixel-link h-12 ml-2 no-underline"
      href="https://github.com/stephenzac"
      target="_blank"
      rel="noreferrer"
    >
      <img
        src="./github-mark-white.png"
        className="w-7 h-7 flex place-items-center"
        alt="GitHub cat sihouette logo"
      />
      stephenzac
    </a>
  </div>
);
