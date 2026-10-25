import Link from "next/link";
import { ContactBand } from "@/components/home/ContactBand";
import { Arrow } from "@/components/ui/Arrow";
import { HeaderArt } from "@/components/ui/HeaderArt";
import { WorkMark } from "@/components/ui/Marks";
import { inspirationBrands, moreWebsiteWork, socialProjects, websiteProjects } from "@/data/projects";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Our Work | Website Development & Digital Marketing | Ephorise",
  description:
    "Explore Ephorise's website development and digital marketing projects across sports, lifestyle, food, finance, fashion, and consumer brands.",
  path: "/our-work",
  absolute: true,
  keywords: [
    "Website development portfolio",
    "digital marketing projects",
    "web development company",
    "Instagram marketing services",
    "business website development",
  ],
});

export default function OurWorkPage() {
  return (
    <main>
      <header className="section">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)]">
          <div>
            <p className="label">Building Digital Experiences. Growing Brands.</p>
            <h1 className="section-title mt-4">Ideas We&apos;ve Brought to Life</h1>
            <p className="deck mt-6 max-w-3xl">
              At Ephorise, we work with brands across different industries to build their digital presence and
              connect with their audiences. From website development to social media marketing, our focus is on
              creating digital experiences that reflect each brand&apos;s identity and business goals.
            </p>
            <p className="deck mt-4">Explore some of the brands and projects we&apos;ve worked on.</p>
          </div>
          <HeaderArt kind="work" />
        </div>
      </header>

      <section className="border-t border-line">
        <div className="wrap section relative z-[1] grid gap-8 md:grid-cols-2">
          {websiteProjects.map((project, index) => (
            <article key={project.slug} id={project.slug} className="border border-line p-6 md:p-8">
              <WorkMark index={index} />
              <p className="label">{project.industry}</p>
              <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em]">{project.title}</h2>
              <p className="deck mt-4">{project.summary}</p>
              <p className="mt-5 text-sm text-paper">Our Work: {project.services.join(" | ")}</p>
              {project.url ? (
                <a
                  href={project.url}
                  className="btn btn-ghost mt-6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Website
                  <Arrow />
                </a>
              ) : null}
            </article>
          ))}
          <article className="border border-line p-6 md:p-8">
            <WorkMark index={5} />
            <p className="label">{moreWebsiteWork.industry}</p>
            <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em]">{moreWebsiteWork.title}</h2>
            <p className="deck mt-4">{moreWebsiteWork.summary}</p>
            <p className="mt-5 text-sm text-paper">Our Work: {moreWebsiteWork.services.join(" | ")}</p>
            <Link href="/contact?service=website-development" className="btn btn-ghost mt-6">
              Explore Projects
              <Arrow />
            </Link>
          </article>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="wrap section relative z-[1]">
          <h2 className="section-title">Helping Brands Connect with Their Audience</h2>
          <p className="deck mt-6 max-w-3xl">
            A strong digital presence goes beyond a website. At Ephorise, we also support brands through social
            media marketing, content planning, and digital brand communication to help them connect with their
            audiences online.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {socialProjects.map((project, index) => (
              <article key={project.slug} id={project.slug} className="border-t border-line pt-6">
                <WorkMark index={index + 2} />
                <p className="label">{project.platform}</p>
                <h3 className="mt-3 text-2xl font-medium tracking-[-0.03em]">{project.title}</h3>
                <p className="mt-3 text-sm text-paper">{project.service}</p>
                <p className="deck mt-3">{project.summary}</p>
                {project.url ? (
                  <a
                    href={project.url}
                    className="mt-5 inline-flex items-center gap-2 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Instagram
                    <Arrow />
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="wrap section relative z-[1]">
          <p className="label">Brands That Inspire Us</p>
          <h2 className="section-title mt-4">Inspired by the Best Digital Experiences</h2>
          <p className="deck mt-6 max-w-3xl">
            We believe great digital experiences combine thoughtful design, intuitive navigation, strong
            branding, and customer-focused functionality. These well-known brands inspire our approach to
            creating meaningful online experiences.
          </p>
          <p className="mt-4 text-sm text-mute">
            Brands That Inspire Us. These are examples of digital experiences we admire. They are not clients,
            partners, or a claim of a business relationship with Ephorise.
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {inspirationBrands.map((brand) => (
              <li key={brand.name} className="border-t border-line pt-5">
                <h3 className="text-2xl font-medium tracking-[-0.03em]">{brand.name}</h3>
                <p className="deck mt-2">Known for: {brand.knownFor}</p>
              </li>
            ))}
          </ul>
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
