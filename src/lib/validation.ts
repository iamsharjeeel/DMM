const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const fieldMax = {
  name: 120,
  email: 254,
  phone: 40,
  organization: 160,
  eventName: 160,
  eventLocation: 200,
  attendance: 7,
  details: 4000,
  referral: 200,
  request: 4000,
} as const;

export function isValidEmail(value: string): boolean {
  return emailPattern.test(value.trim());
}

export function requiredText(value: string, label: string): string | undefined {
  if (!value.trim()) {
    return `${label} is required.`;
  }
  return undefined;
}

export function tooLong(
  value: string,
  max: number,
  label: string,
): string | undefined {
  if (value.length > max) {
    return `${label} must be ${max} characters or fewer.`;
  }
  return undefined;
}
