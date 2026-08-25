import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";

export function SuccessState({
  heading,
  body,
  motto,
  notice,
  onReset,
  resetLabel,
}: {
  heading: string;
  body: string;
  motto?: string;
  notice?: string;
  onReset: () => void;
  resetLabel: string;
}) {
  return (
    <div
      role="status"
      tabIndex={-1}
      className="border border-rule bg-ivory px-6 py-10 sm:px-10"
    >
      <h3 className="display-md">{heading}</h3>
      <p className="mt-4 text-lg text-ink-soft">{body}</p>
      {motto ? (
        <p className="mt-6 font-display text-2xl italic">{motto}</p>
      ) : (
        <p className="mt-6 font-display text-2xl italic">{site.motto}</p>
      )}
      {notice ? (
        <p className="mt-8 text-sm text-ink-soft">{notice}</p>
      ) : null}
      <Button variant="secondary" className="mt-8" onClick={onReset}>
        {resetLabel}
      </Button>
    </div>
  );
}
