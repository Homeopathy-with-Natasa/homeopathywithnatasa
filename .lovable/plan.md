# Lot 8 Home page update

## Scope
- Change the shared consultation button label in English and Croatian.
- Reorder and rewrite only the Home page sections as specified.
- Remove the Home credentials section and standalone beliefs quote.
- Keep all other pages, visual styling, typography, and shared layouts unchanged.

## Implementation
- Update the Home translation keys in `en.json` with the supplied English text verbatim.
- Mirror the same key structure in `hr.json` using natural formal-Vi Croatian.
- Recompose the Home route into the requested ten-section order, reusing the current section, divider, button, testimonial, and newsletter presentation.
- Add the About link using the existing secondary-link styling.
- Simplify the newsletter block to its heading, one sentence, email field, and sign-up button, without changing its current non-connected behavior.

## Validation
- Confirm both translation files parse and have identical keys, nesting, and array structure.
- Confirm no em dashes appear in the changed copy.
- Check the latest build result.
- Capture and inspect the complete English Home page at desktop and mobile sizes.
