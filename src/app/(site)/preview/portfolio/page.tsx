import type { Metadata } from "next";
import PortfolioPreview from "./PortfolioPreview";

/**
 * The frame inside the portfolio editor. It sits in the (site) group so the
 * real navigation, footer and fonts surround the draft; the proxy restricts it
 * to signed-in content editors. It shows only what the editor posts to it.
 */
export const metadata: Metadata = {
  title: "Preview",
  robots: { index: false, follow: false },
};

export default function PortfolioPreviewPage() {
  return <PortfolioPreview />;
}
