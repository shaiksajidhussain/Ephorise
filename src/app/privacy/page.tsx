import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy Policy | Ephorise",
  description: "How Ephorise uses the details you send through the enquiry form.",
  path: "/privacy",
  absolute: true,
});

export default function PrivacyPage() {
  return (
    <main className="section">
      <div className="wrap max-w-3xl">
        <p className="label">Privacy Policy</p>
        <h1 className="section-title mt-4">How enquiry details are used</h1>
        <div className="mt-8 grid gap-5 text-lg leading-relaxed">
          <p>
            The contact form collects your name, business email, company name, phone number, the service you
            need, an estimated budget, and your project details. Company, phone, and budget are optional.
          </p>
          <p>
            Ephorise uses that information to read and reply to your enquiry. It is not sold, and it is not
            added to a mailing list.
          </p>
          <p>
            The enquiry is sent to the studio&apos;s delivery endpoint so a person can respond. Do not include
            passwords, payment details, or other secrets.
          </p>
        </div>
      </div>
    </main>
  );
}
