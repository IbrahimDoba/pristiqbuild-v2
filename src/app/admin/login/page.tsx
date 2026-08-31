import { signIn } from "@/lib/auth";
import { AlertCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; error?: string }>;
}) {
  const { from, error } = await searchParams;

  async function authenticate(formData: FormData) {
    "use server";
    const target =
      typeof formData.get("from") === "string" && String(formData.get("from")).startsWith("/admin")
        ? String(formData.get("from"))
        : "/admin";

    try {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: target,
      });
    } catch (err) {
      // next-auth signals a successful redirect by throwing, so only a real
      // AuthError is a failure. Anything else has to be rethrown or the
      // redirect never happens.
      if (err instanceof AuthError) {
        redirect(`/admin/login?error=1${from ? `&from=${encodeURIComponent(from)}` : ""}`);
      }
      throw err;
    }
  }

  return (
    <div className="min-h-screen bg-steel-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-2xl text-steel-900">
            PristiqBuild
          </h1>
          <p className="text-sm text-steel-500 mt-1">Team sign in</p>
        </div>

        <form
          action={authenticate}
          className="bg-white rounded-2xl border border-steel-200 p-6 space-y-5"
        >
          <input type="hidden" name="from" value={from ?? ""} />

          {error && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-red-800"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
              {/* Deliberately does not say which of the two was wrong. */}
              <p className="text-sm">
                Those details did not match an active account.
              </p>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-steel-700 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              spellCheck={false}
              autoFocus
              className="w-full px-4 py-2.5 rounded-lg border border-steel-200 outline-none transition-colors focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-steel-700 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full px-4 py-2.5 rounded-lg border border-steel-200 outline-none transition-colors focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2.5 rounded-lg bg-primary-700 text-white font-semibold hover:bg-primary-800 active:translate-y-px transition-[background-color,transform]"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-xs text-steel-400 mt-6">
          Accounts are created by an administrator.
        </p>
      </div>
    </div>
  );
}
