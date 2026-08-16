export const HONEYPOT_FIELD_NAME = "company_website";

export function HoneypotField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div
      className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
      aria-hidden="true"
    >
      <label htmlFor={HONEYPOT_FIELD_NAME}>Company website</label>
      <input
        id={HONEYPOT_FIELD_NAME}
        name={HONEYPOT_FIELD_NAME}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value.slice(0, 200))}
      />
    </div>
  );
}
