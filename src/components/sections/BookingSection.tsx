import { speaking } from "@/content/speaking";
import { site } from "@/config/site";
import { SpeakingBookingForm } from "@/components/forms/SpeakingBookingForm";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BookingSection() {
  const { booking } = speaking;

  return (
    <Section id="booking" tone="cream">
      <Container className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 xl:gap-20">
        <Reveal>
          <SectionHeading heading={booking.heading}>
            <p>{booking.body}</p>
            <p className="mt-4">{booking.supporting}</p>
            <p className="mt-4">
              {booking.callLabel}{" "}
              <a
                href={site.phoneHref}
                className="text-ink underline-offset-4 hover:underline"
              >
                {site.phone}
              </a>
            </p>
          </SectionHeading>
        </Reveal>
        <div className="border border-rule bg-ivory px-5 py-8 sm:px-8 sm:py-10">
          <SpeakingBookingForm />
        </div>
      </Container>
    </Section>
  );
}
