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
  tone?: "light" | "blue";
  filled?: boolean;
}) {
  const blue = tone === "blue";

  return (
    <button
      type="button"
      aria-pressed={playing}
      aria-label={label}
      onClick={onClick}
      className={cn(
        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-[background-color,border-color,color,transform] duration-[180ms] ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none",
        blue &&
          !filled &&
          "border border-cream/45 text-cream hover:border-cream hover:bg-cream/10",
        blue &&
          filled &&
          "bg-cream text-blue ring-1 ring-red hover:bg-cream",
        !blue &&
          !filled &&
          "border border-blue/30 text-blue hover:border-blue hover:bg-cream",
        !blue && filled && "bg-blue text-cream hover:bg-blue-hover",
      )}
    >
      {playing ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
}
