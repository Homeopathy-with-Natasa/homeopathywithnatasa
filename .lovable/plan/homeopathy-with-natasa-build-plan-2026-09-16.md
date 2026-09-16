# Homeopathy with Natasa - build plan

## 1. What this is

A calm, five-page brochure site whose single job is to get the right person to click "Book a first consultation" on Cal.com. No login, no database, no forms that can fail. The site has to do two things at once: feel warm and unhurried, and quietly establish that Natasa is a scientist who chose homeopathy, not someone hiding behind mysticism. Copy filters as much as it attracts: people wanting a miracle should feel this is not for them.

Everything is bilingual from day one (English live, Croatian as marked placeholders), and all text lives in two JSON files so it can be edited on GitHub later without touching code.

## 2. Assumptions

- Static site, no backend, no Lovable Cloud. Nothing is stored server-side.
- Cal.com link and the email address do not exist yet; both are placeholder constants in one config file, with separate EN and HR booking URLs.
- Photos and logo files arrive later. I build labelled placeholder slots with the exact final dimensions so dropping the real files in is a one-line change each.
- English copy is written by me in her voice, for your editing. Croatian files carry the same English strings prefixed `[HR]` so untranslated text is obvious.
- Prices, clinic hours and cancellation terms are not yet supplied. I will use clearly marked placeholders rather than invent them.
- Legal pages (Privacy, Terms, Code of Ethics) get real structure with placeholder body text, flagged for your review.
- No named-condition outcome claims anywhere; "may support" register throughout. No em dashes.

## 3. Page structure

**Home**
1. Hero: short headline, one line of subcopy, primary button "Book a first consultation", quiet secondary link to Homeopathy.
2. Portrait + short intro (300x360 portrait slot, 16px radius).
3. "You may recognise this" - four to five plain-language situations, no icons, generous spacing.
4. What homeopathy is, in her definition: one integrated system, root cause. Two short paragraphs, link to Homeopathy page.
5. Credentials strip: PhD, 2009, CHE teaching, CThA registration. Text only, no badges.
6. Social proof: three short quotes, initials only.
7. Newsletter capture block (styled, not wired).
8. Closing call to action.

**About** - opening line, her path from research science to homeopathy (post-partum, briefly and without drama), how the science shows up in how she works, teaching and supervision at CHE, credentials list, portrait slot, call to action.

**Homeopathy** - what it is (her integrated-system framing), what it is not (honest, short), what it may support (systems and states, never named-condition claims), what a consultation is like step by step, how remedies are prepared and sent, follow-ups, a short honest note on what she asks of you, call to action.

**Consultations & Pricing** - first consultation, follow-ups, acute support, in person in Telegraph Hill vs online, price table (placeholders), clinic hours (placeholder), cancellation policy (placeholder), what happens after you book, call to action.

**Mentoring** - who it is for, one-to-one supervision, small group supervision, how sessions run, her teaching background, pricing placeholder, call to action. Deliberately plainer than the client pages so it never competes.

**Footer (all pages)** - logo in white on dark green, nav, Privacy Policy, Terms and Conditions, Code of Ethics, CThA line, email link.

## 4. Component inventory

| Component | Used on |
| --- | --- |
| Navbar (logo, 5 links, flag switcher, mobile drawer) | all |
| Footer | all |
| Hero | Home |
| PageHeader (title + standfirst) | About, Homeopathy, Pricing, Mentoring, legal |
| Prose section | all |
| PortraitCard | Home, About |
| RecognitionList | Home, Homeopathy |
| StepList (numbered, airy) | Homeopathy, Pricing |
| PriceTable | Pricing, Mentoring |
| Quote / QuoteRow | Home, Mentoring |
| CredentialsList | Home, About |
| CtaBand | every page, once, at the end |
| NewsletterBlock | Home, About |
| CurveDivider (soft SVG, 3 variants) | between sections |
| FadeIn (scroll reveal wrapper) | everywhere |
| CookieBanner | app-wide, localStorage |
| LanguageSwitcher | Navbar |

## 5. Language logic

- `LanguageProvider` at the root reads `localStorage.hwn-lang`, falls back to `en`. No auto-detection from browser locale, to keep behaviour predictable.
- `useT()` returns a lookup into the active JSON by dot path, falling back to English if a key is missing.
- Switching sets state and localStorage, no page reload, no URL change (single URL per page keeps it simple; if you later want `/hr/` URLs that is a V2 change).
- External links come from the same config, keyed by language: booking URL EN vs HR, and the mailto subject line switches language too. Any future third-party link follows the same shape.
- `<html lang>` updates with the active language.

## 6. Palette proposals

A full scale derived from the dandelion green, since #98dbb1 alone is too light for text or buttons. Rose stays rare: buttons and one or two hairlines, nothing more.

Shared scale from #98dbb1: 50 `#f2faf5`, 100 `#e2f4ea`, 200 `#c6e9d5`, 300 `#98dbb1` (brand), 400 `#6fc494`, 500 `#4aa877`, 600 `#37875f`, 700 `#2b6a4b`, 800 `#20503a`, 900 `#163a2a`.
Rose scale from #f468ae: 300 `#f9a6cd`, 400 `#f468ae` (brand), 500 `#e23f94`, 600 `#d20c90` (deep accent).

**Option A - Garden light (recommended).** Background `#fdfcf9` warm off-white, body text green-900, headings green-800, buttons green-700 with white text, hover green-800, section surfaces green-50 and green-100, curve dividers green-100, rose-500 for the single primary call to action and link underlines, footer green-800. Airy, unmistakably hers, rose stays precious.

**Option B - Deep grounded.** Same background but headings and footer in green-900 with much heavier contrast, buttons in green-800, pastel green-300 used only as a wide flat band behind one section per page. Reads more clinical and authoritative, slightly less warm.

**Option C - Rose-forward.** Green-50 as the page background, rose-500 as the primary button colour, green-700 for text. Warmer and more feminine, but rose loses its rarity and it drifts closer to the generic wellness look, so I would not pick it.

All values go in `src/styles.css` as tokens; no hardcoded colours in components.

## 7. Fonts, two options

**Option 1 (recommended): Fraunces for headings, Inter Tight for body.** Fraunces is a warm modern serif with a human, slightly soft feel that suits the dandelion; Inter Tight keeps body text clean and highly legible at 17-18px.
**Option 2: Lora headings, Source Sans 3 body.** Quieter and more editorial, a touch more traditional, reads as established practice rather than contemporary studio.

Either way: two families only, body 17px desktop / 16.5px mobile, line height 1.7, headings tighter at 1.15.

## 8. Images and logo slots

Every slot is a labelled placeholder component showing the exact expected file and size, so nothing looks broken before assets arrive.
- `logo-green.svg` navbar, 40px high, beside the wordmark.
- `logo-white.svg` footer on green-800.
- `favicon` square.
- `natasa-home.jpg` 300x360 portrait, 16px radius, Home.
- `natasa-about.jpg` portrait, About.
No stock photography anywhere. No hands, leaves, droppers or pills, ever.

## 9. Central config

`src/config/site.ts`:
- `BOOKING_URL: { en, hr }` - placeholder Cal.com URLs, clearly marked TODO.
- `CONTACT_EMAIL` and a `mailtoLink(lang)` helper with a language-appropriate subject.
- `CTHA_URL`, `CHE_URL` if you want them linked.
- `PRACTICE_LOCATION`, `LANGUAGES`.
All booking buttons and email links read from here only. Swapping the real URL is one edit.

## 10. Out of V1

Contact form (deliberate), blog, testimonials CMS, booking embedded in-page, Croatian copy, analytics, custom domain, `/hr/` URLs, dark mode, FAQ accordion, resource downloads, live newsletter integration.

## 11. Warnings and trade-offs

- Compliance: I will keep every claim in the "may support" register and avoid named conditions. Please still read the Homeopathy and Pricing pages before publishing; ASA scrutiny in this field is real.
- Prices, hours, cancellation terms and the three legal pages will ship as marked placeholders. The site should not go live until you supply those.
- Single-URL bilingual means Croatian pages cannot be shared as distinct links or indexed separately by search engines. Simplest now, changeable later.
- Croatian placeholders are visibly marked, so do not publish before translation.
- The site will feel sparse on a large desktop screen. That is the intent, given the mobile-first brief.

Please confirm the palette option and the font option, and I will build.
