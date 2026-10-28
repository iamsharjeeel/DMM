# Handover

## Current build state

Phase 1 informational site with the client-approved **DMM Red + Blue** visual system applied. Includes the Loving Everyone Always audio archive at `/episodes`. HighLevel external tracking is installed for page views. Google Tag Manager container `GTM-WQ272CGD` is installed globally. Native prayer and speaking forms POST to `/api/forms/[form]` and are forwarded server-to-server to HighLevel. Canonical search identity is `https://donaldmayesministries.com`. `/invite-pastor-mayes` is an isolated premium editorial speaking landing with a simplified inquiry form.

## Completed pages

- `/videos` dedicated video library page; awaiting approved video URLs

- `/` Home / About
- `/stories/[slug]` Seven source testimonies
- `/episodes` Audio archive
- `/speaking`
- `/prayer-requests`
- `/booking` direct-link prayer-call calendar
- `/privacy`
- `/terms`
- `/sms-terms`
- `/invite-pastor-mayes` paid speaking landing (`noindex, follow`; not in sitemap)
- App `not-found`

## Implemented functionality

- Sticky header with Home, Listen, Speaking, Prayer Requests, and Book Pastor Mayes CTA; active nav state
- Accessible mobile menu with focus trap, rendered in a portal so it covers the viewport
- Footer with motto, nav, booking CTA, copyright, legal links, email, and phone
- Speaking booking form: validation, required/optional states, optional SMS consent, success state after confirmed HighLevel delivery (`speaking-booking`)
- Paid speaking landing at `/inv¶»§q«^