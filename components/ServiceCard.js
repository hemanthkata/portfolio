"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import TiltGlow from "./TiltGlow";

export default function ServiceCard({ service, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/services/${service.slug}`} className="group block h-full">
        <TiltGlow className="relative h-full overflow-hidden rounded-2xl border border-line bg-bg p-7 transition-colors duration-300 group-hover:border-accent/50">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold">{service.title}</h3>
            <span className="text-muted transition-colors duration-300 group-hover:text-accent">
              ↗
            </span>
          </div>
          <p className="mt-1 text-sm text-accent/80">{service.tagline}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{service.desc}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {service.tags.map((t) => (
              <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                {t}
              </span>
            ))}
          </div>
        </TiltGlow>
      </Link>
    </motion.div>
  );
}
