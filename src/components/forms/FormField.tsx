import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

export function FormField({
  id,
  label,
  hint,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const field = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
      })
    : children;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="type-meta block text-ink">
        {label}
        {required ? (
          <span className="text-gold">
            {" "}
            *
            <span className="sr-only"> required</span>
          </span>
        ) : (
          <span className="ml-2 font-serif text-[13px] font-normal tracking-normal text-muted normal-case">
            Optional
          </span>
        )}
      </label>
      {hint ? (
        <p id={hintId} className="font-serif text-sm text-muted">
          {hint}
        </p>
      ) : null}
      <div
        className={cn(
          error &&
            "[&_input]:border-gold-deep [&_select]:border-gold-deep [&_textarea]:border-gold-deep",
        )}
      >
        {field}
      </div>
      {error ? (
        <p id={errorId} role="alert" className="font-serif text-sm text-gold-deep">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const controlClassName =
  "min-h-12 w-full rounded-none border border-hairline bg-canvas px-3 py-2 font-serif text-[17px] text-ink transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";
