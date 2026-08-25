import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  invert = false,
  className,
}: {
  children: React.ReactNode;
  invert?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "eyebrow",
        invert ? "text-cream/70" : "text-blue",
        className,
      )}
    >
      {children}
    </p>
  );
}
