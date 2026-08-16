import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  heading,
  children,
  align = "left",
  invert = false,
}: {
  eyebrow?: string;
  heading: string;
  children?: React.ReactNode;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-4 text-xs font-medium uppercase tracking-[0.28em]",
            invert ? "text-bronze" : "text-bronze-dark",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-display text-4xl leading-[1.1] font-medium tracking-tight sm:text-5xl",
          invert ? "text-paper" : "text-ink",
        )}
      >
        {heading}
      </h2>
      {children ? (
        <div
          className={cn(
            "mt-5 max-w-2xl text-lg leading-relaxed",
            invert ? "text-paper/80" : "text-ink-soft",
            align === "center" && "mx-auto",
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
