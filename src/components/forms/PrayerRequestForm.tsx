"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { followUpOptions, prayer } from "@/content/prayer";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/forms/Checkbox";
import { controlClassName, FormField } from "@/components/forms/FormField";
import { FormLegalFooter } from "@/components/forms/FormLegalFooter";
import { HoneypotField } from "@/components/forms/HoneypotField";
import { RadioGroup } from "@/components/forms/RadioGroup";
import { SmsConsentFields } from "@/components/forms/SmsConsentFields";
import { SuccessState } from "@/components/forms/SuccessState";
import { submitNativeForm } from "@/lib/forms/submit-client";
import { FORM_GENERIC_ERROR } from "@/lib/forms/types";
import { isValidEmail, requiredText, tooLong, fieldMax } from "@/lib/validation";
import type {
  ContactMethod,
  FieldErrors,
  FollowUpChoice,
  PrayerRequestValues,
} from "@/types/forms";

const empty: PrayerRequestValues = {
  name: "",
  email: "",
  phone: "",
  request: "",
  urgent: false,
  followUp: "",
  contactMethod: "",
  consent: false,
  smsMarketingConsent: false,
  smsNonMarketingConsent: false,
};

function validate(values: PrayerRequestValues): FieldErrors<PrayerRequestValues> {
  const errors: FieldErrors<PrayerRequestValues> = {};
  const request = requiredText(values.request, "Your prayer request");
  if (request) errors.request = request;
  const requestLength = tooLong(values.request, fieldMax.request, "Your prayer request");
  if (requestLength) errors.request = requestLength;

  const nameLength = tooLong(values.name, fieldMax.name, "Name");
  if (nameLength) errors.name = nameLength;
  const emailLength = tooLong(values.email, fieldMax.email, "Email");
  if (emailLength) errors.email = emailLength;
  const phoneLength = tooLong(values.phone, fieldMax.phone, "Phone");
  if (phoneLength) errors.phone = phoneLength;

  if (values.email && !isValidEmail(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.followUp) {
    errors.followUp = "Please choose whether you would like follow-up.";
  }

  if (values.followUp === "yes") {
    if (!values.contactMethod) {
      errors.contactMethod = "Choose how you would prefer we contact you.";
    }
    if (!values.consent) {
      errors.consent = "Permission to contact you is required for follow-up.";
    }
    if (values.contactMethod === "email") {
      if (!values.email.trim()) {
        errors.email = "Email is required for email follow-up.";
      } else if (!isValidEmail(values.email)) {
        errors.email = "Enter a valid email address.";
      }
    }
    if (values.contactMethod === "phone" || values.contactMethod === "text") {
      if (!values.phone.trim()) {
        errors.phone = "Phone number is required for phone or text follow-up.";
      }
    }
  }

  return errors;
}

const focusOrder: Array<keyof PrayerRequestValues> = [
  "name",
  "email",
  "phone",
  "request",
  "urgent",
  "followUp",
  "contactMethod",
  "consent",
];

export function PrayerRequestForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<FieldErrors<PrayerRequestValues>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const startedAtRef = useRef<number | null>(null);
  const wantsFollowUp = values.followUp === "yes";

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (submitted) {
      successRef.current?.focus();
    }
  }, [submitted]);

  function update<K extends keyof PrayerRequestValues>(
    key: K,
    value: PrayerRequestValues[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function handleFollowUp(value: string) {
    const followUp = value as FollowUpChoice;
    setValues((current) => ({
      ...current,
      followUp,
      contactMethod: followUp === "yes" ? current.contactMethod : "",
      consent: followUp === "yes" ? current.consent : false,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) {
      return;
    }
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const first = focusOrder.find((key) => nextErrors[key]);
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
    const result = await submitNativeForm("prayer-request", {
      name: values.name,
      email: values.email,
      phone: values.phone,
      request: values.request,
      urgent: values.urgent,
      followUp: values.followUp,
      contactMethod: values.followUp === "yes" ? values.contactMethod : "",
      consent: values.followUp === "yes" ? values.consent : false,
      smsMarketingConsent: values.smsMarketingConsent,
      smsNonMarketingConsent: values.smsNonMarketingConsent,
      website,
      startedAt: startedAtRef.current ?? undefined,
    });
    setSubmitting(false);
    if (result.ok) {
      setSubmitted(true);
      return;
    }
    setSubmitError(FORM_GENERIC_ERROR);
  }

  if (submitted) {
    return (
      <div ref={successRef} tabIndex={-1}>
        <SuccessState
          heading={prayer.confirmation.heading}
          body={prayer.confirmation.body}
          motto={prayer.confirmation.motto}
          notice={prayer.confirmation.notice}
          onReset={() => {
            setValues(empty);
            setErrors({});
            setSubmitted(false);
            setSubmitError(null);
            startedAtRef.current = Date.now();
          }}
          resetLabel="Share another request"
        />
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      id={prayer.formId}
      name={prayer.formId}
      noValidate
      onSubmit={handleSubmit}
      aria-busy={submitting}
      className="relative grid gap-7"
    >
      <HoneypotField />
      <FormField id="name" label={prayer.form.name.label} error={errors.name}>
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
        id="email"
        label={prayer.form.email.label}
        hint={prayer.form.email.optionalHint}
        required={wantsFollowUp && values.contactMethod === "email"}
        error={errors.email}
      >
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
        id="phone"
        label={prayer.form.phone.label}
        hint={prayer.form.phone.optionalHint}
        required={
          wantsFollowUp &&
          (values.contactMethod === "phone" || values.contactMethod === "text")
        }
        error={errors.phone}
      >
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
        variant="prayer"
        marketing={values.smsMarketingConsent}
        nonMarketing={values.smsNonMarketingConsent}
        onMarketingChange={(checked) => update("smsMarketingConsent", checked)}
        onNonMarketingChange={(checked) =>
          update("smsNonMarketingConsent", checked)
        }
      />
      <FormField
        id="request"
        label={prayer.form.request.label}
        required
        error={errors.request}
      >
        <textarea
          name="request"
          rows={8}
          maxLength={fieldMax.request}
          value={values.request}
          onChange={(event) => update("request", event.target.value)}
          className={`${controlClassName} min-h-48 py-3`}
        />
      </FormField>
      <fieldset>
        <legend className="text-sm font-medium text-ink">
          {prayer.form.urgent.label}
        </legend>
        <div className="mt-3">
          <Checkbox
            id="urgent"
            name="urgent"
            checked={values.urgent}
            onChange={(checked) => update("urgent", checked)}
          >
            {prayer.form.urgent.checkbox}
          </Checkbox>
        </div>
      </fieldset>
      <RadioGroup
        legend={prayer.form.followUp.label}
        name="followUp"
        value={values.followUp}
        required
        error={errors.followUp}
        options={followUpOptions}
        onChange={handleFollowUp}
      />
      {wantsFollowUp ? (
        <div
          className="space-y-6 border-t border-rule pt-6"
          aria-live="polite"
        >
          <RadioGroup
            legend={prayer.form.contactMethod.label}
            name="contactMethod"
            value={values.contactMethod}
            required
            error={errors.contactMethod}
            options={prayer.form.contactMethod.options}
            onChange={(value) => update("contactMethod", value as ContactMethod)}
          />
          <Checkbox
            id="consent"
            name="consent"
            checked={values.consent}
            error={errors.consent}
            onChange={(checked) => update("consent", checked)}
          >
            {prayer.form.consent.label}
          </Checkbox>
        </div>
      ) : null}
      <p className="text-xs leading-relaxed text-ink-soft">{prayer.frontendNotice}</p>
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
          {submitting ? "Submitting…" : prayer.form.submitLabel}
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
