import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";

/*
 * DRAFT. Needs review by a Nigerian-qualified lawyer before launch.
 *
 * Everything below describes what this codebase actually does as of the last
 * updated date: the fields each form collects, where they are stored, and which
 * processors receive them. That accuracy is the useful part. The legal framing
 * around it is a starting point, not advice.
 *
 * Re-read this file whenever the data flow changes, in particular when adding a
 * new form, a new analytics tool, or a new third-party processor.
 */

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How PristiqBuild collects, uses and protects your personal information, in line with the Nigeria Data Protection Act 2023.",
  alternates: { canonical: "https://www.pristiqbuild.com/privacy-policy" },
};

const UPDATED = "2026-08-25";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated={UPDATED}
      intro="This policy explains what we collect when you use pristiqbuild.com, why we collect it, and what you can ask us to do with it."
    >
      <h2>Who we are</h2>
      <p>
        PristiqBuild Nigeria Limited is the data controller for information
        collected through this website. Our registered office is Murjanatu
        House, 1 Zambezi Crescent, Wuse, Abuja, Federal Capital Territory,
        Nigeria. You can reach us at{" "}
        <a href="mailto:info@pristiqbuild.com">info@pristiqbuild.com</a> or{" "}
        <a href="tel:+2348130272706">+234 813 027 2706</a>.
      </p>
      <p>
        We process personal data in line with the Nigeria Data Protection Act
        2023 and the guidance of the Nigeria Data Protection Commission.
      </p>

      <h2>What we collect, and when</h2>
      <p>
        We only collect information you type into a form, plus limited technical
        information your browser sends with every request. We do not buy contact
        lists and we do not track you across other websites.
      </p>

      <h3>When you request a quote or send an enquiry</h3>
      <p>
        Our contact and quote forms ask for your name and email address. Where
        the form offers them, we also collect your phone number, project type,
        project location, estimated budget range and whatever you write in the
        message field. Name and email are required because we cannot reply
        without them; the rest is optional and only helps us give you a more
        useful answer.
      </p>

      <h3>When you use the cost calculator</h3>
      <p>
        We record the figures you enter, being project type, building size,
        number of floors, whether you selected smart features or solar power,
        and the estimate produced. This is stored without any contact details
        unless you separately choose to give them. We use it to understand what
        kinds of project people are planning, and to keep our published rates
        realistic.
      </p>

      <h3>When you subscribe to updates</h3>
      <p>
        We store your email address and the date you subscribed. Nothing else.
      </p>

      <h3>Automatically, on every submission</h3>
      <p>
        We record the page you submitted from, your browser&apos;s user agent
        string, and any campaign tags in the link you arrived through. This
        tells us which pages and campaigns actually help people, and helps us
        identify automated spam.
      </p>

      <h2>Why we are allowed to hold it</h2>
      <p>
        For enquiries and quote requests, we process your information because
        you asked us to respond, and because we have a legitimate interest in
        running and improving our business. For marketing emails, we rely on
        your consent, which you can withdraw at any time. Where we are required
        to keep records for tax or contractual reasons, we rely on our legal
        obligations.
      </p>

      <h2>Who else sees it</h2>
      <p>
        We do not sell your personal data. We share it only with the service
        providers that make this website work:
      </p>
      <ul>
        <li>
          <strong>Vercel</strong> hosts the website and processes the requests
          your browser makes.
        </li>
        <li>
          <strong>Neon</strong> hosts the database where enquiries are stored.
        </li>
        <li>
          <strong>Resend</strong> delivers the notification email that tells our
          team an enquiry has arrived.
        </li>
        <li>
          <strong>Google Analytics</strong> reports aggregate usage of the site.
          It is configured for reporting only, and we do not use it to build
          advertising profiles.
        </li>
      </ul>
      <p>
        Some of these providers operate servers outside Nigeria. Where your
        information is transferred abroad, we rely on the provider&apos;s
        contractual data protection commitments.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Enquiries and quote requests are kept for up to three years from your
        last contact with us, because construction projects are often planned
        well in advance and people frequently return. Newsletter subscriptions
        are kept until you unsubscribe. Anonymous calculator submissions are
        kept indefinitely, as they contain nothing that identifies you.
      </p>

      <h2>Your rights</h2>
      <p>
        Under the Nigeria Data Protection Act you can ask us to show you the
        personal data we hold about you, correct it if it is wrong, delete it,
        restrict how we use it, or send it to you in a portable format. You can
        object to processing based on legitimate interests, and you can withdraw
        consent to marketing at any time.
      </p>
      <p>
        Email{" "}
        <a href="mailto:info@pristiqbuild.com">info@pristiqbuild.com</a> and we
        will respond within 30 days. If you are not satisfied with our response,
        you may complain to the Nigeria Data Protection Commission.
      </p>

      <h2>Cookies and similar technology</h2>
      <p>
        This site does not set advertising cookies. Google Analytics sets a
        small number of cookies to tell repeat visits apart from new ones. You
        can block them in your browser settings without losing any functionality
        on this site.
      </p>
      <p>
        Some parts of the site remember small preferences in your own browser
        using local storage. That information never leaves your device.
      </p>

      <h2>Security</h2>
      <p>
        The site is served over HTTPS, submissions are validated and
        rate-limited, and access to the database holding enquiries is
        restricted to authorised team members. No system is perfectly secure,
        but we take reasonable measures appropriate to the sensitivity of what
        we hold.
      </p>

      <h2>Children</h2>
      <p>
        This site is intended for people doing business with us. We do not
        knowingly collect information from anyone under 18. If you believe a
        child has sent us personal data, contact us and we will delete it.
      </p>

      <h2>Changes</h2>
      <p>
        If we change how we handle personal data we will update this page and
        the date at the top. Material changes affecting people already on our
        list will be notified by email.
      </p>

      <p className="mt-12">
        See also our{" "}
        <Link href="/terms-of-service">Terms of Service</Link>.
      </p>
    </LegalPage>
  );
}
