import { marqueeSkills } from "../lib/data";

export default function Marquee() {
  const items = [...marqueeSkills, ...marqueeSkills];
  return (
    <div className="overflow-hidden border-y border-line bg-surface py-6">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {items.map((skill, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-2xl font-semibold uppercase tracking-tight text-muted md:text-3xl"
          >
            {skill}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
