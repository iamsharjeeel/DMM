import { episodesPage } from "@/content/episodes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { AccentRule } from "@/components/ui/AccentRule";
import { site } from "@/config/site";

export function ClosingBand() {
  const { closing } = episodesPage;

  return (
    <section className="bg-mist pb-[calc(10rem+env(safe-area-inset-bottom))] sm:pb-0">
      <Container
        width="wide"
        className="flex flex-col gap-8 py-16 lg:flex-row lg:items-end lg:justify-between lg:py-20"
      >
        <div className="max-w-xl">
          <p className="eyebrow text-blue">{closing.eyebrow}</p>
          <AccentRule className="mt-5" />
          <h2 className="display-md mt-5">{closing.heading}</h2>
          <p className="mt-4 text-ink-soft">{closing.body}</p>
        </div>
        <ButtonLink href={site.routes.home} variant="primary">
          {closing.cta}
        </ButtonLink>
      </Container>
    </section>
  );
}
