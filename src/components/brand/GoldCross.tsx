import { cn } from "@/lib/cn";

export function GoldCross({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="18"
      viewBox="0 0 14 18"
      fill="none"
      aria-hidden="true"
      className={cn("text-gold", className)}
    >
      <path d="M7 0.5V17.5" stroke="currentColor" strokeWidth="1" />
      <path d="M1 6.5H13" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
