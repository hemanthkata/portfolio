import Link from "next/link";
import Reveal from "./Reveal";
import ServiceCard from "./ServiceCard";
import { services } from "../lib/data";

export default function Expertise() {
  return (
    <section id="expertise" className="border-t border-line bg-surface py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between">
          <div>
            <Reveal>
              <span className="text-xs uppercase tracking-[0.25em] text-muted">
                (02) — Expertise
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-5xl">
                What I build with.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link
              href="/services"
              className="hidden text-sm text-accent transition-opacity hover:opacity-70 md:inline-block"
            >
              View all services →
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
