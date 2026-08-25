# Content

## Client-approved / source content

Kept in `src/content/` and `src/config/site.ts`.

- Brand: Donald Mayes Ministries
- Motto: Loving Everyone Always.
- Mission, vision, FCL values, audience wording
- Home hero, Meet Pastor Mayes biography paragraphs, experience list
- Speaking headline, body, five topics, audience list, booking intro, confirmation, and the temporary-form notice
- Prayer headline, supporting lines, form labels, confirmation copy, and the HighLevel capture notice
- Prayer-call booking heading and supporting copy
- Footer copyright: © 2026 Donald Mayes Ministries, LLC. All Rights Reserved.
- Listen page framing copy in `src/content/episodes.ts`
- Episode titles, dates, durations, descriptions, and audio URLs from the Loving Everyone Always RSS catalogue

Do not paraphrase these into generic ministry marketing. Do not rewrite RSS episode titles or descriptions.

## Temporary placeholders

- Generated OG images using motto/headlines
- Suggested domain fallback `https://donaldmayesministries.com` for metadata when env is unset
- Form “To be discussed” topic option (operational, not a ministry topic)
- Connect copy explaining that email/social will appear when confirmed
- Provisional Privacy and Terms language

## Client inputs still required

- Confirmed public email
- Facebook / Instagram / YouTube URLs
- Testimonials (do not invent)
- Production domain if different
- Legal review
- HighLevel speaking calendar to replace the temporary booking form

## Locked production assets

- Official DMM logo: `public/brand/dmm-logo.png`
- Home hero: `public/images/pastor/donald-mayes-speaking.png`
- Meet Pastor portrait: `public/images/pastor/donald-mayes-headshot.jpg`

## Hidden until supplied

`Testimonials` reads `speaking.testimonials.items`. Empty array → section not shown.
