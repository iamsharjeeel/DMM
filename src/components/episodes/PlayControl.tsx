import { cn } from "@/lib/cn";
import { PauseIcon, PlayIcon } from "@/components/ui/icons";

export function PlayControl({
  playing,
  label,
  onClick,
  tone = "light",
  filled = false,
}: {
  playing: boolean;
  label: string;
  onClick: () => void;
  tone?: "light" | "forest";
  filled?: boolean;
}) {
  const forest = tone === "forest";

  return (
    <button
      type="button"
      aria-pressed={playing}
      aria-label={label}
      onClick={onClick}
      className={cn(
        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-[background-color,border-color,color,transform] duration-[180ms] ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none",
        forest &&
          !filled &&
          "border border-cream/45 text-cream hover:border-cream hover:bg-cream/10",
        forest &&
          filled &&
          "bg-cream text-forest ring-1 ring-gold hover:bg-cream",
        !forest &&
          !filled &&
          "border border-forest/30 text-forest hover:border-forest hover:bg-cream",
        !forest && filled && "bg-forest text-cream hover:bg-forest-deep",
      )}
    >
      {playing ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
}
