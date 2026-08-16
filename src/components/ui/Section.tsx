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
  tone?: "ivory" | "cream" | "sage" | "forest";
}) {
  const tones = {
    ivory: "bg-ivory text-ink",
    cream: "bg-cream text-ink",
    sage: "bg-sage text-ink",
    forest: "tone-forest",
  } as const;

  return (
    <section id={id} className={cn("section-space", tones[tone], className)}>
      {children}
    </section>
  );
}
