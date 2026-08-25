import { z } from "zod";
import { eventTypes, speakingTopicOptions } from "../../content/speaking";
import {
  normalizeEmail,
  normalizeMultiline,
  trimText,
} from "./normalize";
import { MIN_FORM_FILL_MS, type AllowedForm } from "./types";
import { fieldMax, isValidEmail } from "../validation";

const smsConsent = z
  .boolean()
  .optional()
  .transform((value) => value === true);

const protectionFields = {
  website: z.string().max(200).optional(),
  startedAt: z.number().finite().optional(),
};

const optionalEmail = z
  .string()
  .max(fieldMax.email)
  .transform(normalizeEmail)
  .refine((value) => value === "" || isValidEmail(value));

const requiredEmail = z
  .string()
  .max(fieldMax.email)
  .transform(normalizeEmail)
  .refine((value) => value.length > 0 && isValidEmail(value));

function isValidCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(5, 7));
  const day = Number(value.slice(8, 10));
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function parseAttendance(value: string | number): string | undefined {
  if (typeof value === "number") {
    if (!Number.isInteger(value) || value < 1 || value > 9_999_999) {
      return undefined;
    }
    return String(value);
  }
  const trimmed = trimText(value);
  if (!trimmed) {
    return "";
  }
  if (!/^[1-9]\d{0,6}$/.test(trimmed)) {
    return undefined;
  }
  return trimmed;
}

const prayerSchema = z
  .object({
    name: z.string().max(fieldMax.name).transform(trimText),
    email: optionalEmail,
    phone: z.string().max(fieldMax.phone).transform(trimText),
    request: z
      .string()
      .min(1)
      .max(fieldMax.request)
      .transform(normalizeMultiline)
      .refine((value) => value.length > 0),
    urgent: z.boolean(),
    followUp: z.enum(["yes", "no"]),
    contactMethod: z.enum(["", "email", "phone", "text"]),
    consent: z.boolean(),
    smsMarketingConsent: smsConsent,
    smsNonMarketingConsent: smsConsent,
    ...protectionFields,
  })
  .strict()
  .superRefine((value, ctx) => {
    if (value.followUp === "yes") {
      if (!value.contactMethod) {
        ctx.addIssue({ code: "custom", path: ["contactMethod"] });
      }
      if (!value.consent) {
        ctx.addIssue({ code: "custom", path: ["consent"] });
      }
      if (value.contactMethod === "email" && !value.email) {
        ctx.addIssue({ code: "custom", path: ["email"] });
      }
      if (
        (value.contactMethod === "phone" || value.contactMethod === "text") &&
        !value.phone
      ) {
        ctx.addIssue({ code: "custom", path: ["phone"] });
      }
    }
  });

const speakingSchema = z
  .object({
    name: z
      .string()
      .max(fieldMax.name)
      .transform(trimText)
      .refine((value) => value.length > 0),
    organization: z
      .string()
      .max(fieldMax.organization)
      .transform(trimText)
      .refine((value) => value.length > 0),
    email: requiredEmail,
    phone: z.string().max(fieldMax.phone).transform(trimText),
    eventName: z
      .string()
      .max(fieldMax.eventName)
      .transform(trimText)
      .refine((value) => value.length > 0),
    eventDate: z.string().refine(isValidCalendarDate),
    eventLocation: z
      .string()
      .max(fieldMax.eventLocation)
      .transform(trimText)
      .refine((value) => value.length > 0),
    eventType: z.enum(eventTypes),
    attendance: z.union([z.string(), z.number()]).optional(),
    format: z.enum(["in-person", "virtual"]),
    topic: z.enum(speakingTopicOptions),
    details: z
      .string()
      .max(fieldMax.details)
      .transform(normalizeMultiline)
      .refine((value) => value.length > 0),
    referral: z.string().max(fieldMax.referral).transform(trimText),
    smsMarketingConsent: smsConsent,
    smsNonMarketingConsent: smsConsent,
    ...protectionFields,
  })
  .strict()
  .superRefine((value, ctx) => {
    if (value.attendance === undefined) {
      return;
    }
    const attendance = parseAttendance(value.attendance);
    if (attendance === undefined) {
      ctx.addIssue({ code: "custom", path: ["attendance"] });
    }
  });

export type PrayerForwardPayload = {
  name: string;
  email: string;
  phone: string;
  request: string;
  urgent: boolean;
  followUp: "yes" | "no";
  contactMethod: "" | "email" | "phone" | "text";
  consent: boolean;
  smsMarketingConsent: boolean;
  smsNonMarketingConsent: boolean;
};

export type SpeakingForwardPayload = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  eventType: string;
  attendance: string;
  format: "in-person" | "virtual";
  topic: string;
  details: string;
  referral: string;
  smsMarketingConsent: boolean;
  smsNonMarketingConsent: boolean;
};

export type ParsedNativeForm =
  | { status: "invalid" }
  | { status: "ignored" }
  | { status: "ok"; payload: PrayerForwardPayload | SpeakingForwardPayload };

function shouldIgnore(website: string | undefined, startedAt: number | undefined) {
  if (trimText(website ?? "")) {
    return true;
  }
  if (typeof startedAt === "number") {
    const elapsed = Date.now() - startedAt;
    if (elapsed < MIN_FORM_FILL_MS) {
      return true;
    }
  }
  return false;
}

export function parseNativeForm(form: AllowedForm, input: unknown): ParsedNativeForm {
  if (form === "prayer-request") {
    const parsed = prayerSchema.safeParse(input);
    if (!parsed.success) {
      return { status: "invalid" };
    }
    if (shouldIgnore(parsed.data.website, parsed.data.startedAt)) {
      return { status: "ignored" };
    }
    const followUp = parsed.data.followUp;
    const payload: PrayerForwardPayload = {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      request: parsed.data.request,
      urgent: parsed.data.urgent,
      followUp,
      contactMethod: followUp === "no" ? "" : parsed.data.contactMethod,
      consent: followUp === "no" ? false : parsed.data.consent,
      smsMarketingConsent: parsed.data.smsMarketingConsent,
      smsNonMarketingConsent: parsed.data.smsNonMarketingConsent,
    };
    return { status: "ok", payload };
  }

  const parsed = speakingSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "invalid" };
  }
  if (shouldIgnore(parsed.data.website, parsed.data.startedAt)) {
    return { status: "ignored" };
  }
  const attendance = parseAttendance(parsed.data.attendance ?? "");
  const payload: SpeakingForwardPayload = {
    name: parsed.data.name,
    organization: parsed.data.organization,
    email: parsed.data.email,
    phone: parsed.data.phone,
    eventName: parsed.data.eventName,
    eventDate: parsed.data.eventDate,
    eventLocation: parsed.data.eventLocation,
    eventType: parsed.data.eventType,
    attendance: attendance ?? "",
    format: parsed.data.format,
    topic: parsed.data.topic,
    details: parsed.data.details,
    referral: parsed.data.referral,
    smsMarketingConsent: parsed.data.smsMarketingConsent,
    smsNonMarketingConsent: parsed.data.smsNonMarketingConsent,
  };
  return { status: "ok", payload };
}
