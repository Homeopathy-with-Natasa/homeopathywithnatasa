/**
 * Central site configuration. Every booking card, button and email link reads
 * from this file, so one edit here updates the whole site.
 */

export type Lang = "en" | "hr";

export const LANGUAGES: { code: Lang; flag: string; label: string }[] = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "hr", flag: "🇭🇷", label: "Hrvatski" },
];

/** The only email address shown anywhere on the site. */
export const CONTACT_EMAIL = "hello@homeopathywithnatasa.co.uk";

export const CAL_USERNAME = "natasa-peric-inhjfo";

/** Site primary colour (green-700) used to brand the Cal.com embed. */
export const BRAND_HEX = "#2f6a4e";

export type ServiceGroup = "consultation" | "supervision";

export type Service = {
  id: string;
  group: ServiceGroup;
  name: string;
  duration: string;
  price: string;
  slug: string;
  /** Key in the i18n files under services.<id> for the one-line description. */
  descriptionKey?: string;
};

/** Single source of truth for every bookable service. */
export const SERVICES: Service[] = [
  { id: "first-adult", group: "consultation", name: "First Adult Consultation", duration: "90 min", price: "£120", slug: "first-consultation" },
  { id: "follow-up-adult", group: "consultation", name: "Follow-up Consultation (Adult)", duration: "45 min", price: "£80", slug: "follow-up-consultation-adult" },
  { id: "children-first", group: "consultation", name: "Children First Consultation (under 16)", duration: "60 min", price: "£75", slug: "children-first-consultation-under-16" },
  { id: "children-follow-up", group: "consultation", name: "Children Follow-up Consultation (under 16)", duration: "30 min", price: "£55", slug: "children-follow-up-consultation-under-16" },
  { id: "acute", group: "consultation", name: "Acute Homeopathic Appointment", duration: "30 min", price: "£25", slug: "acute-homeopathic-appointment" },
  { id: "supervision-1-1", group: "supervision", name: "Supervision (1:1)", duration: "90 min", price: "£50", slug: "supervision-1-1" },
  { id: "supervision-group", group: "supervision", name: "Supervision (Small Group, up to 3 people)", duration: "90 min", price: "£40 per person", slug: "supervision-small-group" },
];

export function calLink(slug: string): string {
  return `${CAL_USERNAME}/${slug}`;
}

export function calUrl(slug: string): string {
  return `https://cal.com/${calLink(slug)}`;
}

const MAIL_SUBJECT: Record<Lang, string> = {
  en: "Enquiry from the website",
  hr: "Upit s web stranice",
};

export function mailtoLink(lang: Lang): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(MAIL_SUBJECT[lang])}`;
}

export const CTHA_URL = "https://www.complementary.assoc.org.uk/";
export const CHE_URL = "https://www.homeopathycollege.org/";

export const PRACTICE_LOCATION = "Telegraph Hill, London";

/**
 * Stable public base URL, used to build absolute social share image URLs.
 */
export const SITE_URL = "https://homeopathywithnatasa.co.uk";
