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

/** TODO: PLACEHOLDER - swap for the real supervision booking links. */
export const SUPERVISION_BOOKING_URL: Record<Lang, string> = {
  en: "https://cal.com/PLACEHOLDER-natasa/supervision",
  hr: "https://cal.com/PLACEHOLDER-natasa/supervizija",
};

/** TODO: PLACEHOLDER - this mailbox is not live yet. */
export const CONTACT_EMAIL = "hello@homeopathywithnatasa.co.uk";

/*
 * The contact form posts to a server function (src/lib/contact.functions.ts),
 * which records the enquiry in Airtable. The Airtable token is held in the
 * AIRTABLE_TOKEN secret and never reaches the browser.
 */


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

export function supervisionLink(lang: Lang): string {
  return SUPERVISION_BOOKING_URL[lang];
}

export const CTHA_URL = "https://www.complementary.assoc.org.uk/";
export const CHE_URL = "https://www.homeopathycollege.org/";

export const PRACTICE_LOCATION = "Telegraph Hill, London";

/**
 * Stable public base URL, used to build absolute social share image URLs.
 * TODO: swap for the custom domain when there is one.
 */
export const SITE_URL = "https://project--ddac966f-0a24-45d2-837b-a56a69cc5372.lovable.app";
