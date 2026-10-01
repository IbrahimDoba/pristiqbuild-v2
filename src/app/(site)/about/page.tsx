import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { WA, whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "PristiqBuild was founded in Abuja in 2023 by three engineers and builders. More than 25 LGS roofing projects delivered, led by a COREN-registered engineer and NIOB-member site leadership.",
  alternates: { canonical: "/about" },
};

const delivered = [
  {
    name: "Maitama and Akure residential roofing",
    detail: "Engineered LGS roofs for private residences in Abuja and Ondo State.",
  },
  {
    name: "Popville Homes estate roofing",
    detail: "A 24-unit LGS roofing contract at Popville, Mabushi.",
  },
  {
    name: "NITP Secretariat",
    detail:
      "A hybrid structural roof: hot-rolled I-beam primaries with LGS secondary trusses.",
  },
  {
    name: "Breeze Point Estate",
    detail: "Five terrace duplexes in Kubwa, built in conventional construction.",
  },
  {
    name: "Opulence Heights",
    detail: "A villa development at Dawaki Hillside, in joint venture with EFAB Properties.",
  },
];

const leaders = [
  {
    name: "Yusuf Muhammed Doba",
    initials: "YD",
    role: "CEO & Co-Founder",
    bio: "Leads project delivery and client relationships.",
    credential: "NIOB member",
  },
  {
    name: "Najibu Auwalu Namadina",
    initials: "NN",
    role: "CTO & Co-Founder",
    bio: "Oversees engineering and technical delivery across every LGS and structural project.",
    credential: "COREN registered",
  },
  {
    name: "Abdulaziz Yakubu",
    initials: "AY",
    role: "COO & Co-Founder",
    bio: "Runs day-to-day operations and site execution.",
    credential: "NIOB member",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="bg-deep-steel text-white">
        <div className="container-custom pt-36 pb-16 md:pt-44 md:pb-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-silver/80 mb-4">
            About PristiqBuild
          </p>
          <h1 className="heading-xl max-w-4xl">
            Founded in 2023 by three engineers and builders.
          </h1>
        </div>
      </section>

      <section className="section-padding border-b border-steel-200" aria-labelledby="story-heading">
        <div className="container-custom grid lg:grid-cols-12 gap-10">
          <h2 id="story-heading" className="heading-md text-steel-900 lg:col-span-4">
            Our story
          </h2>
          <p className="body-lg text-steel-700 lg:col-span-8 max-w-3xl">
            PristiqBuild was founded to bring engineered Light Gauge Steel
            construction to Nigerian building. We started with LGS roofing, and
            it&apos;s become the core of what we do: we&apos;ve now delivered more
            than 25 roofing projects across Abuja and beyond. We&apos;re actively
            working toward our original vision, full modular construction built
            in our own facility, while we continue to take on structural steel
            and conventional construction work for clients today.
          </p>
        </div>
      </section>

      <section className="section-padding border-b border-steel-200" aria-labelledby="delivered-heading">
        <div className="container-custom grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 id="delivered-heading" className="heading-md text-steel-900 mb-6">
              What we&apos;ve delivered
            </h2>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-semibold text-primary-700 hover:text-primary-800 transition-colors"
            >
              See all projects
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="lg:col-span-8 border-t border-steel-200">
            {delivered.map((item) => (
              <li
                key={item.name}
                className="grid sm:grid-cols-12 gap-2 sm:gap-6 py-6 border-b border-steel-200"
              >
                <h3 className="font-display font-semibold text-lg text-steel-900 sm:col-span-5">
                  {item.name}
                </h3>
                <p className="text-steel-600 sm:col-span-7">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="leadership"
        className="section-padding border-b border-steel-200 scroll-mt-24"
        aria-labelledby="leadership-heading"
      >
        <div className="container-custom">
          <h2 id="leadership-heading" className="heading-md text-steel-900 mb-10">
            Leadership
          </h2>
          <ul className="grid md:grid-cols-3 border-t border-l border-steel-200">
            {leaders.map((person) => (
              <li key={person.name} className="p-8 border-r border-b border-steel-200">
                <div
                  className="w-16 h-16 rounded-full bg-primary-700 text-white flex items-center justify-center font-display font-bold text-xl mb-6"
                  aria-hidden="true"
                >
                  {person.initials}
                </div>
                <h3 className="heading-sm text-steel-900">{person.name}</h3>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary-700 mt-1 mb-4">
                  {person.role}
                </p>
                <p className="text-steel-700 leading-relaxed mb-4">{person.bio}</p>
                <p className="text-sm text-steel-500">{person.credential}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="compliance-heading">
        <div className="container-custom grid lg:grid-cols-12 gap-10">
          <h2 id="compliance-heading" className="heading-md text-steel-900 lg:col-span-4">
            Engineering &amp; Compliance
          </h2>
          <p className="body-lg text-steel-700 lg:col-span-8 max-w-3xl">
            Our technical work is led by a COREN-registered engineer and
            NIOB-member site leadership, so every LGS and structural job is
            specified, reviewed and signed off by qualified professionals, not
            just built by trades.
          </p>
        </div>
      </section>

      <section className="bg-deep-steel text-white">
        <div className="container-custom py-16 flex flex-wrap items-center justify-between gap-6">
          <p className="heading-sm max-w-xl">
            Have a project in mind? Talk to the people who will build it.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={whatsappLink(WA.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 bg-white text-primary-800 rounded-lg font-semibold hover:bg-silver transition-colors"
            >
              <MessageCircle size={20} aria-hidden="true" />
              Chat on WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 border border-white/40 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Send project details
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
