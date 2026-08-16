export function ChapterHead({
  numeral,
  eyebrow,
  heading,
  as = "h2",
  className,
}: {
  numeral?: string;
  eyebrow: string;
  heading?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  const Heading = as;

  return (
    <header className={className}>
      <p className="type-meta text-gold">
        {numeral ? (
          <span className="lg:hidden">
            {numeral}
            <span aria-hidden="true"> · </span>
          </span>
        ) : null}
        {eyebrow}
      </p>
      {heading ? (
        <div className="mt-4 flex items-baseline gap-5">
          {numeral ? (
            <span
              aria-hidden="true"
              className="hidden shrink-0 font-display text-[44px] font-medium leading-none text-gold lg:block"
            >
              {numeral}
            </span>
          ) : null}
          <Heading className="type-display-lg text-ink">{heading}</Heading>
        </div>
      ) : null}
    </header>
  );
}
