import { speaking } from "@/content/speaking";
import { SpeakingBookingForm } from "@/components/forms/SpeakingBookingForm";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BookingSection() {
  const { booking } = speaking;

  return (
    <Section id="booking" tone="paper">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading heading={booking.heading}>
          <p>{booking.body}</p>
          <p className="mt-4">{booking.supporting}</p>
        </SectionHeading>
        <SpeakingBookingForm />
      </Container>
    </Section>
  );
}
