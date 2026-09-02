import "server-only";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import { CATEGORIES, matchProject } from "@/lib/admin/finance-constants";

/**
 * Turns "I paid 600,000 for roofing materials at Idu Residence yesterday" into
 * fields for the expense form.
 *
 * It never writes anything. The parsed result pre-fills the form and a person
 * presses save. A misheard 600,000 against 6,000,000 is one keystroke and one
 * wrong ledger line, so the model proposes and a human commits.
 */

/**
 * Every field is nullable rather than optional.
 *
 * OpenAI structured outputs run in strict mode, where every property must be
 * required and `additionalProperties` false. An optional field is rejected at
 * schema-build time; a nullable one is how "the sentence did not say" is
 * expressed.
 */
const ExpenseDraft = z.object({
  amount: z
    .number()
    .nullable()
    .describe("Amount in whole naira. 600k becomes 600000, 1.2m becomes 1200000."),
  category: z
    .enum(CATEGORIES as [string, ...string[]])
    .nullable()
    .describe("Best-fitting category, or null when the sentence does not say."),
  projectName: z
    .string()
    .nullable()
    .describe("Project exactly as the user said it, not corrected or expanded."),
  vendor: z.string().nullable().describe("Supplier or payee, when named."),
  description: z.string().describe("Short factual summary of what was bought."),
  spentAtISO: z
    .string()
    .nullable()
    .describe("Date of the spend as YYYY-MM-DD, resolved against today's date."),
  confidence: z.enum(["high", "medium", "low"]).describe("Confidence in the reading."),
  uncertainties: z
    .array(z.string())
    .describe(
      "Anything inferred rather than stated, in plain words. Empty when everything was explicit."
    ),
});

export type ExpenseDraft = z.infer<typeof ExpenseDraft>;

export type ParseOutcome =
  | { ok: true; draft: ExpenseDraft; matchedProjectId: string | null }
  | { ok: false; error: string };

/** Extraction, not reasoning. Override with OPENAI_MODEL if you want a larger one. */
const MODEL = process.env.OPENAI_MODEL ?? "gpt-5-mini";

/**
 * `today` is a parameter rather than read inside the prompt, so relative dates
 * resolve against the server clock and the parser can be tested deterministically.
 */
export async function parseExpense(
  sentence: string,
  projects: { id: string; name: string }[],
  today: Date = new Date()
): Promise<ParseOutcome> {
  if (!process.env.OPENAI_API_KEY) {
    return {
      ok: false,
      error:
        "OPENAI_API_KEY is not set, so the assistant is unavailable. Enter the expense manually.",
    };
  }
  if (sentence.trim().length < 6) {
    return { ok: false, error: "Say a little more about the expense." };
  }

  const client = new OpenAI();
  const todayISO = today.toISOString().slice(0, 10);

  const instructions = [
    "You extract expense records for a Nigerian construction company.",
    `Today is ${todayISO}. Resolve relative dates such as "yesterday" or "last Friday" against it.`,
    "Amounts are Nigerian naira unless stated otherwise. Read 600k as 600000 and 1.2m as 1200000.",
    "",
    "Known projects:",
    projects.length ? projects.map((p) => `- ${p.name}`).join("\n") : "- (none recorded yet)",
    "",
    "Return the project name as the user said it. Do not invent one, and do not",
    "map it onto a known project yourself: the application does the matching.",
    "Use null for anything the sentence does not state. Never guess an amount.",
    "List every inference in uncertainties, including a date you resolved or a",
    "category you chose without being told.",
  ].join("\n");

  try {
    const response = await client.responses.parse({
      model: MODEL,
      instructions,
      input: sentence.trim().slice(0, 1000),
      text: { format: zodTextFormat(ExpenseDraft, "expense_draft") },
    });

    const draft = response.output_parsed;
    if (!draft) {
      return { ok: false, error: "Could not read that. Try rephrasing it." };
    }

    return {
      ok: true,
      draft,
      matchedProjectId: matchProject(draft.projectName, projects),
    };
  } catch (err) {
    // Typed classes, most specific first, so a rejected key reads differently
    // from a rate limit.
    if (err instanceof OpenAI.AuthenticationError) {
      return { ok: false, error: "The OpenAI API key was rejected." };
    }
    if (err instanceof OpenAI.RateLimitError) {
      return { ok: false, error: "Rate limited. Try again in a moment." };
    }
    if (err instanceof OpenAI.BadRequestError) {
      return { ok: false, error: `The assistant rejected the request (${err.status}).` };
    }
    if (err instanceof OpenAI.APIError) {
      return { ok: false, error: `Assistant unavailable (${err.status}).` };
    }
    return { ok: false, error: "The assistant could not be reached." };
  }
}
