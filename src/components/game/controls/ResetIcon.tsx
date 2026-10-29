// Pixel-art anticlockwise arrow. Like ♭ and ♫, Press Start 2P has no ↺ glyph, so the fallback
// font (and its size and position) differed per browser; drawing it keeps it identical everywhere.
export const ResetIcon: React.FC = () => (
  <svg
    viewBox="0 0 11 13"
    className="inline-block h-[1.2em] w-auto"
    fill="currentColor"
    shapeRendering="crispEdges"
    aria-hidden="true"
  >
    <path d="M3 0h1v1H3zM2 1h2v1H2zM1 2h7v1H1zM1 3h9v1H1zM2 4h2v1H2zM8 4h2v1H8zM3 5h1v1H3zM9 5h2v1H9zM0 6h2v4H0zM9 6h2v4H9zM1 10h2v1H1zM8 10h2v1H8zM1 11h9v1H1zM3 12h5v1H3z" />
  </svg>
);
