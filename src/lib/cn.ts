// Joins class names, skipping falsy values. Registered in .vscode/settings.json
// (tailwindCSS.classFunctions) so Tailwind IntelliSense autocompletes inside cn(...) calls.
export const cn = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(' ');
