import { profile } from "../lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-3 px-6 text-center text-xs text-muted md:grid-cols-[1fr_auto_1fr]">
        <span className="md:justify-self-start md:text-left">© 2026 {profile.name}</span>
        <span className="md:justify-self-center">Built with Next.js + Tailwind + Framer Motion</span>
        <a href="#top" className="transition-colors hover:text-white md:justify-self-end md:text-right">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
