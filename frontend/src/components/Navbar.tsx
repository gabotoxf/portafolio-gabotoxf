"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const LINKS = [
  { label: "Sobre mí", href: "#about" },
  { label: "Habilidades", href: "#skills" },
  { label: "Proyectos", href: "#projects" },
  { label: "Recomendaciones", href: "#testimonials" },
  { label: "Contacto", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Detectar sección activa por posición
      const scrollY = window.scrollY + window.innerHeight / 3;

      let current = "";
      LINKS.forEach(({ href }) => {
        const el = document.querySelector(href) as HTMLElement | null;
        if (!el) return;
        if (el.offsetTop <= scrollY) current = href;
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // ejecutar al montar
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    const phone = "573115140908";
    const message = encodeURIComponent(
      "👋 ¡Hola, Gabriel!\nVi tu portafolio y me gustaría cotizar un proyecto 💻✨\n¿Tienes disponibilidad? 🚀",
    );
    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
    const url = isMobile
      ? `https://wa.me/${phone}?text=${message}`
      : `https://web.whatsapp.com/send?phone=${phone}&text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-[95%] max-w-5xl pointer-events-none">
      <div
        className={`
      rounded-full
      px-4 md:px-6
      py-3
      flex items-center
      justify-between
      relative
      transition-all
      duration-300
      pointer-events-auto

      bg-white/20
      dark:bg-zinc-900/70
      backdrop-blur-xl
      border border-white/20
      shadow-lg shadow-black/20

      ${scrolled ? "shadow-xl shadow-black/30" : ""}
    `}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center group shrink-0">
          <span className="text-3xl md:text-4xl font-black text-accent-lime font-mono">
            {"{"}
          </span>
          <span className="text-3xl md:text-4xl font-black text-white font-mono mx-0.5 md:mx-1 group-hover:opacity-80 transition-opacity">
            gm
          </span>
          <span className="text-3xl md:text-4xl font-black text-accent-lime font-mono">
            {"}"}
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
          {LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`relative px-3 xl:px-4 py-1.5 text-[13px] xl:text-sm font-medium rounded-full transition-all duration-200 ${
                active === href
                  ? "text-white bg-white/10"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {label}
              {active === href && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
              )}
            </a>
          ))}
        </div>

        {/* CTA desktop */}
        <a
          href="https://wa.link/r1zxye"
          onClick={handleWhatsApp}
          className="hidden md:flex items-center gap-2 bg-primary text-white px-4 md:px-5 py-2 rounded-full text-sm font-bold hover:brightness-110 hover:scale-105 transition-all shrink-0 cursor-pointer"
        >
          <span className="hidden xl:inline">Hablemos</span>
          <i className="fa-brands fa-whatsapp text-base" />
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          <span
            className={`h-0.5 w-6 bg-current transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-current transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-current transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>

        {/* Mobile menu */}
        <div
          className={`absolute top-full mt-3 left-0 w-full rounded-3xl dark:bg-glass-bg backdrop-blur-xl border border-white/10 shadow-2xl md:hidden overflow-hidden transition-all duration-300 ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
        >
          <div className="flex flex-col items-center gap-1 py-6 px-4">
            {LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`w-full text-center px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                  active === href
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {label}
              </a>
            ))}
            <a
              href="https://wa.link/r1zxye"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl text-sm font-bold hover:brightness-110 transition-all"
            >
              Hablemos
              <i className="fa-brands fa-whatsapp text-base" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
