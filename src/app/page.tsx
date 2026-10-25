import { HomeClose, Intro, Principles, ProcessPreview, ServiceList } from "@/components/home/Sections";
import { Hero } from "@/components/hero/Hero";
import { JsonLd } from "@/components/ui/JsonLd";
import { services } from "@/data/services";
import { SITE_DESCRIPTION, STUDIO, publicEmail, siteUrl } from "@/lib/site";

export default function HomePage() {
  const site = siteUrl();
  const email = publicEmail();
  const organization: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: STUDIO,
    description: SITE_DESCRIPTION,
    knowsAbout: services.map((service) => service.title),
  };
  if (site) organization.url = site;
  if (email) organization.email = email;

  const graph = site
    ? [
        organization,
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: STUDIO,
          url: site,
          description: SITE_DESCRIPTION,
        },
      ]
    : organization;

  return (
    <main>
      <JsonLd data={graph} />
      <Hero />
      <Intro />
      <ServiceList />
      <Principles />
      <ProcessPreview />
      <HomeClose />
    </main>
  );
}
