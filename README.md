# Homeopathy with Natasa

Please stay in Plan mode only. Do not start coding yet. Return a plan first and wait for my confirmation.

I want to build a SITE (a content-led brochure website, no login, no user accounts, no database) called **Homeopathy with Natasa**, for a homeopath based in London.

## PURPOSE AND AUDIENCE

**Purpose.** Generate consultation bookings. This site exists so that someone looking for a homeopath can understand who Natasa is and book a first consultation. Secondary purpose: let homeopathy students book supervision.

**Primary persona.** A woman, typically 30 to 55, in the UK or working with Natasa remotely. She has a health concern that has persisted: hormonal imbalance, perimenopause, fertility difficulties, recurrent infections, skin conditions, digestive trouble, or exhaustion she cannot explain. She has usually been through the conventional route already and it did not resolve things. She is not anti-medicine. She wants to be treated as a whole person rather than as a list of symptoms.

Crucially she is not looking for a quick fix. Natasa's best clients are people who work on themselves, who have done some form of therapy, who are committed to their wellbeing and are tuned in. The copy should quietly attract those people and gently filter out people looking for a miracle.

**Secondary persona.** Homeopathy students and newly qualified practitioners looking for supervision or mentoring. One page is enough for them. They must not dominate the site.

**Pain.** Her symptoms have been treated one at a time, by different people, and nobody has connected them. She has been told her results are normal when she does not feel normal. Finding a homeopath she can trust is hard, because the field is full of vague, mystical-sounding websites that make her doubt whether anyone serious practises this.

**Promise.** Natasa helps people whose health has been treated in pieces to understand how those pieces connect, through homeopathy and a conversation deeper than any they have had about their health.

**The key differentiator, and this must shape the Homeopathy page.** In Natasa's own words: homeopathy is a type of medicine that treats the body as one unique integrated system, instead of isolating single organs that are studied separately and treated by different medical specialties, in order to identify the root cause of symptoms. Use that logic and that register. Do NOT use "mind, body and spirit connection" - it is on every wellness site and differentiates nothing.

## WHO NATASA IS

Nataša Perić, PhD, BSc (Hons), LCHE. Homeopath in private practice in London since 2009, so sixteen years. Before homeopathy she was a research scientist: she holds a PhD in Natural Sciences and co-authored a biology textbook that has been on the compulsory reading list for undergraduate science courses in Croatia for over a decade. She came to homeopathy after a difficult post-partum period when it helped her personally. She teaches and supervises at the Centre for Homeopathic Education in London, where she leads the Research Proposition module. She is Croatian, based in Telegraph Hill, London. Registered with the Complementary Therapist Association.

The site must make her scientific background an asset. She has spent years quietly apologising for being "just a homeopath" - the site should do the opposite, without ever becoming arrogant.

## ARCHITECTURE

Five pages in the navigation:

1. **Home** - who she is, who she helps, what homeopathy actually is, social proof, one clear call to action to book.
2. **About** - her story and her credentials, in one page.
3. **Homeopathy** - what it is, what it is not, what it can support, what a consultation is like, how remedies are sent.
4. **Consultations & Pricing** - the offer, the prices, clinic hours, cancellation policy, booking button.
5. **Mentoring** - supervision for students and practitioners, one-to-one and small group.

Footer only, not in the navigation: Privacy Policy, Terms and Conditions, Code of Ethics.

## LANGUAGE

Bilingual: English and Croatian.
The switcher is flag emoji only, no text label: 🇬🇧 for English and 🇭🇷 for Croatian, top right of the navbar.
It must change all page content and all external links. Language preference stored in localStorage.
Translation files split as src/i18n/en.json and src/i18n/hr.json, so text can be edited directly in GitHub later without touching code.

For now, build the full bilingual structure but populate Croatian with the English strings as placeholders, clearly marked. Croatian copy will follow.

## VOICE RULES (non-negotiable, this is a real person with a documented voice)

- Warm without performing. Steady, not effusive.
- Precise without being cold. Her PhD shows in the accuracy, never in coldness.
- Quietly confident. She does not oversell and does not undersell.
- Partner, not authority. She writes "I work with you and for you", "a partnership between us, built on mutual trust and respect", "your treatment is tailored to you as an individual".
- Honest about uncertainty. "may support", "is indicated for", "good to have in case".
- Short to medium sentences. Plain English. Direct address using "you" and "your".

Words that belong to her: partnership, mutual trust, respect, honesty, openness, gentle, gently, support, balance, rebalance, nourish, restore, calm, soothe, "small changes make a big difference", "the body is gently stimulated to heal itself".

**Never use, for UK ASA and CAP compliance:** cure, cures, treats (as a definitive verb), diagnose, guarantee, proven to, miracle. Never claim outcomes for specific named conditions.

**Never use, because it is hype:** transformation, life-changing, breakthrough, unlock, unleash, deep dive, journey, your best self, manifest, high vibe, energy (without specificity).

**No em dashes anywhere in visible copy.** Short dashes only.

## DESIGN DIRECTION

**Emotional goal.** Primary: calm and focused, peaceful, clear, uncluttered. Secondary: professional and trusted, credible, grounded.

**Mood:** aerial, uncluttered, warm, grounded, human. Generous whitespace. Less is more.

**What it must NOT look like:** busy, mystical, new-age, crowded with icons and badges, generic wellness template, obviously AI-generated. Reference site we like for structure and warmth: homeopathywithtracy.co.uk - but it is too dense. Take that direction and give it far more air.

**Colours.** Her logo is a dandelion, drawn for her by an architect friend in Croatia in 2019. Exact brand colours from the original files:
- Soft green #98dbb1 (dominant)
- Rose #f468ae (accent, used sparingly)
- Fuchsia #d20c90 (available if a deeper accent is needed)

Build the palette around soft green as the dominant with rose as a sparing accent, on a warm off-white background. Derive a proper scale from #98dbb1 - the raw pastel is too light for body text or buttons, so generate darker tints for text, borders and CTAs while keeping the pastel for backgrounds and large surfaces. Propose two or three palette variations before applying one.

Her portrait was taken outdoors against pink geraniums and greenery, so the photograph and the identity reinforce each other. Do not put it on a cold or clinical background.

**Typography.** One serif or humanist font for titles, one clean sans-serif for body. Maximum two families. Generous line height. Body text no smaller than 17px on desktop.

**Logo.** A dandelion head with seeds blowing off to the upper right. I will supply SVG and transparent PNG in green and in white. Navbar: green version, approximately 40px high, paired with the wordmark "Homeopathy with Natasa". Footer: white version on a dark green background. Favicon: square version. Create clearly labelled placeholder slots.

**Images.** Real photographs only, no stock. Clearly labelled placeholder slots for upload after generation:
- One portrait of Natasa on Home: rounded rectangle, border-radius 16px, portrait orientation, approximately 300x360px on desktop
- One portrait on About
- Absolutely no stock imagery of cupped hands, leaves, glass droppers or little white pills. That is the visual cliché of every homeopathy website and we are avoiding it deliberately.

**Transitions between sections.** Soft curved SVG dividers, no hard rectangular breaks.
**Animations.** Fade-in on scroll only, nothing aggressive.
**Mobile first, mandatory.** Most of her referrals arrive by word of mouth and open the site on a phone.

## TECHNICAL

- Booking: an external booking link (Cal.com), opening in a new tab. The real URL does not exist yet - use a clearly marked placeholder constant in one central config file so it can be swapped in one edit. The link must switch per language.
- Contact: a mailto link to hello@homeopathywithnatasa.co.uk. This address is not live yet either - put it in the same central config file.
- **Do not build a contact form that sends email from the site.** Her previous website had a form that silently failed for two years and cost her enquiries. A mailto link cannot fail silently. This is a deliberate decision, not an oversight.
- Newsletter: a simple styled email capture block, not wired to anything yet. Plan the slot.
- Cookie banner: simple accept or refuse, GDPR compliant.
- No custom domain for now. The Lovable preview URL is fine.
- Responsive, mobile first.

## WHAT I WANT FROM YOU IN THIS FIRST REPLY

Do not write any code yet. Return:

1. Your understanding of the product in your own words
2. The core assumptions you are making
3. Recommended page structure, section by section, for all five pages
4. Component inventory: which components appear on which pages
5. The language switch logic, including how external links map per language
6. Two or three palette proposals derived from #98dbb1 and #f468ae, with the full scale of tints you would generate and where each is used
7. Font pairing proposal, two options
8. Image and logo placeholder plan
9. The central config file structure for the booking link and email address
10. What you would exclude from V1
11. Any warnings or trade-offs before implementation

Then stop and wait for my confirmation.

Where there are trade-offs, always prefer: simplicity over features, air and whitespace over density, mobile usability over desktop polish, human-sounding copy over generic wellness tone.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://homeopathywithnatasa.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ddac966f-0a24-45d2-837b-a56a69cc5372).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
