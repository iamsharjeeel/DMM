export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:bg-navy focus:px-4 focus:py-2 focus:text-paper"
    >
      Skip to content
    </a>
  );
}
