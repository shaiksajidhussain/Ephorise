import Image from "next/image";
import type { WebsiteProject } from "@/data/projects";

/**
 * A project screenshot in a fixed-ratio frame. Shows a themed placeholder
 * (browser bar + project name) until `src` is provided.
 */
export function ProjectShot({
  project,
  src,
  alt,
  sizes,
  preload = false,
  className = "",
  zoom = false,
}: {
  project: WebsiteProject;
  src?: string;
  alt?: string;
  sizes: string;
  preload?: boolean;
  className?: string;
  zoom?: boolean;
}) {
  return (
    <div className={`project-shot ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt ?? `${project.title} website preview`}
          fill
          sizes={sizes}
          preload={preload}
          className={`object-cover object-top ${zoom ? "transition-transform duration-500 group-hover:scale-[1.03]" : ""}`}
        />
      ) : (
        <div className="project-shot-placeholder">
          <div className="browser-bar">
            <i />
            <i />
            <i />
            <span className="ml-2 truncate">{project.slug.replace(/-/g, "")}</span>
          </div>
          <div className="flex flex-1 flex-col justify-end p-6 md:p-8">
            <p className="label">{project.status ?? project.industry}</p>
            <p className="mt-3 text-4xl font-medium tracking-[-0.05em] md:text-5xl">{project.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}
