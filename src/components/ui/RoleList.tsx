import { cn } from "@/lib/cn";

export function RoleList({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={cn("mt-12 grid gap-x-16 sm:grid-cols-2", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-5 border-t border-rule py-5">
          <span
            aria-hidden="true"
            className="mt-[0.85rem] h-px w-3.5 shrink-0 bg-red"
          />
          <span className="min-w-0 pt-0.5 text-lg leading-snug">{item}</span>
        </li>
      ))}
    </ul>
  );
}
