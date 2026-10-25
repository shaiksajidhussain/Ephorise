"use client";

import { useId, useState } from "react";
import {
  budgetOptions,
  serviceOptions,
  validateInquiry,
  type InquiryErrors,
} from "@/lib/inquiry";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

export function InquiryForm({
  initialService = "",
  project = null,
  projectTitle = null,
}: {
  initialService?: string;
  project?: string | null;
  projectTitle?: string | null;
}) {
  const baseId = useId();
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      phone: String(data.get("phone") ?? ""),
      service: String(data.get("service") ?? ""),
      budget: String(data.get("budget") ?? ""),
      details: String(data.get("details") ?? ""),
      project: project ?? "",
      consent: data.get("consent") === "on",
      company_site: String(data.get("company_site") ?? ""),
    };

    if (payload.company_site) {
      setStatus({ state: "success" });
      return;
    }

    const checked = validateInquiry(payload);
    if (!checked.ok) {
      setErrors(checked.errors);
      setStatus({ state: "idle" });
      return;
    }

    setErrors({});
    setStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        code?: string;
        errors?: InquiryErrors;
      } | null;
      if (!response.ok || !body?.ok) {
        if (body?.errors) setErrors(body.errors);
        setStatus({
          state: "error",
          message:
            body?.error ??
            "The inquiry could not be sent. Check the form and try again.",
        });
        return;
      }
      setStatus({ state: "success" });
      form.reset();
    } catch {
      setStatus({
        state: "error",
        message: "The inquiry could not be sent. The connection failed before it reached the studio endpoint.",
      });
    }
  }

  if (status.state === "success") {
    return (
      <div className="border-t border-line py-10" role="status">
        <h2 className="text-3xl font-medium tracking-[-0.04em]">Thank you for contacting Ephorise!</h2>
        <p className="deck mt-4">We&apos;ve received your enquiry and will get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <form className="relative grid gap-8 border-t border-line pt-8" onSubmit={onSubmit} noValidate>
      {projectTitle ? (
        <p className="deck">
          You are writing about {projectTitle}.
        </p>
      ) : null}
      <div className="hp" aria-hidden="true">
        <label htmlFor={`${baseId}-company-site`}>Leave this field empty</label>
        <input id={`${baseId}-company-site`} name="company_site" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Field id={`${baseId}-name`} name="name" label="Full Name" autoComplete="name" error={errors.name} required />
        <Field
          id={`${baseId}-email`}
          name="email"
          label="Business Email"
          type="email"
          autoComplete="email"
          error={errors.email}
          required
        />
        <Field id={`${baseId}-company`} name="company" label="Company Name (optional)" autoComplete="organization" />
        <Field
          id={`${baseId}-phone`}
          name="phone"
          label="Phone Number (optional)"
          type="tel"
          autoComplete="tel"
          error={errors.phone}
        />
        <div className="field">
          <label className="field-label" htmlFor={`${baseId}-service`}>
            Service Required
          </label>
          <select
            id={`${baseId}-service`}
            name="service"
            defaultValue={initialService}
            aria-invalid={errors.service ? true : undefined}
            aria-describedby={errors.service ? `${baseId}-service-error` : undefined}
            required
          >
            <option value="">Select a service</option>
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.service ? (
            <p id={`${baseId}-service-error`} className="field-error">
              {errors.service}
            </p>
          ) : null}
        </div>
        <div className="field md:col-span-2">
          <label className="field-label" htmlFor={`${baseId}-budget`}>
            Estimated Budget (optional)
          </label>
          <select id={`${baseId}-budget`} name="budget" defaultValue="">
            {budgetOptions.map((option) => (
              <option key={option.value || "discuss"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="text-sm text-mute">A range helps us understand the shape of the work. It is not a quote.</p>
        </div>
      </div>
      <div className="field">
        <label className="field-label" htmlFor={`${baseId}-details`}>
          Project Details
        </label>
        <textarea
          id={`${baseId}-details`}
          name="details"
          required
          aria-invalid={errors.details ? true : undefined}
          aria-describedby={errors.details ? `${baseId}-details-error` : `${baseId}-details-hint`}
        />
        <p id={`${baseId}-details-hint`} className="text-sm text-mute">
          What the business needs to do, who it is for, and any timing you already know.
        </p>
        {errors.details ? (
          <p id={`${baseId}-details-error`} className="field-error">
            {errors.details}
          </p>
        ) : null}
      </div>
      <div className="field">
        <label className="flex items-start gap-3 text-sm text-mute" htmlFor={`${baseId}-consent`}>
          <input
            id={`${baseId}-consent`}
            name="consent"
            type="checkbox"
            className="mt-1 h-4 w-4"
            aria-invalid={errors.consent ? true : undefined}
            required
          />
          <span>Use this enquiry only to reply. It will not be added to a mailing list.</span>
        </label>
        {errors.consent ? <p className="field-error">{errors.consent}</p> : null}
      </div>
      {status.state === "error" ? (
        <p role="alert" className="field-error">
          {status.message}
        </p>
      ) : null}
      <div>
        <button className="btn btn-solid" type="submit" disabled={status.state === "submitting"}>
          {status.state === "submitting" ? "Sending" : "Send Your Enquiry"}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  error,
  type = "text",
  autoComplete,
  required,
}: {
  id: string;
  name: string;
  label: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
