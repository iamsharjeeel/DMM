export const fieldLimits = {
  name: 120,
  organization: 200,
  email: 254,
  phone: 32,
  eventName: 200,
  eventLocation: 300,
  details: 4000,
  referral: 240,
  request: 4000,
  attendanceMax: 100000,
} as const;

export const MIN_FORM_SUBMIT_MS = 800;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+]?[\d\s().-]{7,32}$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

export function clip(value: string, max: number): string {
  return value.slice(0, max);
}

export function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  return (
    trimmed.length > 0 &&
    trimmed.length <= fieldLimits.email &&
    emailPattern.test(trimmed)
  );
}

export function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) {
    return true;
  }
  return trimmed.length <= fieldLimits.phone && phonePattern.test(trimmed);
}

export function requiredText(value: string, label: string): string | undefined {
  if (!value.trim()) {
    return `${label} is required.`;
  }
  return undefined;
}

export function tooLong(value: string, max: number, label: string): string | undefined {
  if (value.length > max) {
    return `${label} is too long.`;
  }
  return undefined;
}

export function isAllowed<T extends string>(
  value: string,
  allowed: readonly T[],
): value is T {
  return (allowed as readonly string[]).includes(value);
}

export function isReasonableEventDate(value: string): boolean {
  if (!datePattern.test(value)) {
    return false;
  }
  const parsed = Date.parse(`${value}T00:00:00`);
  if (Number.isNaN(parsed)) {
    return false;
  }
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  return parsed >= now - day && parsed <= now + 5 * 365 * day;
}

export function parseAttendance(value: string): number | undefined {
  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }
  if (!/^\d+$/.test(trimmed)) {
    return Number.NaN;
  }
  return Number(trimmed);
}

export function isAutomatedSubmission(
  honeypot: string,
  startedAt: number | null,
): boolean {
  if (honeypot.trim()) {
    return true;
  }
  if (startedAt === null) {
    return false;
  }
  return Date.now() - startedAt < MIN_FORM_SUBMIT_MS;
}
