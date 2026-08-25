export function stripNul(value: string): string {
  return value.replace(/\u0000/g, "");
}

export function trimText(value: string): string {
  return stripNul(value).trim();
}

export function normalizeEmail(value: string): string {
  return trimText(value).toLowerCase();
}

export function normalizeMultiline(value: string): string {
  return stripNul(value).replace(/^\s+|\s+$/g, "");
}

export function asBoolean(value: unknown): boolean | undefined {
  if (typeof value === "boolean") {
    return value;
  }
  return undefined;
}

export function normalizeAttendance(value: string | number): string {
  if (typeof value === "number") {
    if (!Number.isInteger(value) || value < 1) {
      return "";
    }
    return String(value);
  }
  return trimText(value);
}
