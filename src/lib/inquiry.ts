export const serviceOptions = [
  { value: "website-development", label: "Website Development" },
  { value: "web-application-development", label: "Web Application Development" },
  { value: "mobile-app-development", label: "Mobile App Development" },
  { value: "seo", label: "Search Engine Optimization" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "other", label: "Other" },
] as const;

export const budgetOptions = [
  { value: "", label: "Prefer to discuss" },
  { value: "under-8k", label: "Under $8,000" },
  { value: "8-20k", label: "$8,000 to $20,000" },
  { value: "20-50k", label: "$20,000 to $50,000" },
  { value: "50k-plus", label: "$50,000 and above" },
] as const;

export type Inquiry = {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: (typeof serviceOptions)[number]["value"];
  budget: (typeof budgetOptions)[number]["value"];
  details: string;
  project: string | null;
  consent: true;
};

export type InquiryErrors = Partial<Record<keyof Inquiry | "form", string>>;

const serviceValues = new Set<string>(serviceOptions.map((item) => item.value));
const budgetValues = new Set<string>(budgetOptions.map((item) => item.value));

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim()
    .slice(0, max);
}

export function validateInquiry(
  input: unknown,
): { ok: true; value: Inquiry } | { ok: false; errors: InquiryErrors } {
  const source = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  const errors: InquiryErrors = {};

  const name = clean(source.name, 80);
  const email = clean(source.email, 120);
  const company = clean(source.company, 120);
  const phone = clean(source.phone, 30);
  const requestedService = clean(source.service, 40);
  const service = requestedService === "web-development" ? "website-development" : requestedService;
  const budget = clean(source.budget, 20);
  const details = clean(source.details, 4000);
  const projectSlug = clean(source.project, 80);
  const consent = source.consent === true;

  if (name.length < 2) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = "Enter a business email address.";
  }
  if (phone && !/^[0-9+().\-\s]{6,30}$/.test(phone)) {
    errors.phone = "Enter a phone number we can use.";
  }
  if (!serviceValues.has(service)) errors.service = "Choose a service.";
  if (budget && !budgetValues.has(budget)) errors.budget = "Choose a listed budget range.";
  if (details.length < 20) {
    errors.details = "Add a short note about the project.";
  }
  if (!consent) errors.consent = "Confirm that we may use this note to reply.";

  const project = /^[a-z0-9-]{0,80}$/.test(projectSlug) && projectSlug ? projectSlug : null;

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    value: {
      name,
      email,
      company,
      phone,
      service: service as Inquiry["service"],
      budget: budget as Inquiry["budget"],
      details,
      project,
      consent: true,
    },
  };
}

export function serviceLabel(value: string) {
  return serviceOptions.find((item) => item.value === value)?.label ?? value;
}

export function budgetLabel(value: string) {
  return budgetOptions.find((item) => item.value === value)?.label ?? "Prefer to discuss";
}
