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
      <legend className="text-sm font-medium text-ink">
        {legend}
        {required ? (
          <span className="text-forest">
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
                "inline-flex min-h-12 cursor-pointer items-center gap-3 border px-4 py-2",
                selected
                  ? "border-forest bg-sage"
                  : "border-rule bg-transparent hover:border-forest/40",
              )}
            >
              <input
                id={id}
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="h-4 w-4 accent-forest"
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
      {error ? (
        <p id={errorId} role="alert" className="mt-2 text-sm text-error">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
