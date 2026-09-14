"use client";

import { FormEvent, useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function MerchantForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    setState("submitting");
    setMessage("");

    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/merchant-applications", {
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
        "Application received. We’ll review your product and contact you if it fits our current live-commerce opportunities."
      );
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
  }

  return (
    <form className="applicationForm" onSubmit={submit}>
      <input
        className="honeypot"
        name="company_site"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="formGrid">
        <label>
          Company name *
          <input name="company" required placeholder="Acme Beauty" />
        </label>

        <label>
          Your name *
          <input name="name" required placeholder="Alex Smith" />
        </label>

        <label>
          Business email *
          <input type="email" name="email" required placeholder="alex@company.com" />
        </label>

        <label>
          Website *
          <input type="url" name="website" required placeholder="https://..." />
        </label>

        <label>
          Country *
          <select name="country" required defaultValue="">
            <option value="" disabled>Select</option>
            <option>Spain</option>
            <option>Italy</option>
            <option>France</option>
            <option>Germany</option>
            <option>Netherlands</option>
            <option>Belgium</option>
            <option>Poland</option>
            <option>Greece</option>
            <option>Other</option>
          </select>
        </label>

        <label>
          Product category *
          <select name="category" required defaultValue="">
            <option value="" disabled>Select</option>
            <option>Beauty & skincare</option>
            <option>Fashion & accessories</option>
            <option>Home & kitchen</option>
            <option>Wellness</option>
            <option>Consumer gadgets</option>
            <option>Pet</option>
            <option>Other</option>
          </select>
        </label>

        <label>
          Average retail price *
          <input name="price" required placeholder="€29.90" />
        </label>

        <label>
          Available inventory
          <input name="inventory" placeholder="e.g. 2,500 units" />
        </label>

        <label>
          TikTok Shop
          <select name="tiktokShop" defaultValue="">
            <option value="">Select</option>
            <option>Already active</option>
            <option>Not active yet</option>
            <option>Not sure</option>
          </select>
        </label>

        <label>
          Monthly online sales
          <select name="monthlySales" defaultValue="">
            <option value="">Select</option>
            <option>Pre-revenue</option>
            <option>Under €10k</option>
            <option>€10k–€50k</option>
            <option>€50k–€250k</option>
            <option>€250k+</option>
          </select>
        </label>

        <label className="full">
          Product URL
          <input type="url" name="productUrl" placeholder="https://..." />
        </label>

        <label className="full">
          Target markets
          <input name="markets" placeholder="Spain, Italy, France..." />
        </label>

        <label className="full">
          Tell us about the product
          <textarea
            name="message"
            rows={5}
            placeholder="Why do customers buy it? What makes it easy to demonstrate? What traction do you already have?"
          />
        </label>
      </div>

      <label className="checkline">
        <input type="checkbox" required />
        <span>I agree to be contacted regarding this application.</span>
      </label>

      <button
        className="btn btnPrimary formSubmit"
        disabled={state === "submitting"}
      >
        {state === "submitting" ? "Submitting..." : "Submit product"}
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
