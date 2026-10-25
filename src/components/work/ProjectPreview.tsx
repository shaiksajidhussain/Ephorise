import { Arrow } from "@/components/ui/Arrow";
import type { WebsiteProject } from "@/data/projects";

export function ProjectPreview({ project }: { project: WebsiteProject }) {
  return (
    <article className="border-t border-line py-8">
      <p className="label">{project.industry}</p>
      <h3 className="mt-3 text-3xl font-medium tracking-[-0.04em]">{project.title}</h3>
      <p className="deck mt-3">{project.summary}</p>
      <p className="mt-4 text-sm text-mute">{project.services.join(" | ")}</p>
      {project.url ? (
        <a href={project.url} className="mt-5 inline-flex items-center gap-2 text-sm" target="_blank" rel="noopener noreferrer">
          View Website
          <Arrow />
        </a>
      ) : null}
    </article>
  );
}
