/**
 * Contact details, in one place.
 *
 * The phone number used to be typed out in about fifteen files, which is how
 * the site ended up advertising a number the business no longer answers.
 * Every page, CTA and structured-data block reads it from here.
 */

/** As printed on the page. */
export const PHONE_DISPLAY = "+234 708 718 3815";
/** E.164, for tel: links and structured data. */
export const PHONE_E164 = "+2347087183815";
export const PHONE_HREF = `tel:${PHONE_E164}`;

export const EMAIL = "info@pristiqbuild.com";
export const LOCATION = "Maitama, Abuja";
export const RESPONSE_TIME = "usually within a few hours";

/**
 * A wa.me link with the message already typed.
 *
 * Each CTA passes its own text so the team can tell from the first message
 * which button the enquirer pressed.
 */
export function whatsappLink(message: string): string {
  return `https://wa.me/${PHONE_E164.slice(1)}?text=${encodeURIComponent(message)}`;
}

/** Prefilled messages, one per CTA. */
export const WA = {
  general: "Hello PristiqBuild, I'd like to talk about a project.",
  roofAssessment:
    "Hello PristiqBuild, I'd like to request a roof assessment. Site location: ",
  modular:
    "Hello PristiqBuild, I'd like to know when modular construction launches.",
  opulencePricing:
    "Hello PristiqBuild, I'm interested in Opulence Heights. Please share current pricing and availability.",
  projectScope:
    "Hello PristiqBuild, I have a roofing, structural or development project. Scope and site: ",
} as const;
