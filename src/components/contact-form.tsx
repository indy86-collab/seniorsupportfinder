"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        topic: formData.get("topic"),
        message: formData.get("message"),
      }),
    }).catch(() => null);

    if (response?.ok) {
      setStatus("sent");
      setMessage("Thank you. Your message has been sent.");
      form.reset();
      return;
    }

    const data = await response?.json().catch(() => null);
    setStatus("error");
    setMessage(data?.error || "We could not send your message right now. Please try again later.");
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-white p-6 shadow-[0_10px_26px_rgba(15,27,61,0.08)] ring-1 ring-slate-200">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" autoComplete="name" />
        <Field label="Email address" name="email" type="email" autoComplete="email" />
      </div>
      <label className="mt-5 block">
        <span className="text-sm font-bold text-slate-950">What is this about?</span>
        <select name="topic" className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f8fbfb] px-4 py-3 text-slate-950 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20">
          <option>General enquiry</option>
          <option>Outdated or broken link</option>
          <option>Suggest a support source</option>
          <option>Accessibility feedback</option>
          <option>Privacy question</option>
        </select>
      </label>
      <label className="mt-5 block">
        <span className="text-sm font-bold text-slate-950">Message</span>
        <textarea name="message" required rows={7} className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f8fbfb] px-4 py-3 text-slate-950 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20" placeholder="Tell us how we can help, or what needs updating." />
      </label>
      <button disabled={status === "sending"} type="submit" className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#007c89] px-6 py-3 font-bold text-white shadow-md hover:bg-[#006d77] disabled:cursor-wait disabled:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
        <Send aria-hidden="true" className="h-5 w-5" />
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
      {message && (
        <p className={`mt-4 rounded-xl px-4 py-3 text-sm font-semibold ${status === "sent" ? "bg-[#f1faee] text-[#2f7d46] ring-1 ring-[#b9deb6]" : "bg-amber-50 text-amber-900 ring-1 ring-amber-100"}`} role="status">
          {message}
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-950">{label}</span>
      <input name={name} type={type} required autoComplete={autoComplete} className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f8fbfb] px-4 py-3 text-slate-950 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20" />
    </label>
  );
}
