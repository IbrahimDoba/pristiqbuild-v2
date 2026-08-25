import type { ReactNode } from "react";

/**
 * Shared shell for the privacy policy and terms pages.
 *
 * Deliberately plain: legal copy is read, not scanned, so it gets a single
 * measure of about 70 characters and no decoration competing with it.
 */
export default function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-white">
      <header className="border-b border-steel-100 bg-steel-50">
        <div className="container-custom py-16 md:py-20">
          <div className="max-w-[70ch]">
            <h1 className="heading-lg text-steel-900 mb-4">{title}</h1>
            <p className="body-lg text-steel-600 mb-6">{intro}</p>
            <p className="text-sm text-steel-500">
              Last updated <time dateTime={updated}>{formatDate(updated)}</time>
            </p>
          </div>
        </div>
      </header>

      <div className="container-custom py-14 md:py-20">
        <article className="legal-prose max-w-[70ch]">{children}</article>
      </div>
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
