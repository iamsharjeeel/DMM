# Native form submissions

Browser JSON POST → `POST /api/forms/[form]` → server validation → HTTPS JSON POST to HighLevel.

The browser never calls the HighLevel webhook. `/booking` calendar submissions are not part of this system.

## Required server env

Set this on Vercel Production and Preview. Never prefix with `NEXT_PUBLIC_`. Do not commit the production URL.

```text
GHL_FORM_WEBHOOK_URL=
```

Do not set `GHL_FORM_WEBHOOK_ALLOW_LOCAL` on Vercel. It exists only so local HTTP mocks can be used during development tests.

## Accepted form names

Allowlisted in `src/lib/forms/types.ts`:

- `prayer-request`
- `speaking-booking`
- `speaking-meta-lead`

Unknown `[form]` values return 404.

Outbound header, derived server-side:

- `source: prayer-request`
- `source: speaking-booking`
- `source: speaking-meta-lead`

Server-derived SMS consent metadata is also appended before forwarding:

- `smsConsentCapturedAt` (ISO timestamp)
- `smsConsentSource` (`website-prayer-request`, `website-speaking-request`, or `website-speaking-meta-lead`)
- `smsConsentVersion` (`2026-08-26`)

Client-supplied timestamps or source strings are not authoritative.

## SMS consent (A2P)

Prayer and speaking forms collect two independent optional checkboxes:

- `smsMarketingConsent`
- `smsNonMarketingConsent`

Both default to `false`. Missing values are stored as `false`. Providing a phone number, submitting a form, requesting follow-up, choosing Text, or checking general contact permission does not constitute SMS consent.

The paid speaking landing form (`speaking-meta-lead`) uses the same two SMS fields. It also forwards allowlisted attribution when present: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `fbclid`, and `landingPath` (`/invite-pastor-mayes`). Unknown query keys are dropped.

HighLevel workflows must only send:

- marketing SMS when `smsMarketingConsent === true`
- non-marketing SMS when `smsNonMarketingConsent === true`

Do not create messaging workflows in this repository.

## Privacy / logging

Do not log prayer text, names, emails, phones, event details, or payloads. Safe logs may include request ID, form name, success/failure, HTTP status, and timestamp.

Prayer text is not written to localStorage, URLs, or the console. Do not log PII.

## Rate limiting

Application-layer limiter keyed by form + client IP:

- 5 submissions / 10 minutes
- 12 submissions / hour

This is an in-memory fallback and is not globally reliable on Vercel serverless. Enable WAF / platform rate limiting in Vercel as well. IPs are not forwarded to HighLevel.

## Add a future native form

1. Add the canonical name to `allowedForms`.
2. Add a strict Zod schema and forward payload in `src/lib/forms/schemas.ts`.
3. Point the form component at `submitNativeForm("<name>", payload)`.
4. Keep the honeypot and startedAt fields out of the HighLevel payload.
