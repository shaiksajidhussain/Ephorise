import Link from "next/link";
import { ContactBand } from "@/components/home/ContactBand";
import { ServiceMark } from "@/components/ui/Marks";
import { Arrow } from "@/components/ui/Arrow";
import { homeProcess } from "@/data/process";
import { services } from "@/data/services";

const reasons = [
  {
    title: "Business-Focused Solutions",
    text: "Every project starts with your objectives and requirements.",
  },
  {
    title: "Modern Technology",
    text: "We focus on contemporary, scalable digital solutions.",
  },
  {
    title: "User-Centered Design",
    text: "We aim to create intuitive and engaging digital experiences.",
  },
  {
    title: "Collaborative Approach",
    text: "We work closely with you throughout the project.",
  },
  {
    title: "Growth-Oriented Thinking",
    text: "We consider how your digital presence can support your future goals.",
  },
];

export function Intro() {
  return (
    <section className="section border-t border-line">
      <div className="wrap relative z-[1] grid gap-12 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7">
          <p className="label">Introduction</p>
          <h2 className="section-title mt-4">Your Ideas. Our Digital Expertise.</h2>
        </div>
        <div className="min-w-0 grid gap-5 lg:col-span-5 lg:pt-10">
          <p className="deck">
            At Ephorise, we help businesses establish, strengthen, and grow their digital presence. From
            building professional websites and custom applications to improving online visibility through
            digital marketing, we provide digital solutions designed around your business goals.
          </p>
          <p className="deck">
            Whether you&apos;re launching a new business, upgrading your existing digital presence, or looking
            to reach more customers online, we&apos;re here to help you take the next step.
          </p>
        </div>
      </div>
    </section>
  );
}

export function ServiceList() {
  return (
    <section className="section border-t border-line">
      <div className="wrap relative z-[1]">
        <p className="label">Services</p>
        <h2 className="section-title mt-4">Digital Solutions for Business Growth</h2>
        <div className="mt-12">
          {services.map((service) => (
            <Link key={service.id} href={`/services/${service.id}`} className="service-row">
              <span className="flex items-center gap-3">
                <ServiceMark id={service.id} />
                <span className="label">{service.index}</span>
              </span>
              <span className="row-title text-2xl font-medium tracking-[-0.03em]">{service.title}</span>
              <span className="text-mute">{service.homeText}</span>
              <span className="inline-flex items-center gap-2 text-sm">
                Read
                <Arrow />
              </span>
            </Link>
          ))}
        </div>
        <Link href="/services" className="btn btn-solid mt-10">
          Explore All Services
          <Arrow />
        </Link>
      </div>
    </section>
  );
}

export function Principles() {
  return (
    <section className="section border-t border-line">
      <div className="wrap relative z-[1] grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="min-w-0 self-start lg:sticky lg:top-28">
          <p className="label">Why Choose Ephorise?</p>
          <h2 className="section-title mt-4">A Smarter Approach to Digital Growth</h2>
          <p className="deck mt-6">
            We believe technology and creativity work best when they serve a clear business purpose. Our
            approach focuses on understanding your goals, developing practical solutions, and creating digital
            experiences that support long-term growth.
          </p>
        </div>
        <ol className="min-w-0">
          {reasons.map((item, index) => (
            <li key={item.title} className="border-t border-line py-7">
              <p className="label">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-2xl font-medium tracking-[-0.03em]">{item.title}</h3>
              <p className="deck mt-3">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ProcessPreview() {
  return (
    <section className="section border-t border-line">
      <div className="wrap relative z-[1] grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="label">Our Process</p>
          <h2 className="section-title mt-4">From Idea to Execution</h2>
          <Link href="/our-process" className="mt-8 inline-flex items-center gap-2">
            See the full process
            <Arrow />
          </Link>
        </div>
        <ol className="lg:col-span-7">
          {homeProcess.map((step) => (
            <li key={step.index} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-5">
              <span className="label">{step.index}</span>
              <div>
                <h3 className="text-2xl font-medium tracking-[-0.03em]">{step.title}</h3>
                <p className="deck mt-2">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function HomeClose() {
  return (
    <ContactBand
      title="Ready to Build Something Better?"
      body="Have an idea, a business challenge, or a digital project in mind? Let's discuss how Ephorise can help bring it to life."
      button="Start Your Project"
    />
  );
}
