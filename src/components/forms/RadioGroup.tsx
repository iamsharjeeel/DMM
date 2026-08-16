import { cn } from "@/lib/cn";

type Option = { value: string; label: string };

export function RadioGroup({
  legend,
  name,
  value,
  options,
  error,
  required,
  onChange,
}: {
  legend: string;
  name: string;
  value: string;
  options: ReadonlyArray<Option>;
  error?: string;
  required?: boolean;
  onChange: (value: string) => void;
}) {
  const errorId = error ? `${name}-error` : undefined;

  return (
    <fieldset aria-describedby={errorId} aria-invalid={Boolean(error)}>
      <legend className="type-meta text-ink">
        {legend}
        {required ? (
          <span className="text-gold">
            {" "}
            *
            <span className="sr-only"> required</span>
          </span>
        ) : null}
      </legend>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
        {options.map((option) => {
          const id = `${name}-${option.value}`;
          const selected = value === option.value;
          return (
            <label
              key={option.value}
              htmlFor={id}
              className={cn(
                "inline-flex min-h-12 cursor-pointer items-center gap-3 rounded-none border px-4 py-2",
                selected
                  ? "border-gold bg-canvas-soft"
                  : "border-hairline bg-canvas hover:border-gold",
              )}
            >
              <input
                id={id}
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="h-4 w-4 rounded-none accent-gold"
              />
              <span className="font-serif text-[17px] text-body">
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
      {error ? (
        <p id={errorId} role="alert" className="mt-2 font-serif text-sm text-gold-deep">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
