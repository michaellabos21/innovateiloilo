"use client";

import { useState } from "react";
import { contact } from "@/lib/content";
import { PillButton } from "./ui";

// No delivery service is connected yet. The contact form hands the message to the
// visitor's mail app; the newsletter field only acknowledges the address.
export function NewsletterForm() {
  const [done, setDone] = useState(false);
  if (done) {
    return (
      <p role="status" className="text-sm">
        Newsletter sign-ups aren&apos;t open yet — email us at{" "}
        <a className="underline" href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>
    );
  }
  return (
    <form
      className="flex h-10 w-full max-w-[310px]"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <label className="sr-only" htmlFor="newsletter-email">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        required
        autoComplete="email"
        placeholder="Enter your email address"
        className="min-w-0 flex-1 rounded-l-[5px] border border-r-0 border-rule bg-transparent px-5 text-sm text-white placeholder:text-white/70"
      />
      <button type="submit" className="bg-brand px-[18px] text-sm font-bold text-[#f5f1e6] hover:bg-white hover:text-ink">
        Submit
      </button>
    </form>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
        window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
          String(f.get("subject")),
        )}&body=${encodeURIComponent(body)}`;
        setSent(true);
      }}
    >
      <Field label="Your name" name="name" placeholder="enter your name here" autoComplete="name" />
      <Field label="Email" name="email" type="email" placeholder="enter your email address here" autoComplete="email" />
      <Field label="Subject" name="subject" placeholder="subject of your message" />
      <label className="block text-lg leading-none">
        Message*
        <textarea
          name="message"
          required
          rows={3}
          placeholder="type your message here"
          className="field mt-2.5 block h-auto min-h-[95px] py-2.5"
        />
      </label>
      <PillButton type="submit" tone="brand" className="mt-6 w-full justify-between">
        Submit message
      </PillButton>
      {sent ? (
        <p role="status" className="text-sm text-white/80">
          Your mail app should now open with the message ready to send. If it didn&apos;t, write to {contact.email}.
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  autoComplete?: string;
}) {
  return (
    <label className="block text-lg leading-none">
      {label}*
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="field mt-2.5 block"
      />
    </label>
  );
}
