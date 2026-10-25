import Link from "next/link";
import { Arrow } from "@/components/ui/Arrow";

export function ContactBand({
  title = "Ready to Build Something Better?",
  body = "Have an idea, a business challenge, or a digital project in mind? Let's discuss how Ephorise can help bring it to life.",
  href = "/contact",
  button = "Start Your Project",
}: {
  title?: string;
  body?: string;
  href?: string;
  button?: string;
}) {
  return (
    <section className="border-t border-line bg-panel">
      <div className="wrap section relative z-[1] grid items-end gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="label">Contact Us</p>
          <h2 className="mt-5 max-w-[14ch] text-[clamp(2.6rem,5.6vw,5.4rem)] font-medium leading-[0.96] tracking-[-0.048em]">
            {title}
          </h2>
        </div>
        <div className="lg:col-span-4">
          <p className="deck">{body}</p>
          <Link href={href} className="btn btn-solid mt-8">
            {button}
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
