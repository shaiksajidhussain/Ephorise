import Link from "next/link";
import { ContactBand } from "@/components/home/ContactBand";
import { Arrow } from "@/components/ui/Arrow";
import { HeaderArt } from "@/components/ui/HeaderArt";
import { ServiceMark } from "@/components/ui/Marks";
import { services } from "@/data/services";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Our Services | Web Development, Apps & Digital Marketing | Ephorise",
  description:
    "Explore Ephorise services, including website development, custom web applications, mobile app development, SEO, and digital marketing.",
  path: "/services",
  absolute: true,
  keywords: [
    "Web development services",
    "website design and development",
    "custom software development",
    "SEO services",
    "digital marketing services",
  ],
});

export default function ServicesPage() {
  return (
    <main>
      <header className="section">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)]">
          <div>
            <p className="label">Services</p>
            <h1 className="section-title mt-4">Digital Services Designed Around Your Goals</h1>
            <p className="deck mt-6 max-w-3xl">
              Every business has different goals, challenges, and customers. At Ephorise, we provide digital
              services designed to help businesses build their online presence, improve digital experiences, and
              explore new opportunities for growth.
            </p>
          </div>
          <HeaderArt kind="services" />
        </div>
      </header>
      {services.map((service) => (
        <section key={service.id} id={service.id} className="border-t border-line">
          <div className="wrap section relative z-[1] grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="flex items-start justify-between gap-6">
                <p className="label">
                  {service.index} — {service.title}
                </p>
                <ServiceMark id={service.id} />
              </div>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.04em]">
                <Link href={`/services/${service.id}`}>{service.heading}</Link>
              </h2>
              <p className="deck mt-5">{service.lede}</p>
              <div className="mt-5 grid gap-4">
                {service.overview.map((paragraph) => (
                  <p key={paragraph} className="text-paper leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={`/contact?service=${service.id}`} className="btn btn-solid">
                  {service.cta}
                  <Arrow />
                </Link>
                <Link href={`/services/${service.id}`} className="btn btn-ghost">
                  Read this service
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <h3 className="label">What this includes</h3>
              <ul className="mt-4">
                {service.includes.map((item) => (
                  <li key={item} className="border-t border-line py-3 text-paper">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10 grid gap-8">
                {service.sections.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-xl font-medium tracking-[-0.03em]">{section.title}</h3>
                    <p className="deck mt-3">{section.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
      <ContactBand
        title="Not Sure Which Service You Need?"
        body="Tell us about your business and your goals. We'll help you identify the digital solutions that best fit your requirements."
        button="Talk to Our Team"
      />
    </main>
  );
}
