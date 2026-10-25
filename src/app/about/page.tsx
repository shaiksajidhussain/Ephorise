import { ContactBand } from "@/components/home/ContactBand";
import { HeaderArt } from "@/components/ui/HeaderArt";
import { pageMeta } from "@/lib/seo";
import { TAGLINE } from "@/lib/site";

export const metadata = pageMeta({
  title: "About Ephorise | Digital Solutions for Growing Businesses",
  description:
    "Learn about Ephorise, a digital services brand focused on website development, applications, and digital marketing for businesses.",
  path: "/about",
  absolute: true,
  keywords: [
    "About Ephorise",
    "digital solutions company",
    "website development team",
    "digital growth services",
  ],
});

const values = [
  { title: "Innovation", text: "Explore better ways to solve business challenges." },
  { title: "Quality", text: "Pay attention to functionality, usability, and detail." },
  { title: "Transparency", text: "Communicate clearly throughout every project." },
  { title: "Collaboration", text: "Build better solutions by working closely with clients." },
  { title: "Growth", text: "Focus on continuous improvement and long-term value." },
];

export default function AboutPage() {
  return (
    <main>
      <header className="section">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)]">
          <div className="max-w-4xl">
            <p className="label">About Us</p>
            <h1 className="section-title mt-4">We Build Digital Solutions with Purpose</h1>
          <div className="mt-6 grid gap-5">
            <p className="deck">
              Ephorise is a digital services startup focused on helping businesses strengthen their online
              presence and turn ideas into practical digital solutions.
            </p>
            <p className="deck">
              Our work brings together technology, creativity, and business-focused thinking to help companies
              establish their digital foundations and explore new opportunities.
            </p>
            <p className="deck">
              We believe successful digital projects begin with understanding the problem, identifying the
              right approach, and building solutions that serve real business needs.
            </p>
            <p className="deck">
              Ephorise works with businesses internationally, including in the United States and Australia.
            </p>
          </div>
          </div>
          <HeaderArt kind="about" />
        </div>
      </header>

      <section className="border-t border-line">
        <div className="wrap section grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-medium tracking-[-0.03em]">Our Mission</h2>
            <p className="deck mt-4">
              To help businesses make smarter use of digital technology through practical, user-focused, and
              growth-oriented solutions.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-medium tracking-[-0.03em]">Our Vision</h2>
            <p className="deck mt-4">
              To become a trusted digital partner for businesses seeking to innovate, improve their digital
              presence, and grow in an increasingly connected world.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="wrap section">
          <h2 className="section-title">Our Values</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {values.map((value) => (
              <li key={value.title} className="border-t border-line pt-5">
                <h3 className="text-2xl font-medium tracking-[-0.03em]">{value.title}</h3>
                <p className="deck mt-2">{value.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="wrap section">
          <p className="max-w-3xl text-2xl leading-snug tracking-[-0.03em]">
            At Ephorise, we see every project as an opportunity to solve a problem, create value, and help a
            business move forward.
          </p>
          <p className="mt-6 text-lg text-paper">{TAGLINE}</p>
        </div>
      </section>
      <ContactBand button="Start Your Project" />
    </main>
  );
}
