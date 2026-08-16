"use client";

import "./globals.css";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f6f1e8] text-[#1c1917]">
        <main className="mx-auto max-w-xl px-5 py-24 text-center">
          <h1 className="text-3xl">Something went wrong.</h1>
          <p className="mt-4 text-[#57534e]">
            Please try again, or return to the home page.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 inline-flex min-h-11 items-center justify-center bg-[#1b2636] px-5 text-sm tracking-[0.08em] text-[#fbf8f2] uppercase"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
