import { speakingLanding } from "@/content/speaking-landing";

export function SpeakingAuthorityStrip() {
  return (
    <section className="bg-blue-deep text-cream" aria-label="Ministry credentials">
      <div className="mx-auto grid max-w-wide grid-cols-2 lg:grid-cols-4">
        {speakingLanding.authority.map((item, index) => (
          <p
            key={item}
            className="relative px-5 py-5 text-[0.82rem] leading-snug text-cream sm:px-8 sm:py-6 sm:text-[0.9rem] lg:px-8 lg:py-5"
          >
            {index % 2 === 1 ? (
              <span
                aria-hidden="true"
                className="absolute top-5 left-0 h-3 w-px bg-red lg:hidden"
              />
            ) : null}
            {index > 0 ? (
              <span
                aria-hidden="true"
                className="absolute top-1/2 left-0 hidden h-3 w-px -translate-y-1/2 bg-red lg:block"
              />
            ) : null}
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}
