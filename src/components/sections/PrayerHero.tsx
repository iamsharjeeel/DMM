import { prayer } from "@/content/prayer";
import { Container } from "@/components/ui/Container";
import { GoldRule } from "@/components/ui/GoldRule";

export function PrayerHero() {
  return (
    <section className="bg-ivory">
      <Container width="narrow" className="py-16 lg:py-24">
        <p className="eyebrow text-forest">Prayer</p>
        <GoldRule className="mt-5" />
        <h1 className="display-lg mt-6 max-w-[14ch] text-balance">
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
