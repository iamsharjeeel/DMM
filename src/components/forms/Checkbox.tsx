import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Checkbox({
  id,
  name,
  checked,
  onChange,
  children,
  error,
}: {
  id: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
  error?: string;
}) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer items-start gap-3 font-serif text-[17px] text-body",
          error && "text-gold-deep",
        )}
      >
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          onChange={(event) => onChange(event.target.checked)}
          className="mt-1 h-5 w-5 shrink-0 rounded-none accent-gold"
        />
        <span>{children}</span>
      </label>
      {error ? (
        <p id={errorId} role="alert" className="mt-2 font-serif text-sm text-gold-deep">
          {error}
        </p>
      ) : null}
    </div>
  );
}
