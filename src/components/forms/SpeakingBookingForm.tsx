"use client";

import { useRef, useState, type FormEvent } from "react";
import { eventTypes, speaking, speakingTopicOptions } from "@/content/speaking";
import { Button } from "@/components/ui/Button";
import { controlClassName, FormField } from "@/components/forms/FormField";
import { RadioGroup } from "@/components/forms/RadioGroup";
import { SuccessState } from "@/components/forms/SuccessState";
import { isValidEmail, requiredText } from "@/lib/validation";
import type { FieldErrors, SpeakingBookingValues } from "@/types/forms";

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
  const eventDate = requiredText(values.eventDate, "Event date");
  const eventLocation = requiredText(values.eventLocation, "Event location");
  const eventType = requiredText(values.eventType, "Type of event");
  const topic = requiredText(values.topic, "Requested speaking topic");
  const details = requiredText(values.details, "Tell us about your event");

  if (name) errors.name = name;
  if (organization) errors.organization = organization;
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (eventName) errors.eventName = eventName;
  if (eventDate) errors.eventDate = eventDate;
  if (eventLocation) errors.eventLocation = eventLocation;
  if (eventType) errors.eventType = eventType;
  if (!values.format) errors.format = "Select in-person or virtual.";
  if (topic) errors.topic = topic;
  if (details) errors.details = details;
  if (values.attendance && Number(values.attendance) < 1) {
    errors.attendance = "Enter a valid estimated attendance.";
  }

  return errors;
}

export function SpeakingBookingForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<FieldErrors<SpeakingBookingValues>>({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  function update<K extends keyof SpeakingBookingValues>(
    key: K,
    value: SpeakingBookingValues[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
          onReset={() => {
            setValues(empty);
            setErrors({});
            setSubmitted(false);
          }}
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
      className="grid gap-6"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <FormField id="name" label="Name" required error={errors.name}>
          <input
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
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
            value={values.organization}
            onChange={(event) => update("organization", event.target.value)}
            className={controlClassName}
          />
        </FormField>
        <FormField id="email" label="Email" required error={errors.email}>
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            className={controlClassName}
          />
        </FormField>
        <FormField id="phone" label="Phone" error={errors.phone}>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
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
            value={values.eventName}
            onChange={(event) => update("eventName", event.target.value)}
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
          value={values.eventLocation}
          onChange={(event) => update("eventLocation", event.target.value)}
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
            onChange={(event) => update("eventType", event.target.value)}
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
        options={[
          { value: "in-person", label: "In-person" },
          { value: "virtual", label: "Virtual" },
        ]}
        onChange={(value) =>
          update("format", value as SpeakingBookingValues["format"])
        }
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
          onChange={(event) => update("topic", event.target.value)}
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
          value={values.details}
          onChange={(event) => update("details", event.target.value)}
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
          value={values.referral}
          onChange={(event) => update("referral", event.target.value)}
          className={controlClassName}
        />
      </FormField>
      <p className="text-xs leading-relaxed text-ink-soft">
        This form currently confirms on this page only. Requests are not stored
        or sent until submission handling is implemented.
      </p>
      <div>
        <Button type="submit" variant="primary" size="lg">
          {speaking.booking.submitLabel}
        </Button>
      </div>
    </form>
  );
}
