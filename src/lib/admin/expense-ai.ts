import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
import { CATEGORIES, matchProject } from "@/lib/admin/finance";

/**
 * Turns "I paid 600,000 for roofing materials at Idu Residence yesterday" into
 * fields for the expense form.
 *
 * It never writes anything. The parsed result pre-fills the form and a person
 * presses save. A misheard 600,000 against 6,000,000 is one keystroke and one
 * wrong ledger line, so the model proposes and a human commits.
 */

const ExpenseDraft = z.object({
  amount: z
    .number()
    .nullable()
    .describe("Amount in the smallest sensible whole unit of naira. 600k -> 600000."),
  category: z
    .enum(CATEGORIES as [string, ...string[]])
    .nullable()
    .describe("Best-fitting category, or null when the sentence does not say."),
  projectName: z
    .string()
    .nullable()
    .describe("Project as written by the user, not corrected or expanded."),
  vendor: z.string().nullable().describe("Supplier or payee, when named."),
  description: z.string().describe("Short factual summary of what was bought."),
  spentAtISO: z
    .string()
    .nullable()
    .describe("Date of the spend as YYYY-MM-DD, resolved against today's date."),
  confidence: z
    .enum(["high", "medium", "low"])
    .describe("How confident the reading is overall."),
  uncertainties: z
    .array(z.string())
    .describe(
      "Anything guessed rather than stated, in plain words. Empty when everything was explicit."
    ),
});

export type ExpenseDraft = z.infer<typeof ExpenseDraft>;

export type ParseOutcome =
  | { ok: true; draft: ExpenseDraft; matchedProjectId: string | null }
  | { ok: false; error: string };

/**
 * `today` is passed in rather than read inside the prompt so relative dates
 * resolve against the server's clock, and so the caller can test the parser
 * deterministically.
 */
export async function parseExpense(
  sentence: string,
  projects: { id: string; name: string }[],
  today: Date = new Date()
): Promise<ParseOutcome> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      ok: false,
      error:
        "ANTHROPIC_API_KEY is not set, so the assistant is unavailable. Enter the expense manually.",
    };
  }
  if (sentence.trim().length < 6) {
    return { ok: false, error: "Say a little more about the expense." };
  }

  const client = new Anthropic();
  const todayISO = today.toISOString().slice(0, 10);

  try {
    const response = await client.messages.parse({
      model: "claude-opus-5",
      max_tokens: 2000,
      // Extraction, not reasoning. Low effort is both cheaper and faster here,
      // and the task does not reward deliberation.
      output_config: {
        effort: "low",
        format: zodOutputFormat(ExpenseDraft),
      },
      system: [
        "You extract expense records for a Nigerian construction company.",
        `Today is ${todayISO}. Resolve relative dates such as "yesterday" or "last Friday" against it.`,
        "Amounts are Nigerian naira unless stated otherwise. Read 600k as 600000 and 1.2m as 1200000.",
        "",
        "Known projects:",
        projects.length
          ? projects.map((p) => `- ${p.name}`).join("\n")
          : "- (none recorded yet)",
        "",
        "Return the project name as the user said it. Do not invent one, and do not",
        "map it onto a known project yourself: the application does the matching.",
        "Use null for anything the sentence does not state. Never guess an amount.",
        "List every inference you made in uncertainties, including a date you",
        "resolved or a category you chose without being told.",
      ].join("\n"),
      messages: [{ role: "user", content: sentence.trim().slice(0, 1000) }],
    });

    const draft = response.parsed_output;
    if (!draft) {
      return { ok: false, error: "Could not read that. Try rephrasing it." };
    }

    return {
      ok: true,
      draft,
      matchedProjectId: matchProject(draft.projectName, projects),
    };
  } catch (err) {
    // Typed classes, most specific first, so a rate limit reads differently
    // from a bad key.
    if (err instanceof Anthropic.AuthenticationError) {
      return { ok: false, error: "The Anthropic API key was rejected." };
    }
    if (err instanceof Anthropic.RateLimitError) {
      return { ok: false, error: "Rate limited. Try again in a moment." };
    }
    if (err instanceof Anthropic.APIError) {
      return { ok: false, error: `Assistant unavailable (${err.status}).` };
    }
    return { ok: false, error: "The assistant could not be reached." };
  }
}
