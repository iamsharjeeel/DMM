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
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
        {required ? (
          <span className="text-bronze-dark">
            {" "}
            *
            <span className="sr-only"> required</span>
          </span>
        ) : (
          <span className="ml-2 text-xs font-normal tracking-normal text-ink-soft">
            Optional
          </span>
        )}
      </label>
      {hint ? (
        <p id={hintId} className="text-sm text-ink-soft">
          {hint}
        </p>
      ) : null}
      <div
        className={cn(
          error &&
            "[&_input]:border-bronze-dark [&_select]:border-bronze-dark [&_textarea]:border-bronze-dark",
        )}
      >
        {field}
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-bronze-dark">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const controlClassName =
  "min-h-12 w-full rounded-sm border border-rule bg-paper px-3 py-2 text-base text-ink transition-colors focus:border-bronze focus:outline-none";
