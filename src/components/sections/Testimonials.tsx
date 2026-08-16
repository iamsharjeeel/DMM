export function Testimonials({
  heading,
  items,
}: {
  heading: string;
  items: ReadonlyArray<{ quote: string; name: string; role?: string }>;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="section-space bg-paper">
      <div className="mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <h2 className="font-display text-4xl">{heading}</h2>
        <ul className="mt-10 grid gap-8 lg:grid-cols-2">
          {items.map((item) => (
            <li key={`${item.name}-${item.quote}`} className="border-t border-rule pt-6">
              <blockquote className="font-display text-2xl italic">
                {item.quote}
              </blockquote>
              <p className="mt-4 text-sm tracking-[0.08em] uppercase text-ink-soft">
                {item.name}
                {item.role ? ` — ${item.role}` : ""}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
