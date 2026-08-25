import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AccentRule } from "@/components/ui/AccentRule";

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
        <Eyebrow invert={invert} className={align === "center" ? "mx-auto" : undefined}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <AccentRule className={cn("mt-5", align === "center" && "mx-auto")} />
      <h2
        className={cn(
          "display-lg mt-5 text-balance",
          invert ? "text-cream" : "text-ink",
        )}
      >
        {heading}
      </h2>
      {children ? (
        <div
          className={cn(
            "mt-5 max-w-2xl text-lg leading-relaxed",
            invert ? "text-cream/80" : "text-ink-soft",
            align === "center" && "mx-auto",
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
