"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { eventTypes } from "@/content/speaking";
import { speakingLanding } from "@/content/speaking-landing";
import { Button } from "@/components/ui/Button";
import { controlClassName, FormField } from "@/components/forms/FormField";
import { FormLegalFooter } from "@/components/forms/FormLegalFooter";
import { HoneypotField } from "@/components/forms/HoneypotField";
import { SuccessState } from "@/components/forms/SuccessState";
import {
  pushDataLayerEvent,
  speakingLandingEvents,
} from "@/lib/analytics/data-layer";
import { readLandingAttribution } from "@/lib/forms/attribution";
import { submitNativeForm } from "@/lib/forms/submit-client";
import { FORM_GENERIC_ERROR } from "@/lib/forms/types";
import { fieldMax, isValidEmail, requiredText, tooLong } from "@/lib/validation";
import { cn } from "@/lib/cn";
import type { FieldErrors, SpeakingLeadValues } from "@/types/forms";

const empty: SpeakingLeadValues = {
  name: "",
  organization: "",
  email: "",
  eventType: "",
  phone: "",
  details: "",
};

const fieldOrder: Array<keyof SpeakingLeadValues> = [
  "name",
  "organization",
  "email",
  "phone",
  "eventType",
  "details",
];

const fieldClassName = cn(controlClassName, "lp-form-control");

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
      details: values.details,
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
      <div ref={successRef} tabIndex={-1}>
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
      <HoneypotField />
      <FormField
        id="lead-name"
        label={copy.nameLabel}
        required
        error={errors.name}
      >
        <input
          name="name"
          autoComplete="name"
          maxLength={fieldMax.name}
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          className={fieldClassName}
        />
      </FormField>
      <FormField
        id="lead-organization"
        label={copy.organizationLabel}
        required
        error={errors.organization}
      >
        <input
          name="organization"
          autoComplete="organization"
          maxLength={fieldMax.organization}
          value={values.organization}
          onChange={(event) => update("organization", event.target.value)}
          className={fieldClassName}
        />
      </FormField>
      <FormField
        id="lead-email"
        label={copy.emailLabel}
        required
        error={errors.email}
      >
        <input
          name="email"
          type="email"
          autoComplete="email"
          maxLength={fieldMax.email}
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          className={fieldClassName}
        />
      </FormField>
      <FormField id="lead-phone" label={copy.phoneLabel} error={errors.phone}>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={fieldMax.phone}
          value={values.phone}
          onChange={(event) => update("phone", event.target.value)}
          className={fieldClassName}
        />
      </FormField>
      <FormField
        id="lead-eventType"
        label={copy.eventTypeLabel}
        required
        error={errors.eventType}
      >
        <select
          name="eventType"
          value={values.eventType}
          onChange={(event) => update("eventType", event.target.value)}
          className={fieldClassName}
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
        id="lead-details"
        label={copy.detailsLabel}
        hint={copy.detailsHint}
        error={errors.details}
      >
        <textarea
          name="details"
          rows={7}
          maxLength={fieldMax.details}
          value={values.details}
          onChange={(event) => update("details", event.target.value)}
          className={cn(fieldClassName, "min-h-40 py-3")}
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
