import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactBand } from "@/components/home/ContactBand";
import { Arrow } from "@/components/ui/Arrow";
import { JsonLd } from "@/components/ui/JsonLd";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ProjectShot } from "@/components/work/ProjectShot";
import { getWebsiteProject, websiteProjects } from "@/data/projects";
import { pageMeta } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return websiteProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getWebsiteProject(slug);
  if (!project) return pageMeta({ title: "Our Work", path: "/our-work" });
  return pageMeta({
    title: `${project.title} | ${project.industry} Project | Ephorise`,
    description: project.summary,
    path: `/our-work/${project.slug}`,
    absolute: true,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getWebsiteProject(slug);
  if (!project) notFound();

  const index = websiteProjects.indexOf(project);
  const related = [1, 2].map((step) => websiteProjects[(index + step) % websiteProjects.length]);
  const description = project.description ?? [project.summary];
  const gallery = project.gallery ?? [];

  const site = siteUrl();
  const crumb = site
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site },
          { "@type": "ListItem", position: 2, name: "Our Work", item: `${site}/our-work` },
          { "@type": "ListItem", position: 3, name: project.title, item: `${site}/our-work/${project.slug}` },
        ],
      }
    : null;

  return (
    <main>
      {crumb ? <JsonLd data={crumb} /> : null}

      <header className="pt-[clamp(4.5rem,9vw,8.25rem)]">
        <div className="wrap relative z-[1] max-w-6xl">
          <Link href="/our-work" className="btn btn-ghost back-link">
            <span className="inline-flex rotate-180">
              <Arrow />
            </span>
            Back to Our Work
          </Link>
          <p className="label mt-10">
            <Link href="/our-work">Our Work</Link>
            <span aria-hidden="true"> / </span>
            {project.kind ?? "Client Project"}
          </p>
          <h1 className="section-title mt-4">{project.title}</h1>
          {project.status ? <p className="status-badge mt-5">{project.status}</p> : null}
          <p className="deck mt-6 max-w-2xl">{project.summary}</p>
          <ProjectShot
            project={project}
            src={project.image}
            sizes="(max-width: 1200px) 100vw, 72rem"
            preload
            className="mt-12"
          />
        </div>
      </header>

      <section className="section">
        <div className="wrap relative z-[1] grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            {description.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="mt-5 text-lg leading-relaxed text-mute first:mt-0">
                {paragraph}
              </p>
            ))}

            {project.highlights ? (
              <div className="mt-10">
                <p className="label">What We Built</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {project.highlights.map((item) => (
                    <li key={item} className="border-t border-line pt-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {gallery.length ? (
              <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:[&>*:last-child:nth-child(odd)]:col-span-2">
                {gallery.map((src, shot) => (
                  <ProjectShot
                    key={src}
                    project={project}
                    src={src}
                    alt={`${project.title} screen ${shot + 1}`}
                    sizes="(max-width: 640px) 100vw, 30rem"
                  />
                ))}
              </div>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="label">Record</p>
            <dl className="mt-4 space-y-3">
              <div>
                <dt className="sr-only">Industry</dt>
                <dd>{project.industry}</dd>
              </div>
              <div>
                <dt className="inline text-mute">Client: </dt>
                <dd className="inline">{project.client ?? project.title}</dd>
              </div>
              {project.status ? (
                <div>
                  <dt className="inline text-mute">Status: </dt>
                  <dd className="inline">{project.status}</dd>
                </div>
              ) : null}
            </dl>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Services and technology">
              {[...project.services, ...(project.stack ?? [])].map((tag) => (
                <li key={tag} className="border border-line px-3 py-1.5 text-sm">
                  {tag}
                </li>
              ))}
            </ul>

            <div className="mt-6 grid gap-3">
              {project.url ? (
                <a href={project.url} className="btn btn-solid w-full" target="_blank" rel="noopener noreferrer">
                  Visit Live Site
                  <Arrow />
                </a>
              ) : null}
              {project.links?.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="btn btn-ghost w-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                  <Arrow />
                </a>
              ))}
              {!project.url && project.status ? (
                <p className="text-sm text-mute">The website is {project.status.toLowerCase()}.</p>
              ) : null}
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="wrap section relative z-[1] max-w-6xl">
          <p className="label">Related</p>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {related.map((item) => (
              <ProjectCard key={item.slug} project={item} headingLevel="h3" />
            ))}
          </div>
        </div>
      </section>

      <ContactBand
        title="Have a Project in Mind?"
        body="Whether you need a professional website, a stronger social media presence, or a complete digital solution, Ephorise is ready to help you take the next step. Build Smarter. Grow Faster."
        button="Let's Discuss Your Project"
      />
    </main>
  );
}
