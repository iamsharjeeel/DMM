import { cn } from "@/lib/cn";

export function AccentRule({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("accent-rule", className)} />;
}
