const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return emailPattern.test(value.trim());
}

export function requiredText(value: string, label: string): string | undefined {
  if (!value.trim()) {
    return `${label} is required.`;
  }
  return undefined;
}
