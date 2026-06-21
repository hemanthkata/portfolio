import PageHeader from "../../components/PageHeader";
import Timeline from "../../components/Timeline";
import ResumeDownload from "../../components/ResumeDownload";
import CTA from "../../components/CTA";

export const metadata = { title: "Experience — Hemanth Kata" };

export default function ExperiencePage() {
  return (
    <main>
      <PageHeader
        eyebrow="(03) — Experience"
        title="Experience"
        subtitle="2+ years shipping production software across full-stack, ERP, and enterprise Java environments — told as a timeline."
      />

      <section className="mx-auto max-w-5xl px-6 py-16">
        <Timeline />
      </section>

      <ResumeDownload />
      <CTA />
    </main>
  );
}
