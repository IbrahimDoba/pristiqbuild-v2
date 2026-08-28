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
        question: "What is modular construction?",
        answer:
          "Modular construction is an innovative building method where structures are built using prefabricated modules manufactured in a controlled factory environment. These modules are then transported to the construction site and assembled. This approach offers significant advantages in speed, quality control, and cost efficiency compared to traditional construction methods.",
      },
      {
        question: "Why choose PristiqBuild over traditional construction companies?",
        answer:
          "PristiqBuild offers several key advantages: 50-60% faster construction time, superior quality control through factory manufacturing, reduced material waste by up to 75%, precise engineering with Light Steel Gauge technology, integration of AR/VR for project visualization, and smart building capabilities. Our modular approach also means fewer weather delays and more predictable timelines.",
      },
      {
        question: "What types of projects does PristiqBuild handle?",
        answer:
          "We handle a wide range of projects including residential homes (single-family and multi-family), commercial buildings, industrial facilities, educational institutions, healthcare facilities, and mixed-use developments. From small roofing projects to large-scale estates, we have the expertise and capacity to deliver.",
      },
    ],
  },
  {
    category: "Light Steel Gauge (LGS)",
    questions: [
      {
        question: "What is Light Steel Gauge framing?",
        answer:
          "Light Steel Gauge (LGS) framing uses precision-engineered cold-formed steel sections as the structural framework for buildings. Unlike traditional timber or heavy steel, LGS offers superior strength-to-weight ratio, dimensional stability, termite resistance, and fire resistance. All components are manufactured to exact specifications in our facility.",
      },
      {
        question: "Is LGS construction safe and durable?",
        answer:
          "Absolutely! LGS structures meet and exceed all Nigerian building codes and international standards. Steel doesn't warp, twist, or shrink like wood, ensuring long-term structural integrity. LGS buildings are highly resistant to earthquakes, termites, rot, and fire. When properly designed and installed, they can last 100+ years with minimal maintenance.",
      },
      {
        question: "How does LGS compare to traditional timber framing?",
        answer:
          "LGS offers numerous advantages over timber: superior strength and durability, resistance to termites and rot, non-combustible (fire-resistant), dimensionally stable (no warping or twisting), faster installation (60% quicker), reduced waste, consistent quality, and better suited for Nigeria's climate. While initial material cost may be slightly higher, the long-term benefits far outweigh this.",
      },
    ],
  },
  {
    category: "Project Timeline & Process",
    questions: [
      {
        question: "How long does a typical project take?",
        answer:
          "Timeline varies by project scope, but modular construction is significantly faster than traditional methods. A typical residential home can be completed in 3-6 months (vs 12-18 months traditionally). Commercial projects of 5,000 sqm can be completed in 6-12 months. Roofing projects typically take 1-4 weeks. We provide detailed timelines during initial consultation.",
      },
      {
        question: "What is the construction process like?",
        answer:
          "Our process includes: 1) Initial Consultation & Site Assessment, 2) Design & Engineering (with AR/VR visualization), 3) Permit Acquisition, 4) Factory Manufacturing of modules, 5) Foundation preparation (concurrent with manufacturing), 6) Module transport and assembly on-site, 7) Final connections and finishing, 8) Quality inspection and handover. We keep clients informed at every stage.",
      },
      {
        question: "Can I make changes during construction?",
        answer:
          "Changes are easiest during the design phase before manufacturing begins. Once modules are in production, modifications become more complex and may affect timeline and cost. However, we build flexibility into our process where possible. We encourage thorough design review using our AR/VR visualization tools to finalize all details upfront.",
      },
    ],
  },
  {
    category: "Cost & Financing",
    questions: [
      {
        question: "Is modular construction more expensive?",
        answer:
          "Modular construction is typically more cost-effective overall. While per-square-meter costs may be comparable to high-quality traditional construction, you save significantly on: reduced construction time (lower financing costs), minimal waste, predictable pricing (fewer surprises), reduced labor costs, and earlier occupancy (start generating returns sooner). We provide transparent, detailed quotes for every project.",
      },
      {
        question: "Do you offer financing options?",
        answer:
          "We work with several financial institutions that understand modular construction and can offer favorable financing terms. We can connect you with our banking partners and help prepare documentation to support your financing application. Payment is typically structured in milestones aligned with project phases.",
      },
      {
        question: "What's included in your pricing?",
        answer:
          "Our comprehensive quotes include: architectural and engineering design, manufacturing of all structural components, transportation to site, assembly and installation, structural connections, specified finishes, project management, and quality assurance. We provide itemized breakdowns so you understand exactly what you're paying for. Additional items like land preparation, utilities connection, and certain premium finishes are quoted separately.",
      },
    ],
  },
  {
    category: "Technology & Innovation",
    questions: [
      {
        question: "What is AR/VR visualization and how does it help?",
        answer:
          "Our Augmented Reality (AR) and Virtual Reality (VR) solutions let you experience your building before construction begins. Walk through rooms, see finishes, test layouts, and make informed decisions. This technology eliminates surprises, reduces change orders, and ensures you're completely satisfied with the design before we start building. It's like a test drive for your building!",
      },
      {
        question: "What are smart building features?",
        answer:
          "Our smart building integration includes: automated climate control, intelligent lighting systems, security and access control, energy monitoring and management, water leak detection, integrated home automation, and IoT-ready infrastructure. These features can be customized based on your needs and budget, making your building more efficient, secure, and comfortable.",
      },
      {
        question: "How do you ensure quality in factory manufacturing?",
        answer:
          "Our controlled factory environment enables rigorous quality control impossible on traditional construction sites. Every component undergoes: precision cutting with CNC machinery, quality inspection at multiple stages, testing for structural integrity, protection from weather during manufacturing, and detailed documentation. This results in superior quality and consistency across all projects.",
      },
    ],
  },
  {
    category: "Sustainability & Environment",
    questions: [
      {
        question: "How sustainable is modular construction?",
        answer:
          "Modular construction is significantly more sustainable: 75% less material waste, reduced energy consumption during construction, steel is 100% recyclable, minimal site disturbance, opportunity for incorporating solar power and rainwater harvesting, better insulation = lower operational energy use, and precision manufacturing reduces errors and waste. We're committed to building Nigeria's future responsibly.",
      },
      {
        question: "Can you incorporate renewable energy?",
        answer:
          "Yes! We regularly integrate solar power systems, rainwater harvesting, energy-efficient HVAC systems, LED lighting, and other sustainable features. Our design team can help you maximize energy efficiency and reduce environmental impact while staying within budget. Many clients achieve significant long-term savings through these investments.",
      },
    ],
  },
  {
    category: "Maintenance & Support",
    questions: [
      {
        question: "What warranty do you provide?",
        answer:
          "We provide comprehensive warranties covering: structural framework (10 years), waterproofing (5 years), workmanship (2 years), and manufacturer warranties on specific components (varies by product). We also offer extended warranty packages and maintenance agreements for added peace of mind.",
      },
      {
        question: "Do you provide post-construction support?",
        answer:
          "Absolutely! We provide: detailed maintenance guidelines, technical support, inspection services, warranty service, expansion/modification consulting, and priority service for existing clients. We view our relationship with clients as long-term partnerships, not just transactions.",
      },
    ],
  },
];

/** Flattened, for schema and search. */
export const allFaqs: FaqEntry[] = faqCategories.flatMap((c) => c.questions);
