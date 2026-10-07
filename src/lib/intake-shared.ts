/** Client-safe constants shared by the questionnaire form and its server function. */

export const ILLNESSES = [
  "Chicken Pox",
  "Glandular Fever",
  "Measles",
  "Meningitis",
  "Mumps",
  "Pneumonia",
  "Ear Infections / Glue Ear",
  "Recurrent colds & coughs",
  "Scarlet Fever",
  "Shingles",
  "Tonsillitis",
  "Tuberculosis",
] as const;

/** Free-text answers whose keys are the exact Airtable field names. */
export const TEXT_FIELDS = [
  "Occupation",
  "Main reason for consultation",
  "Other illnesses",
  "Recurrent health problems",
  "Immunisation history",
  "Allergies or intolerances",
  "Skin complaints",
  "Skin conditions treated with cortisone cream",
  "Surgical procedures or major dental work",
  "Accidents",
  "Serious illness",
  "Hospitalisation and pregnancies",
  "Recent antibiotics",
  "Medications during pregnancy",
  "Mother's emotional state in pregnancy",
  "New symptoms in pregnancy",
  "Type of birth",
  "How mother felt about the birth",
  "Feeding",
  "Weaning",
  "Teething",
  "Talking",
  "Walking",
  "Toilet training",
  "Reaction to birth of younger sibling",
  "Reaction to starting day-care",
  "Reaction to first day of school",
] as const;

export const FAMILY_ROWS = ["Grandparents", "Parents", "Aunts/Uncles/Cousins", "Siblings"] as const;
export const FAMILY_SIDES = ["Mother's side", "Father's side"] as const;

export type MedRow = { med: string; dosage: string; condition: string; helpful: string };
