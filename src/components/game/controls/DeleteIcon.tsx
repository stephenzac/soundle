// Pixel-art backspace key. Like the other control icons, Press Start 2P has no ⌫ glyph, so the
// fallback font (and its size) differed per browser; drawing it keeps it identical everywhere.
export const DeleteIcon: React.FC = () => (
  <svg
    viewBox="0 0 12 9"
    className="inline-block h-[0.9em] w-auto"
    fill="currentColor"
    shapeRendering="crispEdges"
    aria-hidden="true"
  >
    <path d="M4 0h8v1H4zM3 1h1v1H3zM2 2h1v1H2zM1 3h1v1H1zM0 4h1v1H0zM1 5h1v1H1zM2 6h1v1H2zM3 7h1v1H3zM4 8h8v1H4zM11 1h1v7h-1zM5 2h1v1H5zM9 2h1v1H9zM6 3h1v1H6zM8 3h1v1H8zM7 4h1v1H7zM6 5h1v1H6zM8 5h1v1H8zM5 6h1v1H5zM9 6h1v1H9z" />
  </svg>
);
