// Pixel-art checkmark. Like ♭, ♫ and ↺, Press Start 2P has no ✓ glyph, so the fallback font
// (and its size) differed per browser; drawing it keeps it identical everywhere.
export const SubmitIcon: React.FC = () => (
  <svg
    viewBox="0 0 9 7"
    className="inline-block h-[0.85em] w-auto"
    fill="currentColor"
    shapeRendering="crispEdges"
    aria-hidden="true"
  >
    <path d="M8 0h1v1H8zM7 1h2v1H7zM0 2h1v1H0zM6 2h2v1H6zM0 3h2v1H0zM5 3h2v1H5zM1 4h2v1H1zM4 4h2v1H4zM2 5h3v1H2zM3 6h1v1H3z" />
  </svg>
);
