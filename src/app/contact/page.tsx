import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/forms";
import { contact, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions, concerns or ideas? Get in touch with Innovate Iloilo.",
};

export default function Contact() {
  return (
    <div className="relative overflow-hidden">
      <Image
        src="/art/contact-bg.svg"
        width={774}
        height={1139}
        alt=""
        className="pointer-events-none absolute left-[30%] top-[407px] hidden w-[54%] max-w-[774px] opacity-[0.13] lg:block"
      />
      <div className="wrap relative grid grid-cols-12 gap-x-6 gap-y-12 pb-16 pt-10 lg:pb-[120px] lg:pt-[75px]">
        <div className="col-span-12 lg:col-span-5">
          <h1 className="t-display uppercase">Contact</h1>
          <p className="mt-8 text-lg font-semibold lg:mt-[55px]">Welcome, Start-up Founders and Investors!</p>
          <div className="mt-4 max-w-[519px] space-y-5 text-sm leading-normal">
            {site.contact.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="mt-10 space-y-[35px] text-lg lg:mt-[55px]">
            <div>
              <dt className="font-bold">Email</dt>
              <dd><a className="hover:text-brand" href={`mailto:${contact.email}`}>{contact.email}</a></dd>
            </div>
            <div>
              <dt className="font-bold">Contact Number</dt>
              <dd><a className="hover:text-brand" href={contact.phoneHref}>{contact.phone}</a></dd>
            </div>
            <div>
              <dt className="font-bold">Office Address</dt>
              <dd>{contact.address}</dd>
            </div>
          </dl>
        </div>
        <section className="col-span-12 bg-ink px-6 py-10 text-white sm:px-[85px] sm:py-[60px] lg:col-span-6 lg:col-start-7" aria-labelledby="form-title">
          <h2 id="form-title" className="t-label mb-[50px] normal-case">Send us a Message.</h2>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
