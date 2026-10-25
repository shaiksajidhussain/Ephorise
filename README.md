# Ephorise

Digital studio website for Ephorise. React, Next.js, TypeScript, and a custom WebGL sculpture on large screens.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## Environment

Copy `.env.example` to `.env.local`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical URLs, Open Graph, sitemap, and robots. Use the live `https` origin. Localhost is ignored so it is never published. |
| `NEXT_PUBLIC_PUBLIC_EMAIL` | Optional | Public email in the footer and on the contact page. Hidden when unset. |
| `CONTACT_WEBHOOK_URL` | To deliver inquiries | Server-only HTTPS endpoint. The contact form posts to `/api/contact`, which validates the note and forwards JSON. Without this variable the form returns an error and does not pretend the message was sent. |

Local development also accepts `http://127.0.0.1` or `http://localhost` as the webhook so you can test delivery. Production accepts public `https` endpoints only.

Webhook JSON:

```json
{
  "name": "",
  "email": "",
  "company": "",
  "service": "",
  "budget": "",
  "details": "",
  "project": null,
  "projectType": null,
  "submittedAt": ""
}
```

Do not put the webhook URL or any private token in client code.

## Projects

Studies live in `src/data/projects.ts`. Add a published project there and a matching cover in `src/components/covers/Covers.tsx`. Case study pages are generated from the slug. Mark real client work by extending `projectType` only when the engagement can be named. The current entries are studio concepts.
