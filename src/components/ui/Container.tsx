import { cn } from "@/lib/cn";

type Width = "default" | "narrow" | "wide" | "full";

const widths: Record<Width, string> = {
  default: "max-w-content",
  narrow: "max-w-narrow",
  wide: "max-w-wide",
  full: "max-w-none",
};

export function Container({
  children,
  className,
  width = "default",
}: {
  children: React.ReactNode;
  className?: string;
  width?: Width;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full min-w-0 px-5 sm:px-8 lg:px-12 xl:px-16",
        widths[width],
        className,
      )}
    >
      {children}
    </div>
  );
}
