# Content

## Client-approved / source content

Kept in `src/content/` and `src/config/site.ts`.

- Brand: Donald Mayes Ministries
- Motto: Loving Everyone Always.
- Mission, vision, FCL values, audience wording
- Home hero, Meet Pastor Mayes biography paragraphs, experience list and intro sentence
- Mission and Vision copy; optional `scripture` fields stay empty until Pastor Mayes provides references
- Stories of reconciliation, restoration, and transformation in `src/content/stories.ts`
- Speaking headline, body, five topics, audience list, booking intro, confirmation, and the temporary-form notice
- Paid speaking landing copy in `src/content/speaking-landing.ts`
- Prayer headline, supporting lines, form labels, confirmation copy, and the HighLevel capture notice
- Prayer-call booking heading and supporting copy
- Footer copyright: © 2026 Donald Mayes Ministries LLC. All Rights Reserved.
- Confirmed contact: info@donaldmayesministries.com
- General / SMS / compliance phone: +1 773-787-5028 (`tel:+17737875028`)
- Bookings / speaking phone: (602) 228-2393 (`tel:+16022282393`)
- Loving Everyone Always archive years follow the RSS catalogue (2020—2022 as of the 2026-09-10 RSS refresh; latest episode 2022-04-18)
- Listen page framing copy in `src/content/episodes.ts`
- Episode titles, dates, durations, descriptions, and audio URLs from the Loving Everyone Always RSS catalogue

Do not paraphrase these into generic ministry marketing. Do not rewrite RSS episode titles or descriptions.

## Temporary placeholders

- Generated OG/Twitter images using motto/headlines and the official DMM logo
- Form “To be discussed” topic option (operational, not a ministry topic)

## Client inputs still required

- Facebook / Instagram / YouTube URLs
- Testimonials for the speaking page (do not invent)
- Mission and Vision foundational Scripture (do not invent)
- Authentic ministry photos/videos and permission to publish them
- Confirm what 2020 and 2022 represent versus the official beginning of Donald Mayes Ministries
- Production DNS for `donaldmayesministries.com` in Vercel (canonical origin is already locked in code)
- Legal review
- HighLevel speaking calendar to replace the temporary booking form

## Locked production assets

- Official DMM logo: `public/brand/dmm-logo.png`
- Home hero: `public/images/pastor/donald-mayes-speaking.png`
- Meet Pastor portrait: `public/images/pastor/donald-mayes-headshot.jpg`

## Hidden until supplied

`Testimonials` on `/speaking` reads `speaking.testimonials.items`. Empty array → section not shown.

Home stories in `src/content/stories.ts` are source testimonies. Do not invent quotes, outcomes, or photographs. Do not rewrite them into marketing language.
