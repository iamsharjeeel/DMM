"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { followUpOptions, prayer } from "@/content/prayer";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/forms/Checkbox";
import { HoneypotField } from "@/components/forms/HoneypotField";
import { controlClassName, FormField } from "@/components/forms/FormField";
import { RadioGroup } from "@/components/forms/RadioGroup";
import { SuccessState } from "@/components/forms/SuccessState";
import {
  clip,
  fieldLimits,
  isAllowed,
  isAutomatedSubmission,
  isValidEmail,
  isValidPhone,
  requiredText,
  tooLong,
} from "@/lib/validation";
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
};

const followUpValues = ["yes", "no"] as const;
const contactMethodValues = ["email", "phone", "text"] as const;

function validate(values: PrayerRequestValues): FieldErrors<PrayerRequestValues> {
  const errors: FieldErrors<PrayerRequestValues> = {};
  const request = requiredText(values.request, "Your prayer request");
  if (request) errors.request = request;
  else {
    const long = tooLong(values.request, fieldLimits.request, "Your prayer request");
    if (long) errors.request = long;
  }

  if (values.name) {
    const long = tooLong(values.name, fieldLimits.name, "Your name");
    if (long) errors.name = long;
  }

  if (values.email && !isValidEmail(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (values.phone && !isValidPhone(values.phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!isAllowed(values.followUp, followUpValues)) {
    errors.followUp = "Please choose whether you would like follow-up.";
  }

  if (values.followUp === "yes") {
    if (!isAllowed(values.contactMethod, contactMethodValues)) {
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
      } else if (!isValidPhone(values.phone)) {
        errors.phone = "Enter a valid phone number.";
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
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const startedAt = useRef<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const wantsFollowUp = values.followUp === "yes";

  useEffect(() => {
    startedAt.current = Date.now();
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

  function resetForm() {
    setValues(empty);
    setErrors({});
    setHoneypot("");
    setSubmitted(false);
    startedAt.current = Date.now();
  }

  function handleFollowUp(value: string) {
    if (!isAllowed(value, followUpValues)) {
      return;
    }
    const followUp = value as FollowUpChoice;
    setValues((current) => ({
      ...current,
      followUp,
      contactMethod: followUp === "yes" ? current.contactMethod : "",
      consent: followUp === "yes" ? current.consent : false,
    }));
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
    const first = focusOrder.find((key) => nextErrors[key]);
    if (first) {
      const node = formRef.current?.querySelector<HTMLElement>(
        `[name="${first}"]`,
      );
      node?.focus();
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div ref={successRef} tabIndex={-1}>
        <SuccessState
          heading={prayer.confirmation.heading}
          body={prayer.confirmation.body}
          motto={prayer.confirmation.motto}
          notice={prayer.frontendNotice}
          onReset={resetForm}
          resetLabel="Share another request"
        />
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      className="relative grid gap-7"
    >
      <HoneypotField value={honeypot} onChange={setHoneypot} />
      <FormField id="name" label={prayer.form.name.label} error={errors.name}>
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
          maxLength={fieldLimits.email}
          value={values.email}
          onChange={(event) => update("email", clip(event.target.value, fieldLimits.email))}
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
          maxLength={fieldLimits.phone}
          value={values.phone}
          onChange={(event) => update("phone", clip(event.target.value, fieldLimits.phone))}
          className={controlClassName}
        />
      </FormField>
      <FormField
        id="request"
        label={prayer.form.request.label}
        required
        error={errors.request}
      >
        <textarea
          name="request"
          rows={8}
          maxLength={fieldLimits.request}
          value={values.request}
          onChange={(event) =>
            update("request", clip(event.target.value, fieldLimits.request))
          }
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
            onChange={(value) => {
              if (isAllowed(value, contactMethodValues)) {
                update("contactMethod", value as ContactMethod);
              }
            }}
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
      <p className="text-sm text-ink-soft">{prayer.frontendNotice}</p>
      <div>
        <Button type="submit" variant="primary" size="lg">
          {prayer.form.submitLabel}
        </Button>
      </div>
    </form>
  );
}
