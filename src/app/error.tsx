"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main" className="bg-ivory">
      <div className="mx-auto max-w-narrow px-5 py-24 text-center">
        <p className="text-xs tracking-[0.28em] uppercase text-bronze-dark">
          Error
        </p>
        <h1 className="mt-4 font-display text-4xl">Something went wrong.</h1>
        <p className="mt-4 text-ink-soft">
          Please try again. If the problem continues, return home and start from
          there.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex min-h-11 items-center justify-center bg-navy px-5 text-sm tracking-[0.08em] text-paper uppercase"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
