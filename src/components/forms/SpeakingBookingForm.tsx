"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { eventTypes, speaking, speakingTopicOptions } from "@/content/speaking";
import { Button } from "@/components/ui/Button";
import { controlClassName, FormField } from "@/components/forms/FormField";
import { FormLegalFooter } from "@/components/forms/FormLegalFooter";
import { HoneypotField } from "@/components/forms/HoneypotField";
import { RadioGroup } from "@/components/forms/RadioGroup";
import { SmsConsentFields } from "@/components/forms/SmsConsentFields";
import { SuccessState } from "@/components/forms/SuccessState";
import { submitNativeForm } from "@/lib/forms/submit-client";
import { FORM_GENERIC_ERROR } from "@/lib/forms/types";
import { isValidEmail, requiredText, tooLong, fieldMax } from "@/lib/validation";
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
  smsMarketingConsent: false,
  smsNonMarketingConsent: false,
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
  const nameLength = tooLong(values.name, fieldMax.name, "Name");
  if (nameLength) errors.name = nameLength;
  const organizationLength = tooLong(
    values.organization,
    fieldMax.organization,
    "Organization",
  );
  if (organizationLength) errors.organization = organizationLength;
  const emailLength = tooLong(values.email, fieldMax.email, "Email");
  if (emailLength) errors.email = emailLength;
  const phoneLength = tooLong(values.phone, fieldMax.phone, "Phone");
  if (phoneLength) errors.phone = phoneLength;
  const eventNameLength = tooLong(values.eventName, fieldMax.eventName, "Event name");
  if (eventNameLength) errors.eventName = eventNameLength;
  const eventLocationLength = tooLong(
    values.eventLocation,
    fieldMax.eventLocation,
    "Event location",
  );
  if (eventLocationLength) errors.eventLocation = eventLocationLength;
  const detailsLength = tooLong(values.details, fieldMax.details, "Event details");
  if (detailsLength) errors.details = detailsLength;
  const referralLength = tooLong(values.referral, fieldMax.referral, "Referral");
  if (referralLength) errors.referral = referralLength;
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
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const startedAtRef = useRef<number | null>(null);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  function update<K extends keyof SpeakingBookingValues>(
    key: K,
    value: SpeakingBookingValues[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) {
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
    const website =
      formRef.current?.querySelector<HTMLInputElement>('[name="website"]')
        ?.value ?? "";
    setSubmitting(true);
    setSubmitError(null);
    const result = await submitNativeForm("speaking-booking", {
      name: values.name,
      organization: values.organization,
      email: values.email,
      phone: values.phone,
      eventName: values.eventName,
      eventDate: values.eventDate,
      eventLocation: values.eventLocation,
      eventType: values.eventType,
      attendance: values.attendance,
      format: values.format,
      topic: values.topic,
      details: values.details,
      referral: values.referral,
      smsMarketingConsent: values.smsMarketingConsent,
      smsNonMarketingConsent: values.smsNonMarketingConsent,
      website,
      startedAt: startedAtRef.current ?? undefined,
    });
    setSubmitting(false);
    if (result.ok) {
      setSubmitted(true);
      window.requestAnimationFrame(() => {
        successRef.current?.focus();
      });
      return;
    }
    setSubmitError(FORM_GENERIC_ERROR);
  }

  if (submitted) {
    return (
      <div ref={successRef}>
        <SuccessState
          heading={speaking.booking.confirmation.heading}
          body={speaking.booking.confirmation.body}
          notice={speaking.booking.confirmation.notice}
          onReset={() => {
            setValues(empty);
            setErrors({});
            setSubmitted(false);
            setSubmitError(null);
            startedAtRef.current = Date.now();
          }}
          resetLabel="Submit another request"
        />
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      id={speaking.booking.formId}
      name={speaking.booking.formId}
      noValidate
      onSubmit={handleSubmit}
      aria-busy={submitting}
      className="relative grid gap-6"
    >
      <HoneypotField />
      <div className="grid gap-6 md:grid-cols-2">
        <FormField id="name" label="Name" required error={errors.name}>
          <input
            name="name"
            autoComplete="name"
            maxLength={fieldMax.name}
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
            maxLength={fieldMax.organization}
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
            maxLength={fieldMax.email}
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
            maxLength={fieldMax.phone}
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            className={controlClassName}
          />
        </FormField>
      </div>
      <SmsConsentFields
        variant="speaking"
        marketing={values.smsMarketingConsent}
        nonMarketing={values.smsNonMarketingConsent}
        onMarketingChange={(checked) => update("smsMarketingConsent", checked)}
        onNonMarketingChange={(checked) =>
          update("smsNonMarketingConsent", checked)
        }
      />
      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          id="eventName"
          label="Event name"
          required
          error={errors.eventName}
        >
          <input
            name="eventName"
            maxLength={fieldMax.eventName}
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
          maxLength={fieldMax.eventLocation}
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
            max={9999999}
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
          maxLength={fieldMax.details}
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
          maxLength={fieldMax.referral}
          value={values.referral}
          onChange={(event) => update("referral", event.target.value)}
          className={controlClassName}
        />
      </FormField>
      <p className="text-xs leading-relaxed text-ink-soft">
        {speaking.booking.notice}
      </p>
      <FormLegalFooter />
      {submitError ? (
        <p role="alert" className="text-sm text-error">
          {submitError}
        </p>
      ) : null}
      <div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting ? "Submitting…" : speaking.booking.submitLabel}
        </Button>
        {submitting ? (
          <span role="status" className="sr-only">
            Submitting…
          </span>
        ) : null}
      </div>
    </form>
  );
}
