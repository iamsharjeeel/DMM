import Link from "next/link";
import { buttonClassName } from "@/components/ui/Button";

type ButtonLinkProps = {
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "invert";
  size?: "md" | "lg";
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonClassName({ variant, size, className })}>
      {children}
    </Link>
  );
}
