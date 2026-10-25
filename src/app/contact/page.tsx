import Link from "next/link";
import { Suspense } from "react";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { getProject } from "@/data/projects";
import { serviceOptions } from "@/lib/inquiry";
import { pageMeta } from "@/lib/seo";
import { publicEmail, publicLocation, publicPhone, publicWhatsapp } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact Ephorise | Start Your Digital Project",
  description:
    "Contact Ephorise to discuss website development, web applications, mobile apps, SEO, and digital marketing for your business.",
  path: "/contact",
  absolute: true,
  keywords: [
    "Contact web development company",
    "website development enquiry",
    "digital marketing consultation",
  ],
});

export default function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const email = publicEmail();
  const phone = publicPhone();
  const whatsapp = publicWhatsapp();
  const location = publicLocation();

  return (
    <main className="section">
      <div className="wrap relative z-[1] grid gap-12 lg:grid-cols-12">
        <header className="lg:col-span-5">
          <p className="label">Contact Us</p>
          <h1 className="mt-4 max-w-[14ch] text-[clamp(2.8rem,5.5vw,4.8rem)] font-medium leading-[0.96] tracking-[-0.048em]">
            Let&apos;s Build Something Great Together
          </h1>
          <p className="deck mt-6">
            Every great project begins with a conversation. Tell us about your business, your goals, and the
            digital solution you&apos;re looking for. We&apos;ll get in touch to discuss the next steps.
          </p>
          <div className="mt-8 grid gap-3 border-t border-line pt-6 text-sm leading-6">
            {email ? (
              <p>
                <span className="label">Email</span>
                <a className="mt-1 block text-paper underline decoration-white/20 underline-offset-4" href={`mailto:${email}`}>
                  {email}
                </a>
              </p>
            ) : null}
            {phone ? (
              <p>
                <span className="label">Phone</span>
                <a className="mt-1 block text-paper" href={`tel:${phone.replace(/\s/g, "")}`}>
                  {phone}
                </a>
              </p>
            ) : null}
            {whatsapp ? (
              <p>
                <span className="label">WhatsApp</span>
                <a
                  className="mt-1 block text-paper underline decoration-white/20 underline-offset-4"
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Message on WhatsApp
                </a>
              </p>
            ) : null}
            {location ? (
              <p>
                <span className="label">Location</span>
                <span className="mt-1 block text-paper">{location}</span>
              </p>
            ) : null}
          </div>
          <p className="mt-8 text-sm leading-6 text-mute">
            What you send is used only to reply to this enquiry. Read the{" "}
            <Link className="underline decoration-white/20 underline-offset-4" href="/privacy">
              privacy policy
            </Link>
            . Do not include passwords, payment details, or other secrets.
          </p>
        </header>
        <div className="lg:col-span-7">
          <Suspense fallback={<p className="label">Loading the form</p>}>
            <FormGate searchParams={searchParams} />
          </Suspense>
          <noscript>
            <p className="mt-6 text-mute">
              This form needs JavaScript to submit.
              {email ? ` You can also write to ${email}.` : ""}
            </p>
          </noscript>
        </div>
      </div>
    </main>
  );
}

async function FormGate({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const requested = typeof params.service === "string" ? params.service : "";
  const normalized = requested === "web-development" ? "website-development" : requested;
  const initialService = serviceOptions.some((option) => option.value === normalized) ? normalized : "";
  const projectSlug = typeof params.project === "string" ? params.project : "";
  const project = getProject(projectSlug);

  return (
    <InquiryForm
      key={`${initialService}-${project?.slug ?? "none"}`}
      initialService={initialService}
      project={project?.slug ?? null}
      projectTitle={project?.title ?? null}
    />
  );
}
