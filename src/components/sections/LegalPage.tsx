import { legal } from "@/content/legal";
import { Container } from "@/components/ui/Container";
import { GoldRule } from "@/components/ui/GoldRule";

type LegalKey = keyof typeof legal;

export function LegalPage({ kind }: { kind: LegalKey }) {
  const page = legal[kind];

  return (
    <article className="bg-ivory">
      <Container width="narrow" className="py-16 lg:py-24">
        <p className="eyebrow text-forest">Updated {page.updated}</p>
        <GoldRule className="mt-5" />
        <h1 className="display-lg mt-5">{page.title}</h1>
        <p className="mt-6 text-lg text-ink-soft">{page.intro}</p>
        <div className="mt-12 space-y-10">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-[1.7rem] leading-tight">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-ink-soft">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </article>
  );
}
