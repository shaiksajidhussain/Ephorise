import Link from "next/link";
import { Arrow } from "@/components/ui/Arrow";
import { ProjectShot } from "@/components/work/ProjectShot";
import type { WebsiteProject } from "@/data/projects";

export function ProjectCard({
  project,
  priority = false,
  headingLevel = "h2",
}: {
  project: WebsiteProject;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const href = `/our-work/${project.slug}`;
  const Heading = headingLevel;

  return (
    <article id={project.slug} className="project-card group">
      <Link href={href} tabIndex={-1} aria-hidden="true">
        <ProjectShot
          project={project}
          src={project.image}
          sizes="(max-width: 768px) 100vw, 45vw"
          preload={priority}
          zoom
        />
      </Link>

      <div className="mt-6 flex items-start justify-between gap-4">
        <p className="label">{project.industry}</p>
        <p className="label shrink-0 text-right">{project.status ?? project.kind ?? "Client Project"}</p>
      </div>

      <Heading className="project-title mt-4 text-3xl font-medium tracking-[-0.04em] md:text-4xl">
        <Link href={href}>{project.title}</Link>
      </Heading>
      <p className="deck mt-4">{project.summary}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={href} className="btn btn-solid">
          View Project
          <Arrow />
        </Link>
        {project.url ? (
          <a href={project.url} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
            Visit Website
            <Arrow />
          </a>
        ) : null}
      </div>

      <p className="label mt-auto pt-8">{project.services.join("  ·  ")}</p>
    </article>
  );
}
