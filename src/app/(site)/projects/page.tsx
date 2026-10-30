import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { MessageCircle } from "lucide-react";
import { getPublishedPortfolio } from "@/lib/portfolio";
import ProjectsIndex from "@/components/portfolio/ProjectsIndex";
import { WA, whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "LGS roofing, structural steel and development work PristiqBuild has delivered or is delivering, across Abuja and beyond.",
  alternates: { canonical: "/projects" },
};

// Rebuilt at most hourly, and immediately whenever /admin/portfolio saves
// (the actions call revalidatePath). Visitors never wait on the database.
export const revalidate = 3600;

export default async function ProjectsPage() {
  const items = await getPublishedPortfolio();

  return (
    <div className="bg-white">
      <PageHero image="/heroes/projects.jpg">
        <p className="text-sm font-semibold uppercase tracking-wider text-silver/80 mb-4">
          Projects
        </p>
        <h1 className="heading-xl max-w-3xl mb-6">Work we have delivered.</h1>
        <p className="body-lg text-white/85 max-w-2xl">
          Every project here is real work we&apos;ve delivered or are currently
          delivering. This list updates directly, no rebuild needed each time a
          job wraps up.
        </p>
      </PageHero>

      <ProjectsIndex items={items} />

      <section className="bg-deep-steel text-white">
        <div className="container-custom py-16 flex flex-wrap items-center justify-between gap-6">
          <p className="heading-sm max-w-xl">
            Have a roofing, structural or development project in mind?
          </p>
          <a
            href={whatsappLink(WA.projectScope)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 bg-white text-primary-800 rounded-lg font-semibold hover:bg-silver transition-colors"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Tell us the scope
          </a>
        </div>
      </section>
    </div>
  );
}
