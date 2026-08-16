import { prayer } from "@/content/prayer";
import { GoldCross } from "@/components/brand/GoldCross";
import { Container } from "@/components/ui/Container";

export function PrayerHero() {
  return (
    <section className="bg-navy-panel text-on-navy">
      <Container className="py-[84px] lg:py-[140px]">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <GoldCross />
            <h1 className="type-display-xl mt-7 text-on-navy">
              {prayer.hero.headline}
            </h1>
            <div className="mt-7 space-y-4">
              {prayer.hero.lines.map((line) => (
                <p key={line} className="type-body text-on-navy-muted">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
