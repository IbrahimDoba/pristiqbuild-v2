import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import RoofCalculator from "@/components/roof-calculator/RoofCalculator";
import { COVERINGS, RATES, type Covering } from "@/lib/roof-estimate";
import { WA, whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "LGS Roof Cost Calculator",
  description:
    "Estimate the cost of a light gauge steel (LGS) roof in Nigeria: G550 steel frame, installation, covering and gutters, from your building's footprint, roof shape and location.",
  alternates: { canonical: "/cost-calculator" },
};

const naira = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 });
const span = ([low, high]: readonly [number, number], unit = "") =>
  `${naira.format(low)} to ${naira.format(high)}${unit}`;

/** The published method, read from the same rate table the calculator uses. */
const method = [
  {
    title: "Roof area",
    body: `Your footprint plus a ${RATES.overhang * 1000} mm eaves overhang all round, then enlarged for the pitch: a 25° roof has about 10% more surface than the plan it covers.`,
  },
  {
    title: "Steel",
    body: `Kilograms of G550 per square metre of plan, by building type and roof shape, at ${span(RATES.steelPerKg, " per kg")} roll-formed with fixings. Our Akure Residence roof used 6.8 t over 1,080 m².`,
  },
  {
    title: "Installation",
    body: `${span(RATES.installPerM2, " per m²")} of roof surface, plus ${Math.round(RATES.installPerStorey * 100)}% for each storey above the first.`,
  },
  {
    title: "Engineering",
    body: `Load calculation, truss layout and drawings, at ${Math.round(RATES.engineeringShare * 100)}% of the frame with a minimum of ${naira.format(RATES.engineeringMin)}.`,
  },
  {
    title: "Covering",
    body: (Object.keys(COVERINGS) as Covering[])
      .filter((key) => key !== "none")
      .map((key) => `${COVERINGS[key].label}: ${span(RATES.coveringPerM2[key], "/m²")}`)
      .join(". ")
      .concat(". Supplied and fixed, with cutting waste and ridge, hip and flashing pieces added for the shape."),
  },
  {
    title: "Outside Abuja",
    body: `Transport and crew upkeep add ${Math.round(RATES.logistics.nearby[0] * 100)}-${Math.round(RATES.logistics.nearby[1] * 100)}% in neighbouring states and ${Math.round(RATES.logistics.further[0] * 100)}-${Math.round(RATES.logistics.further[1] * 100)}% further afield.`,
  },
];

const changesThePrice = [
  "Long clear spans, which need deeper trusses and heavier sections",
  "Valleys, dormers and changes of level, which add members and cutting",
  "Site access, crane or scaffolding needs, and how far the steel travels",
  "The covering's brand, gauge and profile",
  "Steel prices on the day we buy, which move with the naira",
];

export default function CostCalculatorPage() {
  return (
    <div className="bg-white">
      <PageHero image="/heroes/cost-calculator.jpg">
        <p className="text-sm font-semibold uppercase tracking-wider text-silver/80 mb-4">
          Roof cost calculator
        </p>
        <h1 className="heading-xl max-w-3xl mb-6 text-balance">What will your LGS roof cost?</h1>
        <p className="body-lg text-white/85 max-w-2xl">
          A planning range for an engineered G550 steel roof, from the building&apos;s
          footprint, the roof&apos;s shape and where the site is. Ours to build, start to
          handover.
        </p>
      </PageHero>

      <section className="section-padding" aria-label="Calculator">
        <div className="container-custom">
          <RoofCalculator />
        </div>
      </section>

      <section className="section-padding bg-steel-50 border-y border-steel-200" aria-labelledby="method-heading">
        <div className="container-custom grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-steel-500 mb-3">The method</p>
            <h2 id="method-heading" className="heading-md text-steel-900 mb-4">
              How the figure is worked out
            </h2>
            <p className="text-steel-600">
              The same take-off a quantity surveyor does, with rates from our own jobs and
              current Abuja supplier prices. Ranges, because no two roofs are framed alike.
            </p>
          </div>
          <dl className="lg:col-span-8 border-t border-steel-200">
            {method.map((m) => (
              <div key={m.title} className="grid sm:grid-cols-[10rem_1fr] gap-x-6 gap-y-1 py-5 border-b border-steel-200">
                <dt className="font-display font-semibold text-steel-900">{m.title}</dt>
                <dd className="text-steel-600 leading-relaxed">{m.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="changes-heading">
        <div className="container-custom grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 id="changes-heading" className="heading-md text-steel-900">
              What moves the final price
            </h2>
          </div>
          <div className="lg:col-span-8">
            <ul className="space-y-3 mb-8">
              {changesThePrice.map((item) => (
                <li key={item} className="flex gap-3 text-steel-700">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-primary-700" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-steel-600">
              Not included: VAT, walls, ceilings, electrical work and anything below the wall
              plate. See the{" "}
              <Link href="/terms-of-service" className="text-primary-700 underline underline-offset-4 hover:text-primary-800">
                terms
              </Link>{" "}
              for how estimates may be used.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-deep-steel text-white">
        <div className="container-custom py-16 flex flex-wrap items-center justify-between gap-6">
          <p className="heading-sm max-w-xl">
            For a firm price, we measure the building and engineer the roof.
          </p>
          <a
            href={whatsappLink(WA.roofAssessment)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 bg-white text-primary-800 rounded-lg font-semibold hover:bg-silver transition-colors"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Request a Roof Assessment
          </a>
        </div>
      </section>
    </div>
  );
}
