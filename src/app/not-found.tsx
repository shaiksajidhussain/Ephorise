import Link from "next/link";
import { pageMeta } from "@/lib/seo";

export const metadata = {
  ...pageMeta({
    title: "Page not found",
    description: "This page is not part of the Ephorise site.",
    path: "/",
    canonical: false,
  }),
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="section">
      <div className="wrap">
        <p className="label">404</p>
        <h1 className="section-title mt-4">This page is not on the site.</h1>
        <p className="deck mt-6">The address may be mistyped, or the page may have moved.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-solid">
            Back to home
          </Link>
          <Link href="/our-work" className="btn btn-ghost">
            View our work
          </Link>
        </div>
      </div>
    </main>
  );
}
