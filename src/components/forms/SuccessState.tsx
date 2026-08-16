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
  notice: string;
  onReset: () => void;
  resetLabel: string;
}) {
  return (
    <div
      role="status"
      tabIndex={-1}
      className="rounded-none border border-hairline bg-canvas px-6 py-10 sm:px-10"
    >
      <h3 className="type-display-md text-ink">{heading}</h3>
      <p className="type-body mt-7">{body}</p>
      <p className="type-serif-italic mt-7 text-gold">
        {motto ?? site.motto}
      </p>
      <p className="mt-8 font-serif text-sm text-muted">{notice}</p>
      <Button variant="secondary" className="mt-8" onClick={onReset}>
        {resetLabel}
      </Button>
    </div>
  );
}
