import { legal } from "@/content/legal";
import { Container } from "@/components/ui/Container";

type LegalKey = keyof typeof legal;

export function LegalPage({ kind }: { kind: LegalKey }) {
  const page = legal[kind];

  return (
    <article className="section-hairline bg-canvas">
      <Container className="py-[84px] lg:py-[140px]">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="type-meta text-gold">Updated {page.updated}</p>
            <h1 className="type-display-lg mt-7 text-ink">{page.title}</h1>
            <p className="type-body mt-7">{page.intro}</p>
            <div className="mt-[56px] space-y-10">
              {page.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="type-display-md text-ink">{section.heading}</h2>
                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="type-body">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
