"use client";

import { FormEvent, useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function HostForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    setState("submitting");
    setMessage("");

    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/host-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not submit application.");
      }

      form.reset();
      setState("success");
      setMessage(
        "Application received. We’ll contact you if your profile matches an upcoming host opportunity."
      );
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
  }

  return (
    <form className="hostForm" onSubmit={submit}>
      <input
        className="honeypot"
        name="company_site"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="formGrid">
        <label>
          Your name *
          <input name="name" required placeholder="Your name" />
        </label>

        <label>
          Email *
          <input type="email" name="email" required placeholder="you@email.com" />
        </label>

        <label>
          Country / city *
          <input name="countryCity" required placeholder="Madrid, Spain" />
        </label>

        <label>
          TikTok / Instagram URL
          <input type="url" name="socialUrl" placeholder="https://..." />
        </label>

        <label className="full">
          Languages
          <input name="languages" placeholder="Spanish, English..." />
        </label>

        <label className="full">
          Categories you would enjoy selling
          <input name="categories" placeholder="Beauty, home, gadgets..." />
        </label>

        <label className="full">
          Tell us about yourself
          <textarea
            name="about"
            rows={4}
            placeholder="Camera experience, sales experience, availability..."
          />
        </label>
      </div>

      <button
        className="btn btnPrimary formSubmit"
        disabled={state === "submitting"}
      >
        {state === "submitting" ? "Submitting..." : "Apply as a host"}
      </button>

      <p
        className={`formStatus ${state === "error" ? "error" : ""}`}
        aria-live="polite"
      >
        {message}
      </p>
    </form>
  );
}
