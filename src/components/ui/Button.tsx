import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "invert";
type ButtonSize = "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-ink hover:bg-gold-deep focus-visible:outline-gold",
  secondary:
    "border border-ink bg-transparent text-ink hover:bg-gold/5 focus-visible:outline-gold",
  invert:
    "border border-on-navy bg-transparent text-on-navy hover:bg-gold/5 focus-visible:outline-gold",
};

const sizes: Record<ButtonSize, string> = {
  md: "px-8 py-4",
  lg: "px-8 py-4",
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
    "type-meta inline-flex items-center justify-center rounded-none transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60",
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
