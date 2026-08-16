import { speaking } from "@/content/speaking";
import { SpeakingBookingForm } from "@/components/forms/SpeakingBookingForm";
import { ChapterHead } from "@/components/ui/ChapterHead";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function BookingSection() {
  const { booking } = speaking;

  return (
    <Section id="booking" hairline>
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <ChapterHead
            numeral="04"
            eyebrow="Booking"
            heading={booking.heading}
          />
          <p className="type-body mt-7">{booking.body}</p>
          <p className="type-body mt-7">{booking.supporting}</p>
        </div>
        <div className="lg:col-span-7">
          <SpeakingBookingForm />
        </div>
      </Container>
    </Section>
  );
}
