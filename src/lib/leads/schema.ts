import { z } from "zod";
import { LeadSource, Prisma } from "@/generated/prisma/client";
import {
  BUILDING_TYPES,
  COVERINGS,
  LOCATIONS,
  PITCHES,
  ROOF_SHAPES,
  estimateRoof,
  type BuildingType,
  type Covering,
  type Location,
  type Pitch,
  type RoofShape,
} from "@/lib/roof-estimate";

/**
 * Field names below mirror the existing forms exactly. They are not renamed:
 * changing them would break browser autofill for returning visitors and any
 * analytics keyed on the current names.
 */

const name = z.string().trim().min(2, "Please enter your name").max(120);
const email = z.email("Please enter a valid email address").max(200);
const phone = z
  .string()
  .trim()
  .max(40)
  .regex(/^[+()\d\s-]*$/, "Phone number contains unexpected characters")
  .optional()
  .or(z.literal(""));
const message = z.string().trim().max(5000).optional().or(z.literal(""));

/** Shared across every variant. Never persisted. */
const antiSpam = z.object({
  /** Honeypot. Real users never see this field, so a value means a bot. */
  website: z.string().max(0, "Rejected").optional(),
  /** Milliseconds between form mount and submit. Bots submit near-instantly. */
  elapsedMs: z.number().int().nonnegative().optional(),
});

/** Homepage contact section. */
const contactFormSchema = antiSpam.extend({
  source: z.literal("CONTACT_FORM"),
  name,
  email,
  phone,
  service: z.string().trim().max(120).optional().or(z.literal("")),
  message,
});

/** /contact quote form. Richer than the homepage one. */
const quoteFormSchema = antiSpam.extend({
  source: z.literal("QUOTE_FORM"),
  name,
  email,
  // Required here: the team follows up by phone or WhatsApp first.
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a phone number we can reach you on")
    .max(40)
    .regex(/^[+()\d\s-]*$/, "Phone number contains unexpected characters"),
  projectType: z.string().trim().max(120).optional().or(z.literal("")),
  location: z.string().trim().max(200).optional().or(z.literal("")),
  /** Where the enquirer is: just exploring, have drawings, and so on. */
  stage: z.string().trim().max(60).optional().or(z.literal("")),
  /** Free-text size or scope, e.g. "450 sqm roof". */
  scope: z.string().trim().max(200).optional().or(z.literal("")),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  message,
});

/**
 * LGS roof cost calculator. Captured even when the visitor gives no contact
 * details. Only the inputs are accepted: the server works the estimate out
 * again itself rather than storing a figure the browser sent.
 */
const calculatorSchema = antiSpam.extend({
  source: z.literal("CALCULATOR"),
  name: name.optional().or(z.literal("")),
  email: email.optional().or(z.literal("")),
  phone,
  buildingType: z.enum(Object.keys(BUILDING_TYPES) as [BuildingType, ...BuildingType[]]),
  footprint: z.coerce.number().positive().max(100_000),
  length: z.coerce.number().positive().max(1_000).optional(),
  width: z.coerce.number().positive().max(1_000).optional(),
  storeys: z.coerce.number().int().min(1).max(20),
  shape: z.enum(Object.keys(ROOF_SHAPES) as [RoofShape, ...RoofShape[]]),
  pitch: z.enum(Object.keys(PITCHES) as [Pitch, ...Pitch[]]),
  covering: z.enum(Object.keys(COVERINGS) as [Covering, ...Covering[]]),
  gutters: z.boolean().default(false),
  reroof: z.boolean().default(false),
  location: z.enum(Object.keys(LOCATIONS) as [Location, ...Location[]]),
});

/** Footer newsletter. */
const newsletterSchema = antiSpam.extend({
  source: z.literal("NEWSLETTER"),
  email,
});

export const leadInputSchema = z.discriminatedUnion("source", [
  contactFormSchema,
  quoteFormSchema,
  calculatorSchema,
  newsletterSchema,
]);

export type LeadInput = z.infer<typeof leadInputSchema>;

/** Request context the route attaches for attribution. Never user-supplied. */
export type LeadContext = {
  referrer?: string | null;
  userAgent?: string | null;
  utm?: Record<string, string>;
};

/** Shape handed to `prisma.lead.create`. */
export type LeadRecord = {
  name: string;
  email: string;
  phone: string | null;
  source: LeadSource;
  projectType: string | null;
  location: string | null;
  budgetBand: string | null;
  message: string | null;
  payload: Prisma.InputJsonObject;
};

const blank = (value: string | undefined | null) =>
  value && value.trim().length > 0 ? value.trim() : null;

/**
 * Collapse the per-form variants into one row shape.
 *
 * Anything form-specific that does not map onto a column goes into `payload`,
 * so a new form can ship without a migration.
 */
export function toLeadRecord(
  input: LeadInput,
  context: LeadContext = {}
): LeadRecord {
  const payload: Prisma.InputJsonObject = {
    referrer: context.referrer ?? null,
    userAgent: context.userAgent ?? null,
    ...(context.utm && Object.keys(context.utm).length > 0
      ? { utm: context.utm }
      : {}),
  };

  const base = {
    phone: null as string | null,
    projectType: null as string | null,
    location: null as string | null,
    budgetBand: null as string | null,
    message: null as string | null,
  };

  switch (input.source) {
    case "CONTACT_FORM":
      return {
        ...base,
        name: input.name,
        email: input.email,
        phone: blank(input.phone),
        source: LeadSource.CONTACT_FORM,
        projectType: blank(input.service),
        message: blank(input.message),
        payload,
      };

    case "QUOTE_FORM":
      return {
        ...base,
        name: input.name,
        email: input.email,
        phone: blank(input.phone),
        source: LeadSource.QUOTE_FORM,
        projectType: blank(input.projectType),
        location: blank(input.location),
        budgetBand: blank(input.budget),
        message: blank(input.message),
        payload: {
          ...payload,
          ...(blank(input.stage) ? { stage: blank(input.stage) } : {}),
          ...(blank(input.scope) ? { scope: blank(input.scope) } : {}),
        },
      };

    case "CALCULATOR": {
      const inputs = {
        buildingType: input.buildingType,
        footprint: input.footprint,
        ...(input.length && input.width ? { length: input.length, width: input.width } : {}),
        storeys: input.storeys,
        shape: input.shape,
        pitch: input.pitch,
        covering: input.covering,
        gutters: input.gutters,
        reroof: input.reroof,
        location: input.location,
      };
      const estimate = estimateRoof(inputs);
      return {
        ...base,
        // An anonymous calculation is still worth keeping: it tells us what
        // people want to build even when they never make contact.
        name: blank(input.name) ?? "Anonymous calculation",
        email: blank(input.email) ?? "",
        phone: blank(input.phone),
        source: LeadSource.CALCULATOR,
        projectType: `LGS roof: ${BUILDING_TYPES[inputs.buildingType].label}`,
        location: LOCATIONS[inputs.location].label,
        budgetBand: bandForEstimate((estimate.total[0] + estimate.total[1]) / 2),
        payload: {
          ...payload,
          calculator: {
            version: 2,
            ...inputs,
            roofArea: Math.round(estimate.surfaceArea),
            estimateLow: estimate.total[0],
            estimateHigh: estimate.total[1],
          },
        },
      };
    }

    case "NEWSLETTER":
      return {
        ...base,
        name: "Newsletter subscriber",
        email: input.email,
        source: LeadSource.NEWSLETTER,
        payload,
      };
  }
}

/** Bands match the /contact budget dropdown so both sources are comparable. */
export function bandForEstimate(estimate: number): string {
  if (estimate < 10_000_000) return "under-10m";
  if (estimate < 25_000_000) return "10m-25m";
  if (estimate < 50_000_000) return "25m-50m";
  if (estimate < 100_000_000) return "50m-100m";
  return "over-100m";
}
