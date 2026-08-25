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
  tone?: "ivory" | "cream" | "mist" | "blue";
}) {
  const tones = {
    ivory: "bg-ivory text-ink",
    cream: "bg-cream text-ink",
    mist: "bg-mist text-ink",
    blue: "tone-blue",
  } as const;

  return (
    <section id={id} className={cn("section-space", tones[tone], className)}>
      {children}
    </section>
  );
}
