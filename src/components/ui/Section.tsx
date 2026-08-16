import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Section({
  children,
  className,
  id,
  tone = "canvas",
  hairline = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "canvas" | "canvas-soft" | "navy";
  hairline?: boolean;
}) {
  const tones = {
    canvas: "bg-canvas text-ink",
    "canvas-soft": "bg-canvas-soft text-ink",
    navy: "bg-navy-panel text-on-navy",
  } as const;

  return (
    <section
      id={id}
      className={cn(
        "section-space",
        tones[tone],
        hairline && "section-hairline",
        className,
      )}
    >
      {children}
    </section>
  );
}
