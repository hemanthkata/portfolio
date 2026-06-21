import PageHeader from "../../components/PageHeader";
import ServiceCard from "../../components/ServiceCard";
import CTA from "../../components/CTA";
import { services } from "../../lib/data";

export const metadata = { title: "Services — Hemanth Kata" };

export default function ServicesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="(02) — Services"
        title="What I Do"
        subtitle="From async Python backends to full ERP deployments and enterprise Java microservices — here's how I can help. Click any service for the full breakdown."
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </section>

      <CTA />
    </main>
  );
}
