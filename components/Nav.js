"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, profile } from "../lib/data";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      setVisible(true);
      return;
    }
    const handler = () => setVisible(true);
    window.addEventListener("intro-done", handler);
    return () => window.removeEventListener("intro-done", handler);
  }, [pathname]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled || open
          ? "bg-bg/80 backdrop-blur-md border-b border-line"
          : "border-b border-transparent"
      } ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <nav className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-5">
        <Link href="/" className="justify-self-start text-sm font-bold tracking-widest uppercase">
          HK<span className="text-accent">.</span>
        </Link>

        {/* desktop links — centered column */}
        <div className="hidden justify-self-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative text-sm transition-colors hover:text-white ${
                isActive(l.href) ? "text-white" : "text-muted"
              }`}
            >
              {l.label}
              {isActive(l.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 h-px w-full bg-accent"
                />
              )}
            </Link>
          ))}
        </div>

        {/* right column: button (desktop) + toggle (mobile) */}
        <div className="flex items-center justify-self-end">
          <a
            href={`mailto:${profile.email}`}
            className="hidden rounded-full border border-line px-5 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent md:inline-block"
          >
            Let&apos;s talk
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Menu"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="h-px w-6 bg-white"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="h-px w-6 bg-white"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="h-px w-6 bg-white"
            />
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 pb-6">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    className={`block border-b border-line py-3 text-2xl font-bold uppercase tracking-tight ${
                      isActive(l.href) ? "text-accent" : "text-white"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
