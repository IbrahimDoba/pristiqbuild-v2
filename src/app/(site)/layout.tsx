import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";

/**
 * Chrome for the public site.
 *
 * This used to live in the root layout, which meant the marketing navbar and
 * footer also rendered on /admin. The fixed navbar sat over the admin pages
 * and swallowed clicks. Route groups do not appear in the URL, so every public
 * path is unchanged.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionProvider>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content" className="pt-20">
        {children}
      </main>
      <Footer />
    </MotionProvider>
  );
}
