/**
 * Central site configuration.
 *
 * TODO: replace the placeholder values below when the real accounts exist.
 * Everything else in the site reads from this file, so one edit here updates
 * every booking button and every email link.
 */

export type Lang = "en" | "hr";

export const LANGUAGES: { code: Lang; flag: string; label: string }[] = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "hr", flag: "🇭🇷", label: "Hrvatski" },
];

/** TODO: PLACEHOLDER - swap for the real Cal.com links when they exist. */
export const BOOKING_URL: Record<Lang, string> = {
  en: "https://cal.com/PLACEHOLDER-natasa/first-consultation",
  hr: "https://cal.com/PLACEHOLDER-natasa/prvi-pregled",
};

/** TODO: PLACEHOLDER - swap for the real mentoring booking links. */
export const MENTORING_BOOKING_URL: Record<Lang, string> = {
  en: "https://cal.com/PLACEHOLDER-natasa/supervision",
  hr: "https://cal.com/PLACEHOLDER-natasa/supervizija",
};

/** TODO: PLACEHOLDER - this mailbox is not live yet. */
export const CONTACT_EMAIL = "hello@homeopathywithnatasa.co.uk";

/**
 * Contact form endpoint (Formspree or equivalent), posted directly from the
 * browser with no backend.
 *
 * TODO: PLACEHOLDER - create the form at formspree.io with the recipient set to
 * natasapericconcha@gmail.com, then paste the real endpoint here. One edit is
 * all that is needed. While the value below still contains PLACEHOLDER, the
 * form is shown as not connected and the mailto fallback is used instead.
 */
export const CONTACT_FORM_ENDPOINT = "https://formspree.io/f/PLACEHOLDER";

export function isContactFormConfigured(): boolean {
  return !CONTACT_FORM_ENDPOINT.includes("PLACEHOLDER");
}

const MAIL_SUBJECT: Record<Lang, string> = {
  en: "Enquiry from the website",
  hr: "Upit s web stranice",
};

export function mailtoLink(lang: Lang): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(MAIL_SUBJECT[lang])}`;
}

export function bookingLink(lang: Lang): string {
  return BOOKING_URL[lang];
}

export function mentoringLink(lang: Lang): string {
  return MENTORING_BOOKING_URL[lang];
}

export const CTHA_URL = "https://www.complementary.assoc.org.uk/";
export const CHE_URL = "https://www.homeopathycollege.org/";

export const PRACTICE_LOCATION = "Telegraph Hill, London";
