"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { followUpOptions, prayer } from "@/content/prayer";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/forms/Checkbox";
import { controlClassName, FormField } from "@/components/forms/FormField";
import { RadioGroup } from "@/components/forms/RadioGroup";
import { SuccessState } from "@/components/forms/SuccessState";
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
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const wantsFollowUp = values.followUp === "yes";

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
          notice={prayer.confirmation.notice}
          onReset={() => {
            setValues(empty);
            setErrors({});
            setSubmitted(false);
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
      className="grid gap-7"
    >
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
      <div>
        <Button type="submit" variant="primary" size="lg">
          {prayer.form.submitLabel}
        </Button>
      </div>
    </form>
  );
}
