"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { eventTypes, speaking, speakingTopicOptions } from "@/content/speaking";
import { Button } from "@/components/ui/Button";
import { HoneypotField } from "@/components/forms/HoneypotField";
import { controlClassName, FormField } from "@/components/forms/FormField";
import { RadioGroup } from "@/components/forms/RadioGroup";
import { SuccessState } from "@/components/forms/SuccessState";
import {
  clip,
  fieldLimits,
  isAllowed,
  isAutomatedSubmission,
  isReasonableEventDate,
  isValidEmail,
  isValidPhone,
  parseAttendance,
  requiredText,
  tooLong,
} from "@/lib/validation";
import type { EventFormat, FieldErrors, SpeakingBookingValues } from "@/types/forms";

const formatOptions = [
  { value: "in-person", label: "In-person" },
  { value: "virtual", label: "Virtual" },
] as const;

const empty: SpeakingBookingValues = {
  name: "",
  organization: "",
  email: "",
  phone: "",
  eventName: "",
  eventDate: "",
  eventLocation: "",
  eventType: "",
  attendance: "",
  format: "",
  topic: "",
  details: "",
  referral: "",
};

const fieldOrder: Array<keyof SpeakingBookingValues> = [
  "name",
  "organization",
  "email",
  "phone",
  "eventName",
  "eventDate",
  "eventLocation",
  "eventType",
  "attendance",
  "format",
  "topic",
  "details",
  "referral",
];

function validate(values: SpeakingBookingValues): FieldErrors<SpeakingBookingValues> {
  const errors: FieldErrors<SpeakingBookingValues> = {};
  const name = requiredText(values.name, "Name");
  const organization = requiredText(values.organization, "Organization");
  const eventName = requiredText(values.eventName, "Event name");
  const eventLocation = requiredText(values.eventLocation, "Event location");
  const details = requiredText(values.details, "Tell us about your event");

  if (name) errors.name = name;
  else {
    const long = tooLong(values.name, fieldLimits.name, "Name");
    if (long) errors.name = long;
  }
  if (organization) errors.organization = organization;
  else {
    const long = tooLong(values.organization, fieldLimits.organization, "Organization");
    if (long) errors.organization = long;
  }
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (values.phone && !isValidPhone(values.phone)) {
    errors.phone = "Enter a valid phone number.";
  }
  if (eventName) errors.eventName = eventName;
  else {
    const long = tooLong(values.eventName, fieldLimits.eventName, "Event name");
    if (long) errors.eventName = long;
  }
  if (!values.eventDate) {
    errors.eventDate = "Event date is required.";
  } else if (!isReasonableEventDate(values.eventDate)) {
    errors.eventDate = "Enter a valid event date.";
  }
  if (eventLocation) errors.eventLocation = eventLocation;
  else {
    const long = tooLong(values.eventLocation, fieldLimits.eventLocation, "Event location");
    if (long) errors.eventLocation = long;
  }
  if (!isAllowed(values.eventType, eventTypes)) {
    errors.eventType = "Select a valid type of event.";
  }
  if (!isAllowed(values.format, ["in-person", "virtual"])) {
    errors.format = "Select in-person or virtual.";
  }
  if (!isAllowed(values.topic, speakingTopicOptions)) {
    errors.topic = "Select a valid speaking topic.";
  }
  if (details) errors.details = details;
  else {
    const long = tooLong(values.details, fieldLimits.details, "Tell us about your event");
    if (long) errors.details = long;
  }
  if (values.referral) {
    const long = tooLong(values.referral, fieldLimits.referral, "This field");
    if (long) errors.referral = long;
  }
  if (values.attendance) {
    const attendance = parseAttendance(values.attendance);
    if (attendance === undefined || Number.isNaN(attendance) || attendance < 1 || attendance > fieldLimits.attendanceMax) {
      errors.attendance = "Enter a valid estimated attendance.";
    }
  }

  return errors;
}

export function SpeakingBookingForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<FieldErrors<SpeakingBookingValues>>({});
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const startedAt = useRef<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  function update<K extends keyof SpeakingBookingValues>(
    key: K,
    value: SpeakingBookingValues[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function resetForm() {
    setValues(empty);
    setErrors({});
    setHoneypot("");
    setSubmitted(false);
    startedAt.current = Date.now();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isAutomatedSubmission(honeypot, startedAt.current)) {
      setValues(empty);
      setHoneypot("");
      setSubmitted(true);
      return;
    }
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const first = fieldOrder.find((key) => nextErrors[key]);
    if (first) {
      const node = formRef.current?.querySelector<HTMLElement>(
        `[name="${first}"]`,
      );
      node?.focus();
      return;
    }
    setSubmitted(true);
    window.requestAnimationFrame(() => {
      successRef.current?.focus();
    });
  }

  if (submitted) {
    return (
      <div ref={successRef}>
        <SuccessState
          heading="Your booking request is ready on this page"
          body="Thank you for your interest in inviting Pastor Donald Mayes. This confirmation is the frontend experience only."
          notice="Booking requests are not stored or sent yet. When submission handling is connected, our team will follow up from this form."
          onReset={resetForm}
          resetLabel="Submit another request"
        />
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      className="relative grid gap-6"
      autoComplete="on"
    >
      <HoneypotField value={honeypot} onChange={setHoneypot} />
      <div className="grid gap-6 md:grid-cols-2">
        <FormField id="name" label="Name" required error={errors.name}>
          <input
            name="name"
            autoComplete="name"
            maxLength={fieldLimits.name}
            value={values.name}
            onChange={(event) => update("name", clip(event.target.value, fieldLimits.name))}
            className={controlClassName}
          />
        </FormField>
        <FormField
          id="organization"
          label="Organization"
          required
          error={errors.organization}
        >
          <input
            name="organization"
            autoComplete="organization"
            maxLength={fieldLimits.organization}
            value={values.organization}
            onChange={(event) =>
              update("organization", clip(event.target.value, fieldLimits.organization))
            }
            className={controlClassName}
          />
        </FormField>
        <FormField id="email" label="Email" required error={errors.email}>
          <input
            name="email"
            type="email"
            autoComplete="email"
            maxLength={fieldLimits.email}
            value={values.email}
            onChange={(event) => update("email", clip(event.target.value, fieldLimits.email))}
            className={controlClassName}
          />
        </FormField>
        <FormField id="phone" label="Phone" error={errors.phone}>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={fieldLimits.phone}
            value={values.phone}
            onChange={(event) => update("phone", clip(event.target.value, fieldLimits.phone))}
            className={controlClassName}
          />
        </FormField>
        <FormField
          id="eventName"
          label="Event name"
          required
          error={errors.eventName}
        >
          <input
            name="eventName"
            maxLength={fieldLimits.eventName}
            value={values.eventName}
            onChange={(event) =>
              update("eventName", clip(event.target.value, fieldLimits.eventName))
            }
            className={controlClassName}
          />
        </FormField>
        <FormField
          id="eventDate"
          label="Event date"
          required
          error={errors.eventDate}
        >
          <input
            name="eventDate"
            type="date"
            value={values.eventDate}
            onChange={(event) => update("eventDate", event.target.value)}
            className={controlClassName}
          />
        </FormField>
      </div>
      <FormField
        id="eventLocation"
        label="Event location"
        required
        error={errors.eventLocation}
      >
        <input
          name="eventLocation"
          maxLength={fieldLimits.eventLocation}
          value={values.eventLocation}
          onChange={(event) =>
            update("eventLocation", clip(event.target.value, fieldLimits.eventLocation))
          }
          className={controlClassName}
        />
      </FormField>
      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          id="eventType"
          label="Type of event"
          required
          error={errors.eventType}
        >
          <select
            name="eventType"
            value={values.eventType}
            onChange={(event) => {
              const next = event.target.value;
              if (!next || isAllowed(next, eventTypes)) {
                update("eventType", next);
              }
            }}
            className={controlClassName}
          >
            <option value="">Select a type</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </FormField>
        <FormField
          id="attendance"
          label="Estimated attendance"
          error={errors.attendance}
        >
          <input
            name="attendance"
            type="number"
            min={1}
            max={fieldLimits.attendanceMax}
            inputMode="numeric"
            value={values.attendance}
            onChange={(event) => update("attendance", event.target.value)}
            className={controlClassName}
          />
        </FormField>
      </div>
      <RadioGroup
        legend="In-person / virtual"
        name="format"
        value={values.format}
        required
        error={errors.format}
        options={formatOptions}
        onChange={(value) => {
          if (isAllowed(value, ["in-person", "virtual"])) {
            update("format", value as EventFormat);
          }
        }}
      />
      <FormField
        id="topic"
        label="Requested speaking topic"
        required
        error={errors.topic}
      >
        <select
          name="topic"
          value={values.topic}
          onChange={(event) => {
            const next = event.target.value;
            if (!next || isAllowed(next, speakingTopicOptions)) {
              update("topic", next);
            }
          }}
          className={controlClassName}
        >
          <option value="">Select a topic</option>
          {speakingTopicOptions.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </FormField>
      <FormField
        id="details"
        label="Tell us about your event"
        required
        error={errors.details}
      >
        <textarea
          name="details"
          rows={6}
          maxLength={fieldLimits.details}
          value={values.details}
          onChange={(event) =>
            update("details", clip(event.target.value, fieldLimits.details))
          }
          className={`${controlClassName} min-h-40 py-3`}
        />
      </FormField>
      <FormField
        id="referral"
        label="How did you hear about Pastor Mayes?"
        error={errors.referral}
      >
        <input
          name="referral"
          maxLength={fieldLimits.referral}
          value={values.referral}
          onChange={(event) =>
            update("referral", clip(event.target.value, fieldLimits.referral))
          }
          className={controlClassName}
        />
      </FormField>
      <p className="text-sm text-ink-soft">
        This form currently confirms on this page only. Requests are not stored
        or sent until submission handling is implemented.
      </p>
      <div>
        <Button type="submit" variant="navy" size="lg">
          {speaking.booking.submitLabel}
        </Button>
      </div>
    </form>
  );
}
