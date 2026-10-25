export type WebsiteProject = {
  slug: string;
  title: string;
  industry: string;
  summary: string;
  services: string[];
  /** Publish a button only after the live URL is approved. */
  url: string | null;
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

export const websiteProjects: WebsiteProject[] = [
  {
    slug: "clubra",
    title: "Clubra Sports & Aquatics",
    industry: "Sports, Fitness & Recreation",
    summary:
      "A multi-sports and recreation brand offering experiences across swimming, snooker, pickleball, skating, and video gaming.",
    services: ["Website Development", "Digital Presence", "Brand Communication"],
    url: null,
  },
  {
    slug: "nook-cafe",
    title: "NOOK Cafe",
    industry: "Cafe, Lifestyle & Healthy Food",
    summary:
      "A cafe and lifestyle concept focused on bringing together quality food, healthy options, and a welcoming cafe experience.",
    services: ["Website Development", "Digital Branding", "Online Brand Presentation"],
    url: null,
  },
  {
    slug: "bhavani-chits",
    title: "Bhavani Chits",
    industry: "Financial Services",
    summary:
      "A financial services business that requires a professional digital presence to communicate its services, build credibility, and make information accessible to its audience.",
    services: ["Website Development", "Digital Presence"],
    url: null,
  },
  {
    slug: "queenark",
    title: "Queenark",
    industry: "Fashion & Lifestyle",
    summary:
      "A fashion brand focused on style, identity, and presenting its products through an engaging brand experience.",
    services: ["Website Development", "Brand Presentation", "Digital Experience"],
    url: null,
  },
  {
    slug: "movo-canoe",
    title: "Movo Canoe",
    industry: "Outdoor & Water Sports",
    summary:
      "A project in the outdoor and water sports space, showcasing how digital platforms can present a brand and its offerings to its target audience.",
    services: ["Website Development", "Digital Experience"],
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

export function getProject(slug: string): { slug: string; title: string } | undefined {
  return (
    websiteProjects.find((project) => project.slug === slug) ??
    socialProjects.find((project) => project.slug === slug)
  );
}
