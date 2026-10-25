import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Terms and Conditions | Ephorise",
  description: "The terms that apply to using the Ephorise website and starting a project.",
  path: "/terms",
  absolute: true,
});

export default function TermsPage() {
  return (
    <main className="section">
      <div className="wrap max-w-3xl">
        <p className="label">Terms and Conditions</p>
        <h1 className="section-title mt-4">Using this website</h1>
        <div className="mt-8 grid gap-5 text-lg leading-relaxed">
          <p>
            The pages on this site describe Ephorise&apos;s services. A project begins only when both sides
            agree the scope. Sending an enquiry does not create that agreement.
          </p>
          <p>
            Project names are published where Ephorise is authorized to mention the work. They are not a
            promise of a particular ranking, sales, or revenue result.
          </p>
          <p>
            Names in Brands That Inspire Us are examples of digital experiences. They are not clients,
            partners, or a claim of a business relationship with Ephorise.
          </p>
        </div>
      </div>
    </main>
  );
}
