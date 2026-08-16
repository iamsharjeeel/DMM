export type FollowUpChoice = "yes" | "no" | "";
export type ContactMethod = "email" | "phone" | "text" | "";
export type EventFormat = "in-person" | "virtual" | "";

export type SpeakingBookingValues = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  eventType: string;
  attendance: string;
  format: EventFormat;
  topic: string;
  details: string;
  referral: string;
};

export type PrayerRequestValues = {
  name: string;
  email: string;
  phone: string;
  request: string;
  urgent: boolean;
  followUp: FollowUpChoice;
  contactMethod: ContactMethod;
  consent: boolean;
};

export type FieldErrors<T> = Partial<Record<keyof T, string>>;
