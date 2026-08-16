import { prayer } from "@/content/prayer";
import { Container } from "@/components/ui/Container";

export function PrayerHero() {
  return (
    <section className="bg-prayer">
      <Container width="narrow" className="py-16 text-center lg:py-24">
        <h1 className="font-display text-5xl leading-[1.05] text-balance sm:text-6xl">
          {prayer.hero.headline}
        </h1>
        <div className="mt-8 space-y-3 text-lg text-ink-soft sm:text-xl">
          {prayer.hero.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}
