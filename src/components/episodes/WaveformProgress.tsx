import { formatTimecode } from "@/lib/episodes";
import { cn } from "@/lib/cn";

const PATTERN = [
  0.28, 0.46, 0.62, 0.4, 0.78, 0.52, 0.34, 0.7, 0.48, 0.86, 0.42, 0.58, 0.31,
  0.74, 0.5, 0.36, 0.66, 0.44, 0.8, 0.55, 0.38, 0.72, 0.47, 0.6,
];

export function WaveformProgress({
  value,
  max,
  label,
  valueText,
  onSeek,
  invert = false,
}: {
  value: number;
  max: number;
  label: string;
  valueText: string;
  onSeek: (seconds: number) => void;
  invert?: boolean;
}) {
  const duration = max > 0 ? max : 1;
  const ratio = Math.min(1, Math.max(0, value / duration));
  const bars = Array.from({ length: 48 }, (_, index) => PATTERN[index % PATTERN.length]);

  return (
    <div className="relative h-10">
      <svg
        viewBox="0 0 48 20"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {bars.map((height, index) => {
          const filled = index / bars.length <= ratio;
          const x = index + 0.22;
          const barHeight = height * 18;
          const y = 19 - barHeight;
          return (
            <rect
              key={index}
              x={x}
              y={y}
              width="0.56"
              height={barHeight}
              className={cn(
                invert
                  ? filled
                    ? "fill-cream"
                    : "fill-cream/25"
                  : filled
                    ? "fill-forest"
                    : "fill-forest/20",
              )}
            />
          );
        })}
      </svg>
      <input
        type="range"
        min={0}
        max={duration}
        step={0.25}
        value={Math.min(value, duration)}
        aria-label={label}
        aria-valuetext={valueText}
        disabled={max <= 0}
        onChange={(event) => onSeek(Number(event.target.value))}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
      />
      <span className="sr-only">
        {formatTimecode(value)} of {formatTimecode(max)}
      </span>
    </div>
  );
}
