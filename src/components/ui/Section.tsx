import { cn } from "@/lib/cn";

export function Section({
  children,
  className,
  id,
  tone = "ivory",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "ivory" | "paper" | "navy" | "prayer" | "deep";
}) {
  const tones = {
    ivory: "bg-ivory text-ink",
    paper: "bg-paper text-ink",
    navy: "bg-navy text-paper",
    prayer: "bg-prayer text-ink",
    deep: "bg-ivory-deep text-ink",
  } as const;

  return (
    <section id={id} className={cn("section-space", tones[tone], className)}>
      {children}
    </section>
  );
}
