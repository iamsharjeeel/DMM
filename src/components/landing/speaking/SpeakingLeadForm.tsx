"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { eventTypes, speakingTopicOptions } from "@/content/speaking";
import { speakingLanding, speakingLeadFormats } from "@/content/speaking-landing";
import { Button } from "@/components/ui/Button";
import { controlClassName, FormField } from "@/components/forms/FormField";
import { FormLegalFooter } from "@/components/forms/FormLegalFooter";
import { HoneypotField } from "@/components/forms/HoneypotField";
import { RadioGroup } from "@/components/forms/RadioGroup";
import { SmsConsentFields } from "@/components/forms/SmsConsentFields";
import { SuccessState } from "@/components/forms/SuccessState";
import {
  pushDataLayerEvent,
  speakingLandingEvents,
} from "@/lib/analytics/data-layer";
import { readLandingAttribution } from "@/lib/forms/attribution";
import { submitNativeForm } from "@/lib/forms/submit-client";
import { FORM_GENERIC_ERROR } from "@/lib/forms/types";
import { fieldMax, isValidEmail, requiredText, tooLong } from "@/lib/validation";
import type { FieldErrors, SpeakingLeadValues } from "@/types/forms";

const empty: SpeakingLeadValues = {
  name: "",
  organization: "",
  email: "",
  eventType: "",
  phone: "",
  eventTimeframe: "",
  eventLocation: "",
  format: "",
  topic: "",
  details: "",
  smsMarketingConsent: false,
  smsNonMarketingConsent: false,
};

const fieldOrder: Array<keyof SpeakingLeadValues> = [
  "name",
  "organization",
  "email",
  "eventType",
  "phone",
  "eventTimeframe",
  "eventLocation",
  "format",
  "topic",
  "details",
];

let formStartPushed = false;

function markFormStart() {
  if (formStartPushed) {
    return;
  }
  formStartPushed = true;
  pushDataLayerEvent(speakingLandingEvents.formStart);
}

function validate(values: SpeakingLeadValues): FieldErrors<SpeakingLeadValues> {
  const errors: FieldErrors<SpeakingLeadValues> = {};
  const name = requiredText(values.name, "Name");
  const organization = requiredText(values.organization, "Organization");
  const eventType = requiredText(values.eventType, "Type of event");

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
  const timeframeLength = tooLong(
    values.eventTimeframe,
    fieldMax.eventTimeframe,
    "Event date or timeframe",
  );
  if (timeframeLength) errors.eventTimeframe = timeframeLength;
  const locationLength = tooLong(
    values.eventLocation,
    fieldMax.eventLocation,
    "Event location",
  );
  if (locationLength) errors.eventLocation = locationLength;
  const detailsLength = tooLong(values.details, fieldMax.details, "Notes");
  if (detailsLength) errors.details = detailsLength;
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (eventType) errors.eventType = eventType;

  return errors;
}

export function SpeakingLeadForm() {
  const copy = speakingLanding.form;
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<FieldErrors<SpeakingLeadValues>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const startedAtRef = useRef<number | null>(null);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  function update<K extends keyof SpeakingLeadValues>(
    key: K,
    value: SpeakingLeadValues[K],
  ) {
    markFormStart();
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
    const result = await submitNativeForm(speakingLanding.formId, {
      name: values.name,
      organization: values.organization,
      email: values.email,
      eventType: values.eventType,
      phone: values.phone,
      eventTimeframe: values.eventTimeframe,
      eventLocation: values.eventLocation,
      format: values.format,
      topic: values.topic,
      details: values.details,
      smsMarketingConsent: values.smsMarketingConsent,
      smsNonMarketingConsent: values.smsNonMarketingConsent,
      website,
      startedAt: startedAtRef.current ?? undefined,
      ...readLandingAttribution(),
    });
    setSubmitting(false);
    if (result.ok) {
      pushDataLayerEvent(speakingLandingEvents.submitSuccess);
      setSubmitted(true);
      window.requestAnimationFrame(() => {
        successRef.current?.focus();
      });
      return;
    }
    pushDataLayerEvent(speakingLandingEvents.submitError);
    setSubmitError(FORM_GENERIC_ERROR);
  }

  if (submitted) {
    return (
      <div ref={successRef}>
        <SuccessState
          heading={copy.confirmation.heading}
          body={copy.confirmation.body}
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
      id={speakingLanding.formId}
      name={speakingLanding.formId}
      noValidate
      onSubmit={handleSubmit}
      onFocusCapture={(event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
          return;
        }
        if (!["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName)) {
          return;
        }
        if (target.getAttribute("name") === "website") {
          return;
        }
        markFormStart();
      }}
      aria-busy={submitting}
      className="relative grid gap-5"
    >
      <div>
        <h2 className="font-display text-[1.65rem] leading-tight tracking-tight">
          {copy.heading}
        </h2>
        <p className="mt-2 text-sm text-ink-soft">{copy.support}</p>
      </div>
      <HoneypotField />
      <FormField id="lead-name" label="Name" required error={errors.name}>
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
        id="lead-organization"
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
      <FormField id="lead-email" label="Email" required error={errors.email}>
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
      <FormField
        id="lead-eventType"
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
      <FormField id="lead-phone" label="Phone" error={errors.phone}>
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
      <SmsConsentFields
        variant="speaking"
        marketing={values.smsMarketingConsent}
        nonMarketing={values.smsNonMarketingConsent}
        onMarketingChange={(checked) => update("smsMarketingConsent", checked)}
        onNonMarketingChange={(checked) =>
          update("smsNonMarketingConsent", checked)
        }
      />
      <FormField
        id="lead-eventTimeframe"
        label="Event date or timeframe"
        error={errors.eventTimeframe}
      >
        <input
          name="eventTimeframe"
          maxLength={fieldMax.eventTimeframe}
          placeholder={copy.timeframePlaceholder}
          value={values.eventTimeframe}
          onChange={(event) => update("eventTimeframe", event.target.value)}
          className={controlClassName}
        />
      </FormField>
      <FormField
        id="lead-eventLocation"
        label="Event location"
        error={errors.eventLocation}
      >
        <input
          name="eventLocation"
          maxLength={fieldMax.eventLocation}
          placeholder={copy.locationPlaceholder}
          value={values.eventLocation}
          onChange={(event) => update("eventLocation", event.target.value)}
          className={controlClassName}
        />
      </FormField>
      <RadioGroup
        legend="In-person or virtual"
        name="format"
        value={values.format}
        error={errors.format}
        options={speakingLeadFormats.map((format) => ({
          value: format,
          label: format,
        }))}
        onChange={(value) =>
          update("format", value as SpeakingLeadValues["format"])
        }
      />
      <FormField
        id="lead-topic"
        label="Topic of interest"
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
        id="lead-details"
        label={copy.notesLabel}
        error={errors.details}
      >
        <textarea
          name="details"
          rows={4}
          maxLength={fieldMax.details}
          value={values.details}
          onChange={(event) => update("details", event.target.value)}
          className={`${controlClassName} min-h-28 py-3`}
        />
      </FormField>
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
          {submitting ? "Submitting…" : speakingLanding.submitLabel}
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
