// Pixel-art beamed eighth notes. Like ♭, Press Start 2P has no ♫ glyph, so the fallback font
// (and its size) differed per browser; drawing it keeps it identical everywhere.
export const MelodyIcon: React.FC = () => (
  <svg
    viewBox="0 0 10 9"
    className="inline-block h-[1em] w-auto"
    fill="currentColor"
    shapeRendering="crispEdges"
    aria-hidden="true"
  >
    <path d="M3 0h7v2H3zM3 2h1v4H3zM9 2h1v4H9zM1 6h3v1H1zM0 7h4v1H0zM0 8h3v1H0zM7 6h3v1H7zM6 7h4v1H6zM6 8h3v1H6z" />
  </svg>
);
