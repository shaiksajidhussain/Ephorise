import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactBand } from "@/components/home/ContactBand";
import { Arrow } from "@/components/ui/Arrow";
import { ServiceMark } from "@/components/ui/Marks";
import { JsonLd } from "@/components/ui/JsonLd";
import { getService, services } from "@/data/services";
import { pageMeta } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return pageMeta({ title: "Services", path: "/services" });
  return pageMeta({
    title: `${service.title} | Ephorise`,
    description: service.lede,
    path: `/services/${service.id}`,
    absolute: true,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const site = siteUrl();
  const crumb = site
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site },
          { "@type": "ListItem", position: 2, name: "Services", item: `${site}/services` },
          { "@type": "ListItem", position: 3, name: service.title, item: `${site}/services/${service.id}` },
        ],
      }
    : null;

  return (
    <main>
      {crumb ? <JsonLd data={crumb} /> : null}
      <header className="section">
        <div className="wrap relative z-[1]">
          <div className="flex items-start justify-between gap-6">
            <p className="label">
              <Link href="/services">Services</Link>
              <span aria-hidden="true"> / </span>
              {service.title}
            </p>
            <ServiceMark id={service.id} />
          </div>
          <h1 className="section-title mt-4">{service.heading}</h1>
          <p className="deck mt-6 max-w-3xl">{service.lede}</p>
          <div className="mt-6 grid max-w-3xl gap-4">
            {service.overview.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </header>
      {service.sections.map((section) => (
        <section key={section.title} className="border-t border-line">
          <div className="wrap section grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="text-3xl font-medium tracking-[-0.03em]">{section.title}</h2>
              <p className="deck mt-4">{section.body}</p>
            </div>
            <ul className="lg:col-span-6 lg:col-start-7">
              {section.points.map((point) => (
                <li key={point} className="border-t border-line py-3 text-paper">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
      <section className="border-t border-line">
        <div className="wrap section grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-medium tracking-[-0.03em]">What this includes</h2>
            <p className="deck mt-4">The pieces below are the range of this service. A project uses the ones the scope names.</p>
            <Link href={`/contact?service=${service.id}`} className="btn btn-solid mt-8">
              {service.cta}
              <Arrow />
            </Link>
          </div>
          <ul className="lg:col-span-6 lg:col-start-7">
            {service.includes.map((item) => (
              <li key={item} className="border-t border-line py-3 text-paper">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ContactBand button={service.cta} href={`/contact?service=${service.id}`} />
    </main>
  );
}
