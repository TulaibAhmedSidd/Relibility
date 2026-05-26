export type NavItem = {
  label: string;
  href: string;
};

export type HeroSection = {
  type: "hero";
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: NavItem;
  secondaryCta: NavItem;
  highlights: string[];
  image?: {
    src: string;
    alt: string;
  };
};

export type StatsSection = {
  type: "stats";
  eyebrow: string;
  title: string;
  description: string;
  items: Array<{
    label: string;
    value: number;
    suffix?: string;
  }>;
};

export type CardsSection = {
  type: "cards";
  eyebrow: string;
  title: string;
  description: string;
  variant: "services" | "industries" | "caseStudies" | "links";
  items: Array<{
    title: string;
    description: string;
    href?: string;
    meta?: string;
    image?: {
      src: string;
      alt: string;
    };
  }>;
};

export type TimelineSection = {
  type: "timeline";
  eyebrow: string;
  title: string;
  description: string;
  steps: Array<{
    title: string;
    description: string;
  }>;
};

export type OfferingsGridSection = {
  type: "offeringsGrid";
  eyebrow: string;
  title: string;
  description: string;
  columns: Array<{
    title: string;
    accent?: boolean;
    bullets: string[];
  }>;
};

export type TestimonialsSection = {
  type: "testimonials";
  eyebrow: string;
  title: string;
  description: string;
  items: Array<{
    quote: string;
    name: string;
    role: string;
  }>;
};

export type RichTextSection = {
  type: "richText";
  eyebrow: string;
  title: string;
  description: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ArticleListSection = {
  type: "articleList";
  eyebrow: string;
  title: string;
  description: string;
  articleSlugs: string[];
};

export type CtaSection = {
  type: "cta";
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: NavItem;
  secondaryCta: NavItem;
};

export type PageSection =
  | HeroSection
  | StatsSection
  | CardsSection
  | TimelineSection
  | OfferingsGridSection
  | TestimonialsSection
  | RichTextSection
  | ArticleListSection
  | CtaSection;

export type ContentEntry = {
  slug: string;
  aliases?: string[];
  title: string;
  description: string;
  kind: "page" | "post";
  category: string;
  date?: string;
  readTime?: string;
  tags?: string[];
  seo: {
    title: string;
    description: string;
  };
  sections: PageSection[];
};

export type SiteConfig = {
  company: {
    name: string;
    shortName: string;
    website: string;
    tagline: string;
    description: string;
    email: string;
    phones: string[];
    address: string;
    socialLinks: NavItem[];
    founder: {
      name: string;
      role: string;
      publications: string[];
    };
  };
  theme: {
    colors: Record<string, string>;
    gradients: Record<string, string>;
    radius: string;
    shadow: string;
    fonts: {
      sans: string;
      display: string;
      mono: string;
    };
  };
  navigation: {
    header: NavItem[];
    footer: NavItem[];
    utility: NavItem[];
    serviceGroups: Array<{
      title: string;
      items: NavItem[];
    }>;
  };
  services: Array<{
    title: string;
    slug: string;
    description: string;
    meta: string;
    aliases?: string[];
    image: {
      src: string;
      alt: string;
    };
  }>;
  industries: Array<{
    title: string;
    description: string;
  }>;
  process: Array<{
    title: string;
    description: string;
  }>;
  testimonials: Array<{
    quote: string;
    name: string;
    role: string;
  }>;
  entries: ContentEntry[];
  leadCapture: {
    stickyCtaLabel: string;
    rapidResponseTitle: string;
    rapidResponseDescription: string;
    formTitle: string;
    formDescription: string;
    trustCallouts: string[];
    industryOptions: string[];
  };
};

const serviceCards = [
  {
    title: "Risk Management in Design Transfer",
    slug: "design-transfer",
    aliases: ["risk-management-in-design-transfer"],
    description:
      "Reduce execution risk when designs move into manufacturing through disciplined transfer planning.",
    meta: "Design transfer, launch risk, and manufacturing readiness",
    image: {
      src: "/services/prevention.svg",
      alt: "Design transfer engineering illustration",
    },
  },
  {
    title: "Reliability Engineering & Analysis",
    slug: "analysis",
    aliases: ["reliability-engineering-analysis"],
    description:
      "Reliability programs that reduce field risk, accelerate learning, and strengthen launch confidence.",
    meta: "Strategy, modeling, and failure prevention",
    image: {
      src: "/services/analysis.svg",
      alt: "Reliability analysis illustration",
    },
  },
  {
    title: "Supplier Management Improve Quality",
    slug: "supplier-quality",
    aliases: ["supplier-management-improve-quality"],
    description:
      "Supplier development, incoming quality strategy, and escalation systems for global supply chains.",
    meta: "SQE leadership and containment workflows",
    image: {
      src: "/services/supplier.svg",
      alt: "Supplier quality illustration",
    },
  },
  {
    title: "Engineering Project Management",
    slug: "project-management",
    aliases: ["engineering-project-management"],
    description:
      "Coordinate engineering execution, decisions, and accountability around quality and reliability objectives.",
    meta: "Cross-functional program leadership",
    image: {
      src: "/services/manufacturing.svg",
      alt: "Engineering project management illustration",
    },
  },
  {
    title: "Manufacturing Process Control",
    slug: "process-control",
    aliases: ["manufacturing-process-control"],
    description:
      "Improve process capability and control strategy with engineering-led manufacturing discipline.",
    meta: "SPC, process capability, and control planning",
    image: {
      src: "/services/manufacturing.svg",
      alt: "Manufacturing process control illustration",
    },
  },
  {
    title: "Semiconductor Device Qualification",
    slug: "semiconductors",
    aliases: ["semiconductor-device-qualification"],
    description:
      "Qualification support for semiconductor devices, packaging, and reliability-sensitive changes.",
    meta: "Semiconductor qualification and change risk",
    image: {
      src: "/services/qualification.svg",
      alt: "Semiconductor qualification illustration",
    },
  },
  {
    title: "DFX, DFMEA, PFMEA",
    slug: "dfx-dfmea-pfmea",
    description:
      "Structured risk identification and mitigation across design, process, and launch transitions.",
    meta: "Cross-functional risk reduction",
    image: {
      src: "/services/analysis.svg",
      alt: "FMEA risk analysis illustration",
    },
  },
  {
    title: "ISO 9001-2015 Certification",
    slug: "iso-9001",
    description:
      "Support quality management system maturity, implementation, and disciplined ISO-aligned operating practices.",
    meta: "QMS implementation and audit readiness",
    image: {
      src: "/services/quality.svg",
      alt: "ISO quality systems illustration",
    },
  },
  {
    title: "Customer Complaints Resolution",
    slug: "complaint-resolution",
    description:
      "Respond to customer complaints with structured containment, root-cause rigor, and sustained closure.",
    meta: "Containment, CAPA, and response management",
    image: {
      src: "/services/quality.svg",
      alt: "Customer complaint resolution illustration",
    },
  },
  {
    title: "Packaging & Product Qualification",
    slug: "product-qualification",
    description:
      "Create evidence-backed qualification plans for packaging, assemblies, and release readiness decisions.",
    meta: "Qualification strategy and evidence packages",
    image: {
      src: "/services/qualification.svg",
      alt: "Product qualification illustration",
    },
  },
  {
    title: "Engineering Quality Control in US",
    slug: "quality-control",
    description:
      "Build robust quality control systems that improve consistency, containment, and customer confidence.",
    meta: "Quality control systems and execution",
    image: {
      src: "/services/quality.svg",
      alt: "Quality control illustration",
    },
  },
  {
    title: "Engineering Process Integration for Reliability and Quality",
    slug: "process-integration",
    description:
      "Align design, operations, and quality functions through integrated process planning and ownership.",
    meta: "Cross-functional integration and governance",
    image: {
      src: "/services/manufacturing.svg",
      alt: "Engineering process integration illustration",
    },
  },
  {
    title: "CQE & Supplier Management SQE",
    slug: "supplier-management",
    description:
      "Strengthen supplier quality engineering through better escalation, qualification, and relationship control.",
    meta: "CQE, SQE, and supplier development",
    image: {
      src: "/services/supplier.svg",
      alt: "Supplier management illustration",
    },
  },
  {
    title: "Prediction and Fatigue Life Estimates",
    slug: "prediction-and-fatigue",
    description:
      "Use engineering estimates and durability thinking to anticipate life limits and failure drivers earlier.",
    meta: "Durability estimates and fatigue planning",
    image: {
      src: "/services/analysis.svg",
      alt: "Prediction and fatigue illustration",
    },
  },
  {
    title: "Accelerated Life Testing Engineering",
    slug: "life-testing",
    description:
      "HALT, HASS, and accelerated test planning tailored to real operating profiles and expected service life.",
    meta: "Qualification, acceleration models, and decision support",
    image: {
      src: "/services/qualification.svg",
      alt: "Accelerated life testing illustration",
    },
  },
  {
    title: "Quality Manufacturing Process Controls, Yield Improvement",
    slug: "yield-improvement",
    description:
      "Improve yield with process understanding, defect reduction, and practical quality engineering controls.",
    meta: "Yield, defects, and manufacturing controls",
    image: {
      src: "/services/manufacturing.svg",
      alt: "Yield improvement illustration",
    },
  },
  {
    title: "Failure Analysis and Corrective Action",
    slug: "failure-analysis",
    description:
      "Investigate failures, isolate causes, and convert learning into corrective action that holds up operationally.",
    meta: "Root cause, corrective action, and closure",
    image: {
      src: "/services/analysis.svg",
      alt: "Failure analysis illustration",
    },
  },
  {
    title: "Engineering Prevention Over Inspection",
    slug: "prevention",
    description:
      "Shift quality effort upstream by preventing issues before they become recurring inspection or field problems.",
    meta: "Prevention, systemic quality, and design thinking",
    image: {
      src: "/services/prevention.svg",
      alt: "Engineering prevention illustration",
    },
  },
];

const serviceLookup = new Map(serviceCards.map((service) => [service.slug, service]));

const serviceGroupBlueprint = [
  ["design-transfer", "process-control", "complaint-resolution", "supplier-management", "yield-improvement"],
  ["analysis", "semiconductors", "product-qualification", "prediction-and-fatigue", "failure-analysis"],
  ["supplier-quality", "dfx-dfmea-pfmea", "quality-control", "life-testing", "prevention"],
  ["project-management", "iso-9001", "process-integration"],
];

const serviceGroups = serviceGroupBlueprint.map((group, index) => ({
  title: `Column ${index + 1}`,
  items: group.map((slug) => {
    const service = serviceLookup.get(slug);

    if (!service) {
      throw new Error(`Missing service config for ${slug}`);
    }

    return {
      label: service.title,
      href: `/${service.slug}`,
    };
  }),
}));

const industries = [
  {
    title: "Semiconductor",
    description:
      "Qualification rigor for components, packages, process changes, and reliability risk in advanced devices.",
  },
  {
    title: "Automotive",
    description:
      "Programs that support robust launches, design validation, and disciplined reliability growth.",
  },
  {
    title: "Aerospace",
    description:
      "Mission-aware engineering support for harsh environments, traceability, and disciplined review cycles.",
  },
  {
    title: "EV and Energy Storage",
    description:
      "Battery and electronics qualification strategies for safety, durability, and confidence at scale.",
  },
  {
    title: "Manufacturing",
    description:
      "Factory-floor quality systems, yield improvement, complaint containment, and long-term process capability.",
  },
  {
    title: "Telecom and Electronics",
    description:
      "Reliability, thermal, and lifecycle support for complex assemblies and fast-moving product families.",
  },
];

const processSteps = [
  {
    title: "Assessment",
    description:
      "Understand product context, failure risks, maturity, and business constraints before prescribing action.",
  },
  {
    title: "Analysis",
    description:
      "Prioritize technical risk with structured modeling, FMEA, field data review, and engineering judgement.",
  },
  {
    title: "Validation",
    description:
      "Design targeted test plans that create evidence instead of noise and connect directly to decisions.",
  },
  {
    title: "Optimization",
    description:
      "Convert findings into design, process, supplier, and documentation improvements with measurable impact.",
  },
  {
    title: "Implementation",
    description:
      "Embed controls, owner accountability, and launch readiness practices into the operating workflow.",
  },
  {
    title: "Long-term Support",
    description:
      "Maintain momentum through reviews, audits, metrics, and continuous reliability and quality improvement.",
  },
];

const testimonials = [
  {
    quote:
      "RQS quickly aligned our cross-functional teams around evidence, not assumptions, and helped us avoid a risky release.",
    name: "Director of Quality",
    role: "Fortune 500 electronics manufacturer",
  },
  {
    quote:
      "Their reliability guidance felt practical from day one. The work improved both our test strategy and executive confidence.",
    name: "VP of Engineering",
    role: "Automotive systems supplier",
  },
  {
    quote:
      "We brought RQS in for qualification support and kept them as a trusted advisor across process, supplier, and launch issues.",
    name: "Operations Leader",
    role: "High-volume manufacturing program",
  },
];

const sharedCtaSection: CtaSection = {
  type: "cta",
  eyebrow: "Start the Conversation",
  title: "Bring senior reliability and quality judgement into your next critical program.",
  description:
    "Whether you need a focused assessment or a long-term engineering partner, RQS can help your team move with more confidence.",
  primaryCta: { label: "Contact RQS", href: "/contact-us" },
  secondaryCta: { label: "Explore Services", href: "/professional-engineering-consultancy-services-in-usa" },
};

const consultancyOfferingsSection: OfferingsGridSection = {
  type: "offeringsGrid",
  eyebrow: "Consultancy Services Offered",
  title: "A broader consultancy menu.",
  description:
    "Product Qualification, Quality Management System and Implementation, Reliability Engineering and NPI System, Manufacturing Process Controls, Training and Education, Papers and Publications.",
  columns: [
    {
      title: "Product Qualification",
      bullets: [
        "Standards support across JEDEC, Bellcore GR1221, SR332, and related reliability frameworks.",
        "IPC, IEC, and MIL-standard aligned qualification planning for electronic products and assemblies.",
        "UL certification and EV battery qualification support for regulated product programs.",
        "Semiconductor device qualification for packaging, change control, and release confidence.",
        "Product qualification support spanning EVT, DVT, DMT, RDT, and release-readiness reviews.",
        "Package qualification and product qualification planning for high-consequence launches.",
      ],
    },
    {
      title: "Quality Management System and Implementation",
      bullets: [
        "Development and implementation of practical quality management systems.",
        "Customer Quality Engineering and Supplier Quality Engineering support.",
        "Quality yield improvement across design and manufacturing workflows.",
        "Qualification support for ISO 9001, ISO 14001, and aligned operating structures.",
        "Product quality engineering support for execution discipline and issue closure.",
        "Quality and reliability planning for lithium-ion batteries across EV and larger vehicle applications.",
      ],
    },
    {
      title: "Reliability Engineering and NPI System",
      accent: true,
      bullets: [
        "Reliability program design and implementation tailored to product maturity and field risk.",
        "Reliability engineering support specific to product needs, validation stages, and launch timing.",
        "Reliability tests, analysis, modeling, prediction, and useful-life characterization.",
        "Reliability maintainability and warranty-oriented learning loops for design improvement.",
        "Burn-in systems, ORT, RDT, HALT, HASS, and accelerated life test planning.",
        "Step-stress, corner reliability testing, fatigue life analysis, DFX, DFMEA, and PFMEA support.",
        "Reliability assessment for lithium-ion battery applications in automotive and related environments.",
      ],
    },
    {
      title: "Manufacturing Process Controls",
      bullets: [
        "Quality and reliability manufacturing control systems built for sustained execution.",
        "Manufacturing PCB and PCBA process guidance including AOI, screen printing, solder paste, reflow, and inspection readiness.",
        "IR process, yield improvement, SPC, and process control capability planning.",
        "Supplier management quality and data logging workflows for key product manufacturing.",
        "Comprehensive manufacturing review reporting and integration with supply-chain decision making.",
      ],
    },
    {
      title: "Training and Education",
      bullets: [
        "Comprehensive reliability and quality plan implementation education.",
        "Reliability and quality integration training for NPI processes from introduction through field use.",
        "Electronic cooling, thermal analysis, and product-specific cooling requirement training.",
        "Vibration analysis, test strategy, and vibration equipment selection guidance.",
        "Device and package qualification education aligned with JEDEC and MIL-oriented expectations.",
        "Cooling design support from system and chassis level down to PCBA and component constraints.",
      ],
    },
    {
      title: "Papers and Publications",
      bullets: [
        "Consultant-led technical papers, publications, and supporting engineering references are available on request.",
        "Contact the consultants to request publication topics, technical background, or speaking and workshop support.",
      ],
    },
  ],
};

export const siteConfig: SiteConfig = {
  company: {
    name: "Reliability Quality Solutions",
    shortName: "RQS",
    website: "https://reliabilityqualitysolutions.com",
    tagline: "Engineering reliability into every product decision.",
    description:
      "High-end engineering consultancy focused on reliability, quality, qualification, and new product introduction for complex products and demanding industries.",
    email: "shams.jawaid@reliabilityqualitysolutions.com",
    phones: ["+1 (408) 489-4208", "+1 (408) 497-8363"],
    address: "7931 Morning Queen Drive, Las Vegas, NV 89178, United States",
    socialLinks: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/shams-jawaid-b3863a15" },
      { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61588028445591" },
      { label: "Instagram", href: "https://www.instagram.com/reliability_quality_solutions/" },
    ],
    founder: {
      name: "Shams Jawaid",
      role: "Founder and Managing Director",
      publications: [
        "IEEE Annual Reliability Symposium papers",
        "Digital Equipment Corporation experience",
        "Quantum Corporation experience",
      ],
    },
  },
  theme: {
    colors: {
      primary: "#0B1F33",
      secondary: "#12395B",
      accent: "#00C2FF",
      dark: "#08111F",
      light: "#F5F9FC",
      neutral: "#D6E2EC",
      success: "#00B67A",
      warning: "#FFB547",
    },
    gradients: {
      hero: "linear-gradient(135deg, rgba(11,31,51,0.98), rgba(18,57,91,0.92) 48%, rgba(0,194,255,0.24))",
      panel: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(214,226,236,0.4))",
      accent: "linear-gradient(120deg, rgba(0,194,255,0.18), rgba(11,31,51,0.04))",
    },
    radius: "1.5rem",
    shadow: "0 32px 120px rgba(8, 17, 31, 0.18)",
    fonts: {
      sans: "var(--font-geist-sans)",
      display: "var(--font-geist-sans)",
      mono: "var(--font-geist-mono)",
    },
  },
  navigation: {
    header: [
      { label: "HOME", href: "/" },
      { label: "ABOUT US", href: "/about-our-expert-engineering-consultants-in-usa" },
      { label: "SERVICES", href: "/professional-engineering-consultancy-services-in-usa" },
      { label: "EXPERTISE", href: "/proven-engineering-excellence-experience-usa" },
      { label: "BLOG", href: "/blog" },
      { label: "CONTACT US", href: "/contact-us" },
    ],
    footer: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Risk Management in Design Transfer", href: "/risk-management-in-design-transfer" },
      { label: "Reliability Engineering Analysis", href: "/reliability-engineering-analysis" },
      { label: "Supplier Management Improve Quality", href: "/supplier-management-improve-quality" },
      { label: "Engineering Project Management", href: "/engineering-project-management" },
      { label: "Manufacturing Process Control", href: "/manufacturing-process-control" },
      { label: "Semiconductor Device Qualification", href: "/semiconductor-device-qualification" },
      { label: "Contact", href: "/contact-us" },
    ],
    utility: [
      { label: "shams.jawaid@reliabilityqualitysolutions.com", href: "mailto:shams.jawaid@reliabilityqualitysolutions.com" },
      { label: "(408)489-4208", href: "tel:+14084894208" },
      { label: "7931 Morning Queen Drive, Las Vegas, NV. 89178", href: "/contact-us" },
    ],
    serviceGroups,
  },
  services: serviceCards,
  industries,
  process: processSteps,
  testimonials,
  leadCapture: {
    stickyCtaLabel: "Request Expert Consultation",
    rapidResponseTitle: "Engineering Desk Support",
    rapidResponseDescription:
      "Submit an urgent callback request and route the issue into the inbound leads workflow.",
    formTitle: "Request Expert Consultation",
    formDescription:
      "Use the lightweight RFQ form to share your technical challenge, industry context, and contact details.",
    trustCallouts: [
      "Over 25 years of Fortune 100/500 engineering leadership",
      "Technical support across qualification, NPI, reliability, and QMS programs",
      "Built for high-intent corporate engineering and operations inquiries",
    ],
    industryOptions: [
      "Aerospace",
      "Semiconductor",
      "EV Battery",
      "Medical Devices",
      "Consumer Electronics",
      "Manufacturing",
    ],
  },
  entries: [
    {
      slug: "",
      title: "Engineering Reliability Into Every Product",
      description:
        "Premium reliability and quality engineering consultancy for qualification, NPI, and product assurance programs.",
      kind: "page",
      category: "home",
      seo: {
        title: "Professional Reliability Engineering Consulting in USA | RQS",
        description:
          "Enterprise-grade reliability and quality engineering consultancy with 25+ years of Fortune-level experience across qualification, analysis, and product launches.",
      },
      sections: [
        {
          type: "hero",
          eyebrow: "Reliability Quality Solutions",
          title: "Engineering reliability into every product decision.",
          description:
            "RQS helps engineering organizations reduce risk, validate faster, and launch with confidence through disciplined reliability and quality leadership built over 25+ years.",
          primaryCta: { label: "Talk to an Expert", href: "/contact-us" },
          secondaryCta: { label: "View Services", href: "/professional-engineering-consultancy-services-in-usa" },
          highlights: [
            "Fortune 100 and 500 program experience",
            "Qualification, FMEA, NPI, and supplier quality expertise",
            "Enterprise-ready support for complex hardware programs",
          ],
        },
        consultancyOfferingsSection,
        {
          type: "stats",
          eyebrow: "Trust Indicators",
          title: "Technical depth with executive-level reliability judgement.",
          description:
            "The site’s first release is focused on the foundational architecture, but the business story already reflects the scale and seriousness of RQS engagements.",
          items: [
            { label: "Years of Experience", value: 25, suffix: "+" },
            { label: "Core Practice Areas", value: 12, suffix: "+" },
            { label: "Industries Supported", value: 8, suffix: "+" },
            { label: "Focus", value: 100, suffix: "%" },
          ],
        },
        {
          type: "cards",
          eyebrow: "Services",
          title: "Consulting services built for demanding engineering environments.",
          description:
            "Each engagement is structured around evidence, risk reduction, and practical execution inside real product development programs.",
          variant: "services",
          items: serviceCards.slice(0, 6).map((service) => ({
            title: service.title,
            description: service.description,
            href: `/${service.slug}`,
            meta: service.meta,
            image: service.image,
          })),
        },
        {
          type: "cards",
          eyebrow: "Industries",
          title: "Support shaped by the realities of complex product ecosystems.",
          description:
            "RQS blends consulting discipline with deep technical context across high-consequence industries and operations.",
          variant: "industries",
          items: industries.map((industry) => ({
            title: industry.title,
            description: industry.description,
            image: {
              src: "/services/manufacturing.svg",
              alt: `${industry.title} engineering illustration`,
            },
          })),
        },
        {
          type: "timeline",
          eyebrow: "Engagement Model",
          title: "A consulting workflow designed to create clarity, not extra overhead.",
          description:
            "From assessment to long-term support, RQS keeps the work grounded in decisions, risk ownership, and measurable progress.",
          steps: processSteps,
        },
        {
          type: "cards",
          eyebrow: "Case Study Themes",
          title: "Programs where disciplined engineering support changes outcomes.",
          description:
            "The CMS-ready architecture includes room for full case studies. This first release highlights the kinds of work RQS is built to support.",
          variant: "caseStudies",
          items: [
            {
              title: "Launch Readiness for New Hardware Platform",
              description:
                "Reliability planning, qualification alignment, and issue escalation support ahead of release milestones.",
              meta: "NPI, validation, program governance",
            },
            {
              title: "Supplier Quality Recovery Program",
              description:
                "Rapid containment, corrective action structure, and ongoing supplier quality management for critical components.",
              meta: "SQE, CAPA, process stabilization",
            },
            {
              title: "Failure Prevention Through Structured Analysis",
              description:
                "Cross-functional analysis and targeted testing to reduce recurring escapes and improve design decisions.",
              meta: "FMEA, analysis, corrective action",
            },
          ],
        },
        {
          type: "testimonials",
          eyebrow: "Client Confidence",
          title: "Trusted because the work is practical, technical, and accountable.",
          description:
            "These seeded testimonials are placeholders for the future admin-managed proof system and set the tone for how social proof will be presented.",
          items: testimonials,
        },
        sharedCtaSection,
      ],
    },
    {
      slug: "about-our-expert-engineering-consultants-in-usa",
      title: "Reliability Engineering Consulting | About Us",
      description:
        "Learn about the RQS leadership story, consulting philosophy, and the experience behind the company’s reliability and quality practice.",
      kind: "page",
      category: "about",
      seo: {
        title: "Reliability Engineering Consulting | About RQS",
        description:
          "Meet Reliability Quality Solutions, an engineering consultancy with decades of experience supporting reliability, quality, qualification, and product development programs.",
      },
      sections: [
        {
          type: "hero",
          eyebrow: "About RQS",
          title: "Decades of experience. A legacy of reliability.",
          description:
            "RQS was built to help organizations make stronger engineering decisions across the full product lifecycle, from concept through qualification, launch, and long-term quality improvement.",
          primaryCta: { label: "Meet the Team Vision", href: "/proven-engineering-excellence-experience-usa" },
          secondaryCta: { label: "Contact RQS", href: "/contact-us" },
          highlights: [
            "Founded on reliability and quality leadership",
            "Built around hands-on Fortune company experience",
            "Focused on practical consulting that changes outcomes",
          ],
        },
        {
          type: "richText",
          eyebrow: "Who We Are",
          title: "Engineering consultancy with strong technical judgment and real operating context.",
          description:
            "This initial content migration condenses the current site’s about material into a cleaner editorial structure while preserving the company’s positioning.",
          paragraphs: [
            "Reliability Quality Solutions specializes in helping companies improve product reliability, engineering quality, and launch execution through disciplined technical consulting.",
            "The company’s background includes more than 25 years of work across Fortune 100 and Fortune 500 environments, giving clients access to leadership-level reliability and quality guidance without losing practical execution detail.",
            "RQS is designed for organizations that need a partner who can connect analysis, qualification, supplier quality, process control, and management systems into one coherent delivery model.",
          ],
          bullets: [
            "Reliability and quality engineering leadership",
            "Cross-functional program support from concept through launch",
            "Consulting that aligns executive priorities with engineering evidence",
          ],
        },
        {
          type: "timeline",
          eyebrow: "How RQS Works",
          title: "The same operating logic applies across every engagement.",
          description:
            "Whether the need is qualification, supplier escalation, or system-level quality improvement, RQS starts with the business context and works down to the engineering detail.",
          steps: processSteps,
        },
        sharedCtaSection,
      ],
    },
    {
      slug: "proven-engineering-excellence-experience-usa",
      title: "Proven Engineering Experience in USA",
      description:
        "An authority-focused overview of RQS experience, engineering perspective, and leadership approach.",
      kind: "page",
      category: "about",
      seo: {
        title: "Proven Engineering Experience in USA | RQS",
        description:
          "See how RQS positions its reliability and quality engineering experience for high-stakes product development and manufacturing programs.",
      },
      sections: [
        {
          type: "hero",
          eyebrow: "Experience",
          title: "Proven engineering excellence and experience.",
          description:
            "RQS brings long-horizon engineering perspective to organizations that need rigorous thinking, clean execution, and strong technical leadership.",
          primaryCta: { label: "View Services", href: "/professional-engineering-consultancy-services-in-usa" },
          secondaryCta: { label: "Contact RQS", href: "/contact-us" },
          highlights: [
            "Program leadership across quality and reliability functions",
            "Enterprise perspective with hands-on delivery depth",
            "Built for technically demanding decisions",
          ],
        },
        {
          type: "stats",
          eyebrow: "Experience Snapshot",
          title: "The consultancy is positioned around depth, not volume marketing.",
          description:
            "This page is intentionally concise in the first release while the deeper founder and achievement story is prepared for the next migration pass.",
          items: [
            { label: "Years of Engineering Leadership", value: 25, suffix: "+" },
            { label: "Focus Areas", value: 10, suffix: "+" },
            { label: "Lifecycle Coverage", value: 360, suffix: "°" },
          ],
        },
        sharedCtaSection,
      ],
    },
    {
      slug: "contact-us",
      title: "Contact Reliability Engineering Experts Today",
      description:
        "Reach RQS for reliability engineering, quality consulting, qualification planning, and manufacturing support.",
      kind: "page",
      category: "contact",
      seo: {
        title: "Contact Reliability Engineering Experts Today | RQS",
        description:
          "Contact Reliability Quality Solutions for reliability, quality, supplier, qualification, and process engineering consulting support.",
      },
      sections: [
        {
          type: "hero",
          eyebrow: "Contact",
          title: "Bring your toughest reliability or quality challenge.",
          description:
            "Use this initial contact page as the conversion anchor while the future phase adds a CMS-backed form pipeline, calendars, inquiry routing, and admin visibility.",
          primaryCta: { label: "Email RQS", href: "mailto:shams.jawaid@reliabilityqualitysolutions.com" },
          secondaryCta: { label: "Call the Team", href: "tel:+14084894208" },
          highlights: [
            "Consulting inquiries and project scoping",
            "Qualification and launch support discussions",
            "Supplier, quality, and manufacturing escalation support",
          ],
        },
        {
          type: "cards",
          eyebrow: "Direct Contact",
          title: "Reach the business through the channels already used on the live site.",
          description:
            "This keeps the existing contact data available while the richer enterprise contact experience is built in the next phase.",
          variant: "links",
          items: [
            {
              title: "Email",
              description: "shams.jawaid@reliabilityqualitysolutions.com",
              href: "mailto:shams.jawaid@reliabilityqualitysolutions.com",
            },
            {
              title: "Phone",
              description: "+1 (408) 489-4208",
              href: "tel:+14084894208",
            },
            {
              title: "Alternate Phone",
              description: "+1 (408) 497-8363",
              href: "tel:+14084978363",
            },
            {
              title: "Office",
              description: "7931 Morning Queen Drive, Las Vegas, NV 89178",
            },
          ],
        },
        sharedCtaSection,
      ],
    },
    {
      slug: "privacy-policy",
      title: "Privacy Policy | Protecting Your Data & Information",
      description: "Privacy and data handling overview for the RQS website and inbound inquiries.",
      kind: "page",
      category: "legal",
      seo: {
        title: "Privacy Policy | Reliability Quality Solutions",
        description:
          "Privacy policy and data handling information for visitors and clients interacting with Reliability Quality Solutions.",
      },
      sections: [
        {
          type: "richText",
          eyebrow: "Legal",
          title: "Privacy Policy",
          description:
            "This first migration preserves a concise privacy page while the future CMS layer adds versioning and admin-managed policy updates.",
          paragraphs: [
            "RQS is committed to handling contact and inquiry information responsibly and using it to respond to requests, support services, and improve the client experience.",
            "Information submitted through email, phone, or future forms may include personal and business contact details needed for communication and project support.",
            "RQS does not position itself as selling submitted information and expects any support partners to operate under appropriate confidentiality expectations.",
          ],
          bullets: [
            "Questions can be directed to shams.jawaid@reliabilityqualitysolutions.com",
            "Phone support remains available at +1 (408) 489-4208",
          ],
        },
      ],
    },
    {
      slug: "professional-engineering-consultancy-services-in-usa",
      title: "Professional Engineering Consultancy Services USA",
      description:
        "Overview of the consulting services and delivery areas offered by Reliability Quality Solutions.",
      kind: "page",
      category: "services",
      seo: {
        title: "Professional Engineering Consultancy Services USA | RQS",
        description:
          "Explore RQS engineering consultancy services covering reliability, quality, qualification, supplier quality, process control, and product development support.",
      },
      sections: [
        {
          type: "hero",
          eyebrow: "Service Portfolio",
          title: "Professional engineering consultancy services for products that cannot afford weak decisions.",
          description:
            "RQS supports engineering organizations with targeted expertise across reliability, quality, supplier management, qualification, and launch execution.",
          primaryCta: { label: "Start a Discussion", href: "/contact-us" },
          secondaryCta: { label: "Read Insights", href: "/blog" },
          highlights: [
            "Reliability and quality consulting",
            "Qualification planning and risk reduction",
            "Supplier and manufacturing quality support",
          ],
        },
        consultancyOfferingsSection,
        {
          type: "cards",
          eyebrow: "Core Services",
          title: "The new architecture keeps each service routable, editable, and ready for deeper CMS control.",
          description:
            "These cards are rendered from the central content source and link into the preserved service URLs.",
          variant: "services",
          items: serviceCards.map((service) => ({
            title: service.title,
            description: service.description,
            href: `/${service.slug}`,
            meta: service.meta,
            image: service.image,
          })),
        },
        sharedCtaSection,
      ],
    },
    {
      slug: "blog",
      title: "Reliability Quality Solutions Blog | Expert Insights",
      description:
        "A central insights hub for reliability engineering, quality systems, qualification, and manufacturing topics.",
      kind: "page",
      category: "blog",
      seo: {
        title: "Reliability Quality Solutions Blog | Expert Insights",
        description:
          "Read engineering insights from Reliability Quality Solutions on reliability analysis, quality management, testing, FMEA, and manufacturing practices.",
      },
      sections: [
        {
          type: "hero",
          eyebrow: "Insights",
          title: "Technical articles for teams building more reliable products.",
          description:
            "The blog system is already routed from the central content model. Search, categories, and richer article tooling can be layered in without changing the page architecture.",
          primaryCta: { label: "Contact RQS", href: "/contact-us" },
          secondaryCta: { label: "Explore Services", href: "/professional-engineering-consultancy-services-in-usa" },
          highlights: [
            "Reliability engineering fundamentals",
            "Quality systems and manufacturing topics",
            "Qualification and product lifecycle guidance",
          ],
        },
        {
          type: "articleList",
          eyebrow: "Latest Articles",
          title: "Migrated topics from the current website, ready for richer CMS workflows.",
          description:
            "This initial pass preserves the live article footprint and organizes it under one reusable renderer.",
          articleSlugs: [
            "best-practices-for-engineering-quality-control",
            "customer-complaint-management-in-manufacturing",
            "iso-9001-implementation-mistakes",
            "reliability-analysis-prevents-product-failures",
            "reliability-engineering-product-life",
            "reliability-life-test-las-vegas",
            "what-is-ipc-610-certification",
            "how-to-calculate-mttf",
            "mttr-impact-maintenance",
            "highly-accelerated-life-test",
            "highly-accelerated-stress-testing",
            "quality-management-system-2025",
            "how-to-get-iso-9000-certification",
            "what-is-mtbf",
            "the-importance-of-iso-9001-in-the-manufacturing-industry",
            "packaging-quality-assurance-in-las-vegas",
            "the-npi-phases",
            "what-is-quality-assurance",
            "designing-for-performance-that-lasts",
            "common-causes-of-semiconductor-failure-a-reliability-perspective",
            "how-to-improve-product-reliability",
            "what-is-failure-modes-and-effects-analysis-fmea",
          ],
        },
      ],
    },
    ...[
      {
        slug: "prevention",
        title: "Engineering Prevention Over Inspection",
        category: "services",
        description:
          "Shift quality effort upstream by preventing issues before they become recurring inspection or field problems.",
      },
      {
        slug: "process-integration",
        title: "Professional Engineering Process Integration for Quality",
        category: "services",
        description:
          "Align design, operations, and quality functions through integrated process planning and ownership.",
      },
      {
        slug: "quality-control",
        title: "Engineering Quality Control",
        category: "services",
        description:
          "Build robust quality control systems that improve consistency, containment, and customer confidence.",
      },
      {
        slug: "reliability-analysis",
        title: "#1 Reliability Engineering Analysis Services in USA",
        category: "services",
        description:
          "Apply reliability analysis methods that expose weak points, quantify risk, and improve engineering decisions.",
      },
      {
        slug: "failure-analysis",
        title: "Failure Analysis and Corrective Action",
        category: "services",
        description:
          "Investigate failures, isolate causes, and convert learning into corrective action that holds up operationally.",
      },
      {
        slug: "iso-9001",
        title: "ISO 9001:2015 Consulting Services",
        category: "services",
        description:
          "Support quality management system maturity, implementation, and disciplined ISO-aligned operating practices.",
      },
      {
        slug: "process-control",
        title: "Expert Manufacturing Process Control Services in USA",
        category: "services",
        description:
          "Improve process capability and control strategy with engineering-led manufacturing discipline.",
      },
      {
        slug: "prediction-and-fatigue",
        title: "Professional Prediction & Fatigue Life Estimates Services",
        category: "services",
        description:
          "Use engineering estimates and durability thinking to anticipate life limits and failure drivers earlier.",
      },
      {
        slug: "product-qualification",
        title: "#1 Packaging & Product Qualification: Our Proven Method",
        category: "services",
        description:
          "Create evidence-backed qualification plans for packaging, assemblies, and release readiness decisions.",
      },
      {
        slug: "supplier-quality",
        title: "Supplier Management Improve Quality",
        category: "services",
        description:
          "Improve supplier performance through stronger expectations, follow-through, and engineering visibility.",
      },
      {
        slug: "design-transfer",
        title: "Risk Management in Design Transfer: Our Proven Process",
        category: "services",
        description:
          "Reduce execution risk when designs move into manufacturing through disciplined transfer planning.",
      },
      {
        slug: "semiconductors",
        title: "#1 Reliable Semiconductor Device Qualification Services",
        category: "services",
        description:
          "Qualification support for semiconductor devices, packaging, and reliability-sensitive changes.",
      },
      {
        slug: "yield-improvement",
        title: "Quality Manufacturing Process Controls, Yield Improvement",
        category: "services",
        description:
          "Improve yield with process understanding, defect reduction, and practical quality engineering controls.",
      },
      {
        slug: "project-management",
        title: "Best Engineering Project Management Services in USA",
        category: "services",
        description:
          "Coordinate engineering execution, decisions, and accountability around quality and reliability objectives.",
      },
      {
        slug: "complaint-resolution",
        title: "Expert Customer Complaints Resolution Services",
        category: "services",
        description:
          "Respond to customer complaints with structured containment, root-cause rigor, and sustained closure.",
      },
      {
        slug: "life-testing",
        title: "Professional Accelerated Life Testing Services",
        category: "services",
        description:
          "Design and interpret accelerated life testing that answers real product and business questions.",
      },
      {
        slug: "supplier-management",
        title: "CQE & Supplier Management SQE",
        category: "services",
        description:
          "Strengthen supplier quality engineering through better escalation, qualification, and relationship control.",
      },
      {
        slug: "analysis",
        title: "Reliability Engineering & Analysis",
        category: "services",
        description:
          "Proactive reliability engineering that identifies vulnerabilities before they become failures in the field.",
      },
    ].map((page) => ({
      slug: page.slug,
      aliases: serviceCards.find((service) => service.slug === page.slug)?.aliases,
      title: page.title,
      description: page.description,
      kind: "page" as const,
      category: page.category,
      seo: {
        title: `${page.title} | Reliability Quality Solutions`,
        description: page.description,
      },
      sections: [
        {
          type: "hero" as const,
          eyebrow: "Consulting Service",
          title: page.title.replace(/^#1\s*/, ""),
          description: page.description,
          primaryCta: { label: "Discuss This Service", href: "/contact-us" },
          secondaryCta: { label: "All Services", href: "/professional-engineering-consultancy-services-in-usa" },
          highlights: [
            "Technical consulting with enterprise delivery standards",
            "Structured support tailored to product and manufacturing context",
            "Actionable outputs tied to risk reduction and execution",
          ],
          image: serviceCards.find((service) => service.slug === page.slug)?.image,
        },
        {
          type: "richText" as const,
          eyebrow: "Service Focus",
          title: "What this service is designed to improve.",
          description:
            "The deeper copy migration is still in progress, but this page already preserves the route and provides a cleaner enterprise-ready summary.",
          paragraphs: [
            `${page.title.replace(/^#1\s*/, "")} supports organizations that need a stronger technical basis for decision-making, qualification, and execution.`,
            "RQS approaches the work through practical engineering review, risk prioritization, and deliverables that can be used by design, quality, operations, and leadership teams.",
            "This service page is intentionally structured from reusable content sections so it can later absorb the full migrated copy without changing the frontend architecture.",
          ],
          bullets: [
            "Assessment of current risks and constraints",
            "Clear recommendations tied to business and technical outcomes",
            "Documentation, communication, and follow-through support",
          ],
        },
        {
          type: "cards" as const,
          eyebrow: "Related Services",
          title: "Adjacent capabilities often paired with this work.",
          description:
            "RQS engagements often combine multiple engineering disciplines to solve the real problem rather than only the visible symptom.",
          variant: "links" as const,
          items: serviceCards.slice(0, 4).map((service) => ({
            title: service.title,
            description: service.description,
            href: `/${service.slug}`,
            image: service.image,
          })),
        },
        sharedCtaSection,
      ],
    })),
    ...[
      {
        slug: "best-practices-for-engineering-quality-control",
        title: "Best Practices for Engineering Quality Control",
        description:
          "A practical look at quality control habits that improve consistency, reduce escapes, and support better manufacturing outcomes.",
        tags: ["Quality Control", "Manufacturing", "Best Practices"],
      },
      {
        slug: "customer-complaint-management-in-manufacturing",
        title: "How to Manage Customer Complaints in Manufacturing",
        description:
          "Why complaint handling should be structured as an engineering and quality feedback loop, not a reactive admin task.",
        tags: ["Complaints", "Manufacturing", "Customer Quality"],
      },
      {
        slug: "iso-9001-implementation-mistakes",
        title: "Common Mistakes in ISO 9001 Implementation",
        description:
          "Common implementation errors that weaken ISO 9001 programs and how disciplined operating behaviors prevent them.",
        tags: ["ISO 9001", "QMS", "Implementation"],
      },
      {
        slug: "reliability-analysis-prevents-product-failures",
        title: "How Reliability Analysis Prevents Costly Product Failures",
        description:
          "Reliability analysis as a way to reduce expensive surprises before products reach customers and the field.",
        tags: ["Reliability Analysis", "Failure Prevention", "Products"],
      },
      {
        slug: "reliability-engineering-product-life",
        title: "Reliability Engineering: Boosting Product Life and Cutting Warranty Costs",
        description:
          "How reliability engineering extends product life while improving cost and warranty performance.",
        tags: ["Reliability", "Warranty", "Lifecycle"],
      },
      {
        slug: "reliability-life-test-las-vegas",
        title: "Reliability Life Test: Ensuring Product Durability in Las Vegas",
        description:
          "A primer on product durability testing and why life testing matters for risk reduction.",
        tags: ["Life Testing", "Durability", "Qualification"],
      },
      {
        slug: "what-is-ipc-610-certification",
        title: "What is IPC 610 Certification?",
        description:
          "An overview of IPC 610 certification and its role in electronics workmanship and quality expectations.",
        tags: ["IPC 610", "Electronics", "Quality"],
      },
      {
        slug: "how-to-calculate-mttf",
        title: "How to calculate MTTF?",
        description:
          "A plain-language explanation of mean time to failure and how teams use it in reliability decision-making.",
        tags: ["MTTF", "Reliability Metrics", "Analysis"],
      },
      {
        slug: "mttr-impact-maintenance",
        title: "How MTTR Impacts Customer Satisfaction and Maintenance Costs",
        description:
          "Why repair time affects both operating economics and the customer’s real experience of product quality.",
        tags: ["MTTR", "Maintenance", "Service"],
      },
      {
        slug: "highly-accelerated-life-test",
        title: "HALT (Highly Accelerated Life Test): Boosting Product Reliability",
        description:
          "A concise explanation of HALT and why it matters in identifying design weakness early.",
        tags: ["HALT", "Testing", "Reliability"],
      },
      {
        slug: "highly-accelerated-stress-testing",
        title: "Highly Accelerated Stress Testing in Las Vegas: Ensuring Product Reliability",
        description:
          "How accelerated stress testing helps teams create faster insight into design limits and robustness.",
        tags: ["HAST", "Stress Testing", "Qualification"],
      },
      {
        slug: "quality-management-system-2025",
        title: "Why Every Business Needs a Robust Quality Management System in 2025",
        description:
          "A modern case for quality management systems as growth enablers rather than documentation exercises.",
        tags: ["QMS", "Business Systems", "2025"],
      },
      {
        slug: "how-to-get-iso-9000-certification",
        title: "How to Get ISO 9000 Certification",
        description:
          "An overview of the certification journey and the behaviors that make it sustainable.",
        tags: ["ISO 9000", "Certification", "QMS"],
      },
      {
        slug: "what-is-mtbf",
        title: "What is MTBF?",
        description:
          "A simple explanation of MTBF and how the metric fits into reliability planning and communication.",
        tags: ["MTBF", "Reliability Metrics", "Fundamentals"],
      },
      {
        slug: "the-importance-of-iso-9001-in-the-manufacturing-industry",
        title: "The Importance of ISO 9001 in the Manufacturing Industry",
        description:
          "Why ISO 9001 matters in manufacturing environments where quality consistency and process discipline are critical.",
        tags: ["ISO 9001", "Manufacturing", "QMS"],
      },
      {
        slug: "packaging-quality-assurance-in-las-vegas",
        title: "Packaging Quality Assurance in Las Vegas",
        description:
          "Quality assurance thinking applied to packaging performance, consistency, and release confidence.",
        tags: ["Packaging", "Quality Assurance", "Qualification"],
      },
      {
        slug: "the-npi-phases",
        title: "The NPI Phases",
        description:
          "A high-level walkthrough of new product introduction phases and the role of reliability and quality within them.",
        tags: ["NPI", "Product Development", "Launch"],
      },
      {
        slug: "what-is-quality-assurance",
        title: "What is Quality Assurance?",
        description:
          "A straightforward introduction to quality assurance and the difference between QA, QC, and system-level discipline.",
        tags: ["Quality Assurance", "Quality", "Fundamentals"],
      },
      {
        slug: "designing-for-performance-that-lasts",
        title: "Reliability and Quality: Designing for Performance That Lasts",
        description:
          "How engineering teams can design products for durability, trust, and long-term performance.",
        tags: ["Reliability", "Quality", "Design"],
      },
      {
        slug: "common-causes-of-semiconductor-failure-a-reliability-perspective",
        title: "Common Causes of Semiconductor Failure: A Reliability Perspective",
        description:
          "A practical view into common semiconductor failure drivers and why reliability thinking matters early.",
        tags: ["Semiconductor", "Failure Analysis", "Reliability"],
      },
      {
        slug: "how-to-improve-product-reliability",
        title: "How to Improve Product Reliability",
        description:
          "Core engineering habits that help organizations improve reliability systematically over time.",
        tags: ["Reliability Improvement", "Engineering", "Products"],
      },
      {
        slug: "what-is-failure-modes-and-effects-analysis-fmea",
        title: "What is Failure Modes and Effects Analysis (FMEA)?",
        description:
          "An introduction to FMEA and why it remains one of the most practical tools for proactive risk reduction.",
        tags: ["FMEA", "Risk", "Quality Engineering"],
      },
    ].map((post, index) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      kind: "post" as const,
      category: "insights",
      date: `2026-04-${String((index % 26) + 1).padStart(2, "0")}`,
      readTime: `${5 + (index % 5)} min read`,
      tags: post.tags,
      seo: {
        title: `${post.title} | RQS Insights`,
        description: post.description,
      },
      sections: [
        {
          type: "hero" as const,
          eyebrow: "RQS Insights",
          title: post.title,
          description: post.description,
          primaryCta: { label: "Contact RQS", href: "/contact-us" },
          secondaryCta: { label: "Back to Insights", href: "/blog" },
          highlights: post.tags ?? [],
        },
        {
          type: "richText" as const,
          eyebrow: "Article Summary",
          title: "A cleaner editorial structure for migrated technical content.",
          description:
            "The long-form article body migration is a remaining task, but this release preserves the live URL and wraps the topic in a scalable content model.",
          paragraphs: [
            `${post.title} is part of the migrated insights library for Reliability Quality Solutions and is now served through the same central architecture as the rest of the website.`,
            "The new structure is designed so each article can later absorb richer copy, diagrams, categories, search indexing, and structured internal linking without changing route behavior.",
            "In this first pass, the goal is to preserve discoverability, improve the page presentation, and establish a maintainable editorial system rather than simply mirror the old markup.",
          ],
          bullets: post.tags?.map((tag) => `${tag} remains attached as reusable taxonomy data.`),
        },
        {
          type: "cards" as const,
          eyebrow: "Continue Reading",
          title: "Related topics from the migrated insights library.",
          description:
            "Related article logic is now data-driven and can evolve into stronger recommendation rules later.",
          variant: "links" as const,
          items: [
            "best-practices-for-engineering-quality-control",
            "reliability-analysis-prevents-product-failures",
            "what-is-failure-modes-and-effects-analysis-fmea",
          ]
            .filter((slug) => slug !== post.slug)
            .map((slug) => ({
              title:
                slug
                  .split("-")
                  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                  .join(" "),
              description: "Explore another reliability or quality engineering topic from RQS.",
              href: `/${slug}`,
            })),
        },
        sharedCtaSection,
      ],
    })),
  ],
};
