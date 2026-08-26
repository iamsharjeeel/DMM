import { EditorialImage } from "@/components/ui/EditorialImage";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { site } from "@/config/site";
import { speakingLanding } from "@/content/speaking-landing";

export function SpeakingAtmosphere() {
  const { atmosphere } = speakingLanding;

  return (
    <Section className="overflow-x-clip">
      <Container width="wide">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-9">
              <EditorialImage
                src={site.assets.supportingImage}
                alt={atmosphere.alt}
                aspect="cinematic"
                sizes="(max-width: 1023px) 100vw, 72vw"
                objectPosition="center 48%"
              />
            </div>
            <div className="lg:col-span-3 lg:pb-2">
              <Eyebrow>{atmosphere.eyebrow}</Eyebrow>
              <h2 className="sr-only">{atmosphere.eyebrow}</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft lg:mt-6">
                {atmosphere.caption}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
