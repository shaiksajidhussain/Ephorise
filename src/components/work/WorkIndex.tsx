import { ProjectPreview } from "@/components/work/ProjectPreview";
import { websiteProjects } from "@/data/projects";

export function WorkIndex() {
  return (
    <div>
      {websiteProjects.map((project) => (
        <ProjectPreview key={project.slug} project={project} />
      ))}
    </div>
  );
}
