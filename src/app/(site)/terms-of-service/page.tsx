import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";

/*
 * DRAFT. Needs review by a Nigerian-qualified lawyer before launch.
 *
 * The calculator disclaimer in particular is doing real work: the site publishes
 * naira-per-square-metre rates that visitors use to size their own budgets, so
 * the limits on that estimate need to be accurate and prominent.
 */

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply when you use the PristiqBuild website, including our cost calculator and enquiry forms.",
  alternates: { canonical: "https://www.pristiqbuild.com/terms-of-service" },
};

const UPDATED = "2026-08-25";

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated={UPDATED}
      intro="These terms apply when you use pristiqbuild.com. They cover what the site is for, what our published figures mean, and what we are and are not responsible for."
    >
      <h2>Who these terms are with</h2>
      <p>
        This website is operated by PristiqBuild Nigeria Limited, Murjanatu
        House, 1 Zambezi Crescent, Wuse, Abuja, Federal Capital Territory,
        Nigeria. By using the site you accept these terms. If you do not accept
        them, please do not use the site.
      </p>

      <h2>What this website is</h2>
      <p>
        This site describes our modular construction and light gauge steel
        services, shows completed projects, and lets you contact us. It is
        marketing material and general information. It is not an offer to enter
        a contract, and nothing on it forms part of any agreement between us.
        Construction work is governed solely by a signed contract.
      </p>

      <h2>The cost calculator</h2>
      <p>
        The calculator produces a rough order-of-magnitude figure from a small
        number of inputs and a published rate per square metre. Please treat it
        accordingly:
      </p>
      <ul>
        <li>
          It is an estimate for planning purposes only. It is not a quotation,
          a tender, or a price we are offering.
        </li>
        <li>
          It does not account for site conditions, ground works, foundations,
          access, planning and regulatory costs, finishes, fittings, external
          works, or professional fees.
        </li>
        <li>
          Nigerian construction input costs move with exchange rates and
          material availability. A figure that was reasonable when the rates
          were last set may not be reasonable today.
        </li>
        <li>
          A real price requires a site assessment and a written quotation from
          us.
        </li>
      </ul>
      <p>
        We are not liable for decisions taken on the basis of a calculator
        output. If a number matters to your budget, ask us for a quotation.
      </p>

      <h2>Project information and imagery</h2>
      <p>
        Project pages describe work we have completed. Timelines, unit counts,
        specifications and technical figures describe those specific projects
        and are not commitments about what any future project will cost or how
        long it will take.
      </p>

      <h2>Articles and guides</h2>
      <p>
        Our articles are general information about construction methods and
        materials. They are not engineering, structural, legal or financial
        advice, and they are not a substitute for a qualified professional
        assessing your specific project. Always have structural decisions
        checked by a registered engineer.
      </p>

      <h2>When you contact us</h2>
      <p>
        Please give accurate information so we can respond usefully. Do not use
        our forms to send unlawful, abusive or misleading content, and do not
        submit them by automated means. We may decline to respond to, and may
        block, submissions that abuse the service.
      </p>
      <p>
        Sending an enquiry does not create any obligation on either side. We aim
        to respond within one business day but do not guarantee a response time.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The PristiqBuild name and logo, the site design, our written content and
        our project photography belong to us or our licensors. You may read,
        share and link to our pages. You may not republish our content as your
        own, or use our name, logo or imagery to imply an association that does
        not exist, without written permission.
      </p>
      <p>
        If you believe content on this site infringes your rights, email{" "}
        <a href="mailto:info@pristiqbuild.com">info@pristiqbuild.com</a> with
        details and we will look into it promptly.
      </p>

      <h2>Availability</h2>
      <p>
        We try to keep the site available and accurate, but we do not guarantee
        it will be uninterrupted or error-free. We may change, suspend or
        withdraw any part of it without notice.
      </p>

      <h2>Links to other sites</h2>
      <p>
        Where we link to a third-party website, we do not control it and are not
        responsible for its content or its privacy practices.
      </p>

      <h2>Liability</h2>
      <p>
        To the extent permitted by Nigerian law, we are not liable for indirect
        or consequential loss, or for loss of profit, revenue or anticipated
        savings, arising from your use of this website. Nothing in these terms
        limits liability for death or personal injury caused by negligence, or
        for fraud.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the Federal Republic of Nigeria,
        and the courts of Nigeria have exclusive jurisdiction over any dispute
        arising from them.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms. The date at the top shows when they last
        changed, and the version published here is the one that applies.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms:{" "}
        <a href="mailto:info@pristiqbuild.com">info@pristiqbuild.com</a> or{" "}
        <a href="tel:+2348130272706">+234 813 027 2706</a>.
      </p>

      <p className="mt-12">
        See also our <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}
