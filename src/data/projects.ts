export type ProjectLink = { label: string; href: string };

export type WebsiteProject = {
  slug: string;
  title: string;
  industry: string;
  summary: string;
  services: string[];
  /** Short list of what was built, shown under the summary. */
  highlights?: string[];
  /** Shown as a tag when the site is not public yet, e.g. "Launching Soon". */
  status?: string;
  /** Top-right card label. Defaults to "Client Project". */
  kind?: string;
  /** Screenshot path under /public, e.g. "/projects/clubra.jpg". A placeholder shows until set. */
  image?: string;
  /** Extra screenshots for the project page, shown two per row. Hidden while empty. */
  gallery?: string[];
  /** Longer write-up for the project page. Falls back to `summary`. */
  description?: string[];
  /** Client name shown in the project page record. Defaults to `title`. */
  client?: string;
  /** Technology chips on the project page. */
  stack?: string[];
  /** Publish a button only after the live URL is approved. */
  url: string | null;
  /** Extra approved links, such as social profiles. */
  links?: ProjectLink[];
};

export type SocialProject = {
  slug: string;
  title: string;
  platform: string;
  service: string;
  summary: string;
  /** Publish a button only after the profile URL is approved. */
  url: string | null;
};

const CLOUDINARY = "https://res.cloudinary.com/dknjrobkx/image/upload/";

export const websiteProjects: WebsiteProject[] = [
  {
    slug: "clubra",
    image: "/projects/clubra.jpg",
    title: "Clubra Sports & Aquatics",
    industry: "Sports, Fitness & Recreation",
    summary:
      "A multi-sports and recreation brand offering experiences across swimming, snooker, pickleball, skating, and video gaming.",
    services: ["Website Development", "Digital Presence", "Brand Communication"],
    url: "https://clubra.in/",
  },
  {
    slug: "cti-systems",
    image: `${CLOUDINARY}v1767179538/ad29df4a-d269-47a6-a672-c1e934ec8f4b.png`,
    gallery: [
      `${CLOUDINARY}v1767179603/093f8279-829c-4466-bb51-259e274e45d7.png`,
      `${CLOUDINARY}v1767179587/4bdf471f-e9bf-4fef-a4e1-8b5ba351cbda.png`,
      `${CLOUDINARY}v1767179639/60c2305b-e3dc-43a9-b3bd-1bb316ffaf14.png`,
    ],
    title: "CTI Systems",
    industry: "Engineering, Intralogistics & Aviation",
    summary:
      "A global engineering company specializing in intralogistics, surface treatment, and aviation systems for heavy loads. With more than 60 years of engineering excellence, CTI Systems designs tailor-made solutions that integrate technology, automation, and industry expertise for industrial leaders worldwide.",
    services: ["Website Development", "Digital Presence", "Brand Communication"],
    description: [
      "CTI Systems is a global engineering company specializing in intralogistics, surface treatment, and aviation systems for heavy loads. With more than 60 years of engineering excellence, CTI Systems supports industrial leaders worldwide in optimizing complex storage, handling, and production processes.",
      "Driven by innovation and sustainability, CTI Systems designs and delivers tailor-made solutions that seamlessly integrate technology, automation, and industry expertise — enabling customers to operate more efficiently, safely, and sustainably.",
    ],
    url: null,
  },
  {
    slug: "inspire-leap",
    image: `${CLOUDINARY}v1767015254/6ac4cd1d-b91e-4ed1-9650-542c915cd950.png`,
    gallery: [
      `${CLOUDINARY}v1767015277/c07dceb6-6cec-4f2e-b3e6-55e1dca2575b.png`,
      `${CLOUDINARY}v1767015274/689fafd0-3e71-4c57-ae0e-5ac309e91c05.png`,
      `${CLOUDINARY}v1767015292/08a40609-ace3-4c0b-ab71-17d1e7a336ee.png`,
    ],
    title: "Inspire Leap",
    industry: "EdTech, Learning & Placement",
    summary:
      "An EdTech platform that bridges academics and industry through structured learning programs, expert mentorship, real-time projects, and placement support across Computer Science, Electronics, Mechanical/Civil, Management, Medical, and emerging technologies.",
    services: ["Platform Development", "Website Development", "UI/UX Design"],
    highlights: [
      "Multi-domain programs with flexible pricing plans",
      "Live and recorded classes with LMS access",
      "Placement support, slot booking, and user authentication",
      "Responsive UI on a scalable architecture",
    ],
    description: [
      "Inspire Leap is a comprehensive EdTech platform designed to bridge the gap between academics and industry by offering structured learning programs, expert mentorship, real-time projects, and placement support across multiple domains.",
      "The platform provides curated programs in Computer Science, Electronics, Mechanical/Civil, Management, Medical, and emerging technologies, enabling learners to upskill through live classes, recorded sessions, hands-on projects, and certifications. With multiple learning plans — ranging from self-directed programs to full placement-support tracks — Inspire Leap caters to students, graduates, and working professionals at different career stages.",
    ],
    url: null,
  },
  {
    slug: "aj-supplements",
    title: "AJ Supplements",
    industry: "AgriTech, Livestock & Poultry Nutrition",
    summary:
      "Feed formulation software that helps feed manufacturers, nutritionists, and veterinarians build accurate, species-specific diets for livestock and poultry.",
    services: ["Software Development", "Web Application Development", "UI/UX Design"],
    highlights: [
      "Species-specific feed formulation",
      "Accurate ingredient calculation",
      "Real-time formulation and data-backed decisions",
      "Less material waste, better feed efficiency",
    ],
    description: [
      "AJ Supplements Feed Software is a precision-driven digital solution designed to optimize livestock and poultry nutrition through intelligent feed formulation. Built to support species-specific dietary requirements, the software enables accurate ingredient calculation, real-time formulation, and data-backed decision-making for feed manufacturers, nutritionists, and veterinarians.",
      "The platform simplifies complex feed formulation workflows, improves feed efficiency, reduces material waste, and supports sustainable animal production. Developed in collaboration with nutrition experts, it bridges science and technology to deliver smarter, scalable, and reliable feed solutions.",
    ],
    image: `${CLOUDINARY}v1767170614/8690b75b-874c-4035-a423-4ad892d60d72.png`,
    gallery: [
      `${CLOUDINARY}v1767170623/4cf75bd3-fb80-4ca2-9536-5b31c17248ad.png`,
      `${CLOUDINARY}v1767170644/864759ef-d57d-4d65-95d4-8e1b992ddc8b.png`,
      `${CLOUDINARY}v1767170695/a1a99e26-a2fd-4d1a-a855-26063d3b6d2e.png`,
    ],
    url: null,
  },
  {
    slug: "nook-cafe",
    image: "/projects/nook-cafe.jpg",
    title: "NOOK Cafe",
    industry: "Cafe, Lifestyle & Healthy Food",
    summary:
      "A cafe and lifestyle concept focused on bringing together quality food, healthy options, and a welcoming cafe experience.",
    services: ["Website Development", "Digital Branding", "Online Brand Presentation"],
    status: "Launching Soon",
    url: null,
  },
  {
    slug: "queenark",
    title: "Queenark",
    industry: "Fashion & Lifestyle",
    summary:
      "A fashion brand focused on style, identity, and presenting its products through an engaging brand experience.",
    services: ["Website Development", "Brand Presentation", "Digital Experience"],
    status: "Launching Soon",
    url: null,
    links: [
      { label: "Instagram", href: "https://www.instagram.com/queenark.in" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/queenark/" },
    ],
  },
  {
    slug: "bhavani-chits",
    image: `${CLOUDINARY}v1767178896/c174c119-a258-4d02-bc20-62dce3d2d134.png`,
    gallery: [
      `${CLOUDINARY}v1767178911/1f942f3c-77e8-4e76-a5d1-e8033e0396a7.png`,
      `${CLOUDINARY}v1767178986/f0ac0a90-77b8-4a53-8c0b-4206f9204938.png`,
    ],
    title: "Bhavani Chits",
    industry: "Financial Services",
    summary:
      "A chit fund business that needed a reliable digital system for its team and its members. We built both an admin portal and a client portal for the business.",
    services: ["Admin Portal", "Client Portal", "Web Application Development"],
    highlights: ["Admin portal for managing the business", "Client portal for members"],
    url: null,
  },
];

export const moreWebsiteWork = {
  title: "Additional Website Projects",
  industry: "Multiple Industries",
  summary:
    "We also work on digital projects for businesses across different sectors, helping them establish and improve their online presence through tailored website solutions.",
  services: ["Website Design", "Website Development", "Digital Solutions"],
};

export const socialProjects: SocialProject[] = [
  {
    slug: "madsage",
    title: "MadSage",
    platform: "Instagram",
    service: "Social Media Marketing",
    summary:
      "We supported MadSage with Instagram marketing to strengthen its social media presence and communicate with its target audience.",
    url: null,
  },
  {
    slug: "pichhi-ooru",
    title: "Pichhi Ooru",
    platform: "Instagram",
    service: "Social Media Marketing",
    summary:
      "We worked on Instagram marketing for Pichhi Ooru, supporting its online brand communication and social media presence.",
    url: null,
  },
  {
    slug: "healthy-treats",
    title: "Healthy Treats",
    platform: "Instagram",
    service: "Social Media Marketing",
    summary:
      "We supported Healthy Treats with Instagram marketing to help communicate its brand identity and connect with audiences interested in food and healthier choices.",
    url: null,
  },
];

export const inspirationBrands = [
  { name: "Apple", knownFor: "Minimalist design and intuitive user experiences." },
  { name: "Nike", knownFor: "Strong brand storytelling and engaging digital content." },
  { name: "Airbnb", knownFor: "User-friendly discovery and booking experiences." },
  { name: "Shopify", knownFor: "E-commerce solutions and tools that support businesses." },
  { name: "Spotify", knownFor: "Personalized experiences and intuitive digital products." },
  { name: "Uber", knownFor: "Convenient digital journeys and accessible services." },
] as const;

export function getWebsiteProject(slug: string): WebsiteProject | undefined {
  return websiteProjects.find((project) => project.slug === slug);
}

export function getProject(slug: string): { slug: string; title: string } | undefined {
  return (
    websiteProjects.find((project) => project.slug === slug) ??
    socialProjects.find((project) => project.slug === slug)
  );
}
