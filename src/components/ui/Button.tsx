import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "navy" | "ghost" | "invert";
type ButtonSize = "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-bronze text-paper hover:bg-bronze-dark focus-visible:outline-bronze",
  secondary:
    "border border-ink/20 bg-transparent text-ink hover:border-bronze hover:text-bronze-dark",
  navy: "bg-navy text-paper hover:bg-navy-deep",
  ghost: "text-ink underline-offset-[6px] hover:text-bronze hover:underline",
  invert:
    "border border-paper/40 bg-transparent text-paper hover:border-paper hover:bg-paper/10",
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 py-2.5 text-sm tracking-[0.08em]",
  lg: "min-h-12 px-6 py-3 text-sm tracking-[0.1em]",
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-sm font-medium uppercase transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <button
      type={type}
      className={buttonClassName({ variant, size, className })}
      {...props}
    />
  );
}
