import { cn } from "@/lib/cn";

export function GoldRule({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("gold-rule", className)} />;
}
