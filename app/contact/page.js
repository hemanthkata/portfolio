import PageHeader from "../../components/PageHeader";
import Reveal from "../../components/Reveal";
import { profile, certifications } from "../../lib/data";

export const metadata = { title: "Contact — Hemanth Kata" };

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone}` },
  { label: "GitHub", value: "github.com/hemanthkata", href: profile.github },
  { label: "LinkedIn", value: "linkedin.com/in/hemanth-kata", href: profile.linkedin },
];

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        eyebrow="(05) — Contact"
        title="Let's Talk"
        subtitle="Open to full-time roles and freelance projects. Reach out through any channel below — I usually reply within a day."
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08}>
              <a
                href={c.href}
                className="group flex items-center justify-between bg-bg p-8 transition-colors hover:bg-surface"
              >
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted">{c.label}</div>
                  <div className="mt-2 text-lg font-semibold md:text-xl">{c.value}</div>
                </div>
                <span className="text-2xl text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent">
                  →
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 rounded-2xl border border-line bg-surface p-10 text-center">
            <h2 className="text-3xl font-extrabold uppercase tracking-tight md:text-5xl">
              Available for hire
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted">
              Based in {profile.location} · Open to remote roles worldwide.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
            >
              Send me an email →
            </a>
          </div>
        </Reveal>

        <div className="mt-16">
          <Reveal>
            <h2 className="text-sm uppercase tracking-[0.25em] text-muted">Certifications</h2>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-6 flex flex-wrap gap-3">
              {certifications.map((c) => (
                <span key={c} className="rounded-full border border-line px-4 py-2 text-sm text-muted">
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
