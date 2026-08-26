"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";
import Image from "next/image";
import {
  PenTool,
  FileCheck,
  Factory,
  MapPin,
  Hammer,
  ClipboardCheck,
  Key,
} from "lucide-react";

const steps = [
  {
    icon: PenTool,
    number: "01",
    title: "Planning & Design",
    description:
      "Collaborative design sessions using VR/AR technology. We create detailed 3D models and BIM documentation tailored to your vision and requirements.",
    duration: "2-4 weeks",
    highlights: ["VR walkthroughs", "Custom design", "Cost estimation"],
    image: "/LGS/lgs3.jpeg",
  },
  {
    icon: FileCheck,
    number: "02",
    title: "Permits & Approvals",
    description:
      "We handle all regulatory requirements, building permits, and necessary approvals while you focus on your vision.",
    duration: "3-6 weeks",
    highlights: ["Documentation", "Regulatory compliance", "Local permits"],
    image: "/LGS/shaking-hands.jpg",
  },
  {
    icon: Factory,
    number: "03",
    title: "Prefabrication",
    description:
      "Precision manufacturing in our controlled factory environment. Each module is built to exact specifications with rigorous quality checks.",
    duration: "4-8 weeks",
    highlights: ["Factory precision", "Quality control", "Parallel production"],
    image: "/LGS/construction.jpg",
  },
  {
    icon: MapPin,
    number: "04",
    title: "Site Development",
    description:
      "Foundation work and site preparation happen simultaneously with factory production, significantly reducing overall timeline.",
    duration: "2-4 weeks",
    highlights: ["Foundation work", "Utility connections", "Site preparation"],
    image: "/LGS/lgs5.jpeg",
  },
  {
    icon: Hammer,
    number: "05",
    title: "On-Site Assembly",
    description:
      "Rapid assembly of prefabricated modules on-site. Our experienced teams ensure precise alignment and secure connections.",
    duration: "1-3 weeks",
    highlights: ["Rapid assembly", "Minimal disruption", "Expert installation"],
    image: "/LGS/lgs2.jpeg",
  },
  {
    icon: ClipboardCheck,
    number: "06",
    title: "Quality Control",
    description:
      "Comprehensive inspection and testing of all systems. We ensure everything meets our exacting standards before handover.",
    duration: "1-2 weeks",
    highlights: ["Final inspections", "System testing", "Finishing touches"],
    image: "/LGS/lgs1.jpeg",
  },
  {
    icon: Key,
    number: "07",
    title: "Handover",
    description:
      "Complete documentation, warranties, and training provided. Your project is delivered on time, on budget, and beyond expectations.",
    duration: "1 week",
    highlights: ["Documentation", "Warranty", "Client training"],
    image: "/LGS/handover6.jpg",
  },
];

const outcomes = [
  { value: "30-50%", label: "Faster than traditional", sub: "Construction timeline" },
  { value: "20-30%", label: "Cost savings", sub: "Compared to conventional" },
  { value: "90%", label: "Factory built", sub: "Before it reaches site" },
];

/**
 * The build process, as one horizontal run.
 *
 * This was seven stacked left-image / right-text rows, 4,184px tall, which was
 * 35% of the homepage and the same layout family repeated seven times. The
 * steps are a sequence, so panning through them left to right says what the
 * content actually is, and the numbering finally earns its place.
 *
 * Three behaviours, by capability rather than by guesswork:
 *   desktop, motion allowed  pinned section, scroll drives the pan
 *   touch or narrow          native horizontal scroll-snap, no hijack
 *   reduced motion           same native scroll, nothing pinned
 *
 * Scroll hijacking on a phone is hostile, so it is never enabled there.
 */
export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = trackRef.current;
          const section = sectionRef.current;
          if (!track || !section) return;

          const distance = () => track.scrollWidth - window.innerWidth;

          const tween = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 1,
              // Widths depend on the viewport, so the distance has to be
              // recomputed rather than baked in at creation.
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                // Written straight to a custom property. Routing a per-frame
                // value through React state would re-render the whole section
                // on every scroll tick.
                railRef.current?.style.setProperty(
                  "--progress",
                  String(self.progress)
                );

                // Panels plus the closing stats panel share the track, so the
                // counter maps progress across steps only.
                const step = Math.min(
                  steps.length,
                  Math.max(1, Math.round(self.progress * steps.length) || 1)
                );
                if (counterRef.current) {
                  counterRef.current.textContent = String(step).padStart(2, "0");
                }
              },
            },
          });

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
          };
        }
      );

      // Panel images load lazily, so the pinned distance is wrong until they
      // have settled. One refresh after load corrects it.
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative bg-steel-950 text-white overflow-hidden lg:min-h-[100dvh] lg:flex lg:flex-col lg:justify-center py-20 lg:pt-32 lg:pb-12"
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Left-aligned, unlike every other section header on the page. */}
      <header className="container-custom w-full relative z-10 mb-10 lg:mb-12">
        <div className="max-w-2xl">
          <h2 className="heading-lg mb-4">
            How We <span className="text-secondary-400">Build</span>
          </h2>
          <p className="body-lg text-white/70">
            Seven stages, start to handover. Factory work and site work run in
            parallel, which is where the time saving comes from.
          </p>
        </div>
      </header>

      {/*
        One track for all three behaviours. On desktop GSAP translates it and
        overflow stays hidden; below lg the browser scrolls it natively with
        snap points, which is what a thumb expects.
      */}
      <div className="relative z-10 lg:overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-5 lg:gap-6 px-6 lg:px-[max(1.5rem,calc((100vw-1400px)/2))] overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-4 lg:pb-0"
        >
          {steps.map((step) => (
            <article
              key={step.number}
              className="snap-start shrink-0 w-[82vw] sm:w-[62vw] md:w-[46vw] lg:w-[clamp(320px,30vw,420px)] rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(max-width: 1024px) 82vw, 420px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-steel-950 via-steel-950/25 to-transparent" />
                <span className="absolute top-4 left-4 inline-flex items-center justify-center w-11 h-11 rounded-lg bg-steel-950/80 backdrop-blur-sm border border-white/15 font-display font-bold tabular text-secondary-400">
                  {step.number}
                </span>
                <step.icon
                  className="absolute bottom-4 right-4 w-6 h-6 text-white/70"
                  aria-hidden="true"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display font-semibold text-xl mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-white/65 leading-relaxed mb-5">
                  {step.description}
                </p>

                <ul className="flex flex-wrap gap-2 mb-5 list-none p-0 m-0">
                  {step.highlights.map((h) => (
                    <li
                      key={h}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/10 text-xs text-white/70"
                    >
                      {h}
                    </li>
                  ))}
                </ul>

                <p className="mt-auto text-xs uppercase tracking-wider text-white/45 tabular">
                  {step.duration}
                </p>
              </div>
            </article>
          ))}

          {/* The pan pays off here rather than just stopping. */}
          <article className="snap-start shrink-0 w-[82vw] sm:w-[62vw] md:w-[46vw] lg:w-[clamp(340px,32vw,460px)] rounded-2xl bg-primary-700 border border-primary-600 p-8 flex flex-col justify-center">
            <h3 className="font-display font-semibold text-2xl mb-8">
              What that adds up to
            </h3>
            <dl className="space-y-6 m-0">
              {outcomes.map((o) => (
                <div key={o.label}>
                  <dt className="font-display font-bold text-4xl tabular leading-none mb-1.5">
                    {o.value}
                  </dt>
                  <dd className="m-0">
                    <span className="block font-medium">{o.label}</span>
                    <span className="block text-sm text-white/60">{o.sub}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
      </div>

      {/* Progress rail and step counter.
          A counter, not a "scroll to explore" prompt: it says where you are in
          the sequence, which the reader cannot otherwise tell once the section
          is pinned. Telling someone to scroll is not information. */}
      <div className="container-custom w-full relative z-10 mt-10 hidden lg:block">
        <div className="flex items-center gap-5">
          <div
            ref={railRef}
            className="relative h-0.5 flex-1 rounded-full bg-white/15 overflow-hidden"
            style={{ ["--progress" as string]: "0" }}
          >
            <span
              className="absolute inset-0 bg-secondary-400 origin-left rounded-full"
              style={{ transform: "scaleX(var(--progress))" }}
            />
          </div>
          <p className="font-display font-semibold tabular text-sm text-white/70 whitespace-nowrap">
            <span ref={counterRef}>01</span>
            <span className="text-white/30"> / 0{steps.length}</span>
          </p>
        </div>
      </div>

    </section>
  );
}
