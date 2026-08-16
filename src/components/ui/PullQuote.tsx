import { cn } from "@/lib/cn";
import { GoldRule } from "@/components/ui/GoldRule";

export function PullQuote({
  lead,
  quote,
  invert = false,
}: {
  lead?: string;
  quote: string;
  invert?: boolean;
}) {
  return (
    <figure className="mt-10 max-w-xl">
      {lead ? (
        <p className={cn("text-ink-soft", invert && "text-cream/70")}>{lead}</p>
      ) : null}
      <GoldRule className="mt-5" />
      <blockquote
        className={cn(
          "mt-5 font-display text-[1.85rem] leading-[1.15] italic sm:text-[2.15rem]",
          invert ? "text-cream" : "text-ink",
        )}
      >
        {quote}
      </blockquote>
    </figure>
  );
}
