/**
 * FAQ content.
 *
 * Lifted out of the page component so the same source can feed both the
 * rendered accordion and the FAQPage structured data. Keeping two copies in
 * step by hand is how schema drifts away from what the page actually says.
 */
export type FaqEntry = { question: string; answer: string };
export type FaqCategory = { category: string; questions: FaqEntry[] };

export const faqCategories = [
  {
    category: "General Information",
    questions: [
      {
        question: "What does PristiqBuild do today?",
        answer:
          "Our core work is engineered Light Gauge Steel (LGS) roofing: we engineer, fabricate, transport, install and inspect the finished roof. We have delivered more than 25 LGS roofing projects across Abuja and beyond. We also take on structural steel and conventional construction work, and we co-develop residential projects such as Opulence Heights and Breeze Point Estate.",
      },
      {
        question: "Do you deliver full modular buildings?",
        answer:
          "Not yet, and we would rather say so plainly. Full modular construction, with factory-built components assembled on site, is where we are headed. Today we have completed small modular-style builds such as an 18 sqm LGS site office with fibre-cement cladding and roofing. The next step is our own fabrication facility, which will enable full modular residential and commercial buildings.",
      },
      {
        question: "Why choose PristiqBuild?",
        answer:
          "Every LGS roof we build is engineered for its specific geometry and loads before anything is fabricated, cut off-site under controlled conditions, and inspected against the original design before handover. Our technical work is led by a COREN-registered engineer and NIOB-member site leadership, so each job is specified, reviewed and signed off by qualified professionals.",
      },
      {
        question: "What types of projects do you take on?",
        answer:
          "Residential, commercial, industrial and institutional LGS roofing (for example, the hybrid structural roof at the NITP Secretariat in Wuse Zone 5), structural steel work, and conventional construction. Tell us the scope and site and we will come back with a technical assessment.",
      },
    ],
  },
  {
    category: "Light Gauge Steel (LGS)",
    questions: [
      {
        question: "What is Light Gauge Steel framing?",
        answer:
          "Light Gauge Steel (LGS) framing uses cold-formed steel sections, such as C-channels and purlins, as the structural frame. Unlike timber, steel does not rot and is not attacked by termites, and the sections are formed to consistent dimensions.",
      },
      {
        question: "What steel do you specify?",
        answer:
          "We specify G550 high-tensile galvanized steel for our LGS structures and roofing. We are finalizing supplier mill certification for this specification and are happy to share documentation on request.",
      },
      {
        question: "How does LGS compare to a timber roof?",
        answer:
          "LGS does not rot, warp or get eaten by termites, and because members are fabricated to the engineered design, there is far less offcut waste. On our Akure Residence roof (1,080 sqm, 6.8 tonnes of G550 steel) waste was 75% lower than a comparable timber roof. Costs depend on span, geometry and site, so we quote each roof individually.",
      },
    ],
  },
  {
    category: "Project Timeline & Process",
    questions: [
      {
        question: "How long does an LGS roof take?",
        answer:
          "It depends on roof area, geometry and site access. We give you a schedule after the engineering and design stage, once the actual structure has been measured and the truss layout is drawn.",
      },
      {
        question: "What is your process for an LGS roof?",
        answer:
          "Nine stages: 1) Engineering, span and load calculation for your roof geometry; 2) Design, truss and purlin layout drawn to fit the structure; 3) Specification of gauge, grade and coating; 4) Fabrication of C-channels and purlins off-site; 5) Ground assembly of trusses where the project allows; 6) Transport to site in install order; 7) Installation by a dedicated crew; 8) Site supervision throughout install; 9) Quality control inspection against the original design before handover.",
      },
      {
        question: "Can I make changes once work has started?",
        answer:
          "Changes are easiest during engineering and design, before steel is fabricated. Once members have been cut to the design, changes may affect cost and schedule, so we encourage a thorough review of the drawings before fabrication begins.",
      },
    ],
  },
  {
    category: "Cost & Pricing",
    questions: [
      {
        question: "How much does an LGS roof cost?",
        answer:
          "Every roof is engineered for its own spans and loads, so we price after an assessment rather than quoting a flat rate. Send us the scope and site on WhatsApp to request a roof assessment.",
      },
      {
        question: "How is Opulence Heights priced?",
        answer:
          "Pricing is handled directly with our sales team. Payment plans and unit availability vary by phase, so we walk every enquirer through current options rather than publishing a fixed number online.",
      },
    ],
  },
  {
    category: "Developments",
    questions: [
      {
        question: "Are the smart-home, solar and EV features at Opulence Heights built yet?",
        answer:
          "No. Solar power with battery storage, smart-home app controls and EV charging are planned features that have not been built yet. Phase 1 is at foundation stage. The construction method changed from LGS to conventional reinforced concrete; the planned smart-home, solar and EV features were not dropped as part of that change.",
      },
      {
        question: "What is Breeze Point Estate?",
        answer:
          "Five terrace duplexes in Kubwa, Abuja, developed in joint venture with the landowner using conventional construction. The project is nearing completion.",
      },
    ],
  },
];

/** Flattened, for schema and search. */
export const allFaqs: FaqEntry[] = faqCategories.flatMap((c) => c.questions);
