import { ContactBand } from "@/components/home/ContactBand";
import { ProcessStory } from "@/components/process/ProcessStory";
import { HeaderArt } from "@/components/ui/HeaderArt";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Our Process | How Ephorise Builds Digital Solutions",
  description:
    "Discover Ephorise's process for planning, designing, developing, testing, and launching websites and digital applications.",
  path: "/our-process",
  absolute: true,
  keywords: [
    "Website development process",
    "software development process",
    "digital project management",
    "application development workflow",
  ],
});

export default function ProcessPage() {
  return (
    <main>
      <header className="section pb-0">
        <div className="wrap relative z-[1] grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)]">
          <div>
            <p className="label">Our Process</p>
            <h1 className="section-title mt-4">A Clear Process. A Shared Vision.</h1>
            <p className="deck mt-6 max-w-3xl">
              A successful digital project needs more than a good idea. It requires clear objectives, thoughtful
              planning, effective communication, and careful execution.
            </p>
            <p className="deck mt-4 max-w-3xl">
              Our process is designed to keep projects organized and clients informed from the first conversation
              through launch.
            </p>
          </div>
          <HeaderArt kind="process" />
        </div>
      </header>
      <section className="section">
        <div className="wrap">
          <ProcessStory showTitle={false} />
        </div>
      </section>
      <ContactBand
        title="Have a project in mind?"
        body="Let's work together to turn your idea into a practical digital solution."
        button="Start Your Project"
      />
    </main>
  );
}
