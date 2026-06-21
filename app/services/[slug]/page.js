import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "../../../components/PageHeader";
import Reveal from "../../../components/Reveal";
import CTA from "../../../components/CTA";
import { services, getService } from "../../../lib/data";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const s = getService(params.slug);
  return { title: s ? `${s.title} — Hemanth Kata` : "Service" };
}

export default function ServiceDetail({ params }) {
  const service = getService(params.slug);
  if (!service) notFound();

  return (
    <main>
      <PageHeader eyebrow="Service" title={service.title} subtitle={service.tagline} />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <Reveal>
          <Link href="/services" className="text-sm text-muted transition-colors hover:text-white">
            ← All services
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-10 text-xl leading-relaxed text-white/90">{service.overview}</p>
        </Reveal>

        <div className="mt-14">
          <Reveal>
            <h2 className="text-sm uppercase tracking-[0.25em] text-muted">Capabilities</h2>
          </Reveal>
          <ul className="mt-6 space-y-px overflow-hidden rounded-2xl border border-line bg-line">
            {service.capabilities.map((c, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <li className="flex items-start gap-4 bg-bg p-5">
                  <span className="mt-1 text-accent">✦</span>
                  <span className="text-muted">{c}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="mt-14">
          <Reveal>
            <h2 className="text-sm uppercase tracking-[0.25em] text-muted">Tech Stack</h2>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-6 flex flex-wrap gap-3">
              {service.stack.map((t) => (
                <span key={t} className="rounded-full border border-line px-4 py-2 text-sm text-muted">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTA />
    </main>
  );
}
