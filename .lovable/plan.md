# Lot 7 content update

## Scope
- Replace only the requested English copy and provide matching natural Croatian translations in formal **Vi**.
- Keep the existing design, colours, typography, spacing, components, and all unnamed content unchanged.

## Pages
- **Home:** replace the hero lines, introduction, homeopathy explanation and recognition content; add the requested arrivals list and closing beliefs quote; remove the old mission line; retain all testimonials and calls to action.
- **About:** replace the story, rebuild credentials with the supplied introduction and two groups, add “How I work”, remove “Who I work best with”, and keep the requested subtitle and all unaffected material.
- **Homeopathy:** replace the consultation section with “What to expect”, add “Areas of particular interest”, and retain the promises and remedies sections.
- **Consultations:** update only the seven specified fees and the Homeobotanicals wording.
- **Supervision:** rename Mentoring throughout, move the main page to `/supervision`, keep `/mentoring` as a permanent redirect, replace the introduction, add the three student testimonials high on the page, update group supervision to £40, remove “How sessions run”, retain the existing recognition list, and use the supplied closing line.
- **Privacy:** replace the retention TODO with the seven-year statement while retaining the draft banner.

## Technical details
- Rename internal supervision translation keys and booking helpers so no Mentoring wording remains in source content.
- Update navigation and footer links to `/supervision`, and add a dedicated redirect route for the former `/mentoring` URL.
- Preserve route-specific title, description, Open Graph, and Twitter metadata on the new supervision page.
- Keep English and Croatian JSON structures exactly aligned, with no `[HR]` placeholders and no em dashes.
- Validate JSON parity and scan for unintended mentoring wording, old fees, the removed mission text, and the removed retention TODO.
- Verify the English Home, About, and Supervision pages at desktop and mobile widths, and capture the requested English screenshots.
