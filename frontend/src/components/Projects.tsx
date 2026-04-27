"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const getImage = (filename: string) => `/img/proyectos/${filename}.png`;

const projects = [
  {
    tag: "Full Stack",
    title: "Xinergia",
    description:
      "Elimina horas de trabajo manual en empresas eléctricas — analiza datos con IA y genera reportes técnicos automáticamente en segundos.",
    image: "xinergia",
    tech: [
      "TypeScript",
      "React",
      "NestJS",
      "PostgreSQL",
      "Python",
      "Machine Learning",
      "Prisma ORM",
    ],
    link: "#",
    github: "#",
    confidential: true,
  },
  {
    tag: "Full Stack",
    title: "Andrix",
    description:
      "Plataforma de streaming que resuelve la fragmentación de contenido — agrega fuentes, enriquece con metadatos de TMDB y recomienda contenido con IA.",
    image: "andrix",
    tech: [
      "TypeScript",
      "Next.js 14",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "Socket.io",
      "Redis",
      "Puppeteer",
      "Supabase",
    ],
    link: "https://andrix.vercel.app/",
    github: "#",
    confidential: false,
  },
  {
    tag: "Frontend",
    title: "Brevio AI",
    description:
      "Convierte documentos largos en resúmenes accionables en segundos — para estudiantes y profesionales que no tienen tiempo de leer todo.",
    image: "brevio",
    tech: [
      "TypeScript",
      "React",
      "Vite",
      "Tailwind CSS",
      "LLaMA 3.1",
      "Groq API",
      "PDF.js",
    ],
    link: "https://brevio-self.vercel.app/",
    github: "#",
    confidential: false,
  },
  {
    tag: "Full Stack",
    title: "System HelpDesk",
    description:
      "Centraliza la gestión de soporte técnico de una empresa — tickets, roles, dashboard administrativo y API REST lista para escalar.",
    image: "helpdesk",
    tech: ["Laravel", "React", "Tailwind CSS", "MySQL", "JWT", "REST API"],
    link: "#",
    github: "#",
    confidential: true,
  },
  {
    tag: "Freelance",
    title: "Ecommerce App",
    description:
      "Tienda online completa para negocio local — carrito de compras, gestión de productos y sistema de pedidos desde el primer día.",
    image: "ecommerce",
    tech: ["Laravel", "React", "Tailwind CSS", "MySQL", "JWT", "REST API"],
    link: "https://ecommerce-prod.up.railway.app/",
    github: "#",
    confidential: false,
  },
  {
    tag: "Freelance",
    title: "Tienda Online",
    description:
      "Tienda de moda online con catálogo de productos, filtros por categoría y diseño responsive. En desarrollo activo.",
    image: "tienda",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://tienda-gabotoxf.vercel.app/",
    github: "#",
    confidential: false,
  },
  {
    tag: "Freelance",
    title: "Tub Exports",
    description:
      "Presencia digital para empresa exportadora — catálogo de productos, sección de contacto y diseño orientado a captar clientes internacionales.",
    image: "tub",
    tech: ["JavaScript", "HTML", "CSS"],
    link: "https://tubexport.vercel.app/",
    github: "#",
    confidential: false,
  },
];

const TOASTS = {
  code: {
    icon: "info",
    title: "Código no disponible",
    message: "Aún no está disponible públicamente.",
  },
  unpublished: {
    icon: "schedule",
    title: "Aún no publicado",
    message: "Este proyecto todavía no está publicado.",
  },
  confidential: {
    icon: "lock",
    title: "Proyecto confidencial",
    message: "Este proyecto pertenece a un cliente y no puede mostrarse.",
  },
};

type ToastType = "code" | "unpublished" | "confidential" | null;

interface Project {
  tag: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
  github: string;
  confidential: boolean;
}

interface ProjectCardProps extends Project {
  onCodeClick: () => void;
  onUnpublishedClick: () => void;
  onConfidentialClick: () => void;
}

export default function ProjectsSection() {
  const [toast, setToast] = useState<ToastType>(null);

  const showToast = (type: ToastType) => {
    setToast(type);
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <section className="py-32 relative" id="projects">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 font-display">
          Proyectos
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Una selección de lo que he construido — desde ideas propias hasta
          soluciones reales para clientes y empresas.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={48}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          breakpoints={{ 1024: { slidesPerView: 2 } }}
          className="projects-slider"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <ProjectCard
                {...project}
                image={
                  project.image.startsWith("http")
                    ? project.image
                    : getImage(project.image)
                }
                onCodeClick={() => showToast("code")}
                onUnpublishedClick={() => showToast("unpublished")}
                onConfidentialClick={() => showToast("confidential")}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Toast */}
      <div
        className={`fixed bottom-8 left-8 z-50 transition-all duration-500 transform ${
          toast
            ? "translate-y-0 opacity-100"
            : "translate-y-20 opacity-0 pointer-events-none"
        }`}
      >
        {toast && (
          <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                toast === "confidential"
                  ? "bg-accent-lime/20 text-accent-lime"
                  : "bg-primary/20 text-primary"
              }`}
            >
              <span className="material-symbols-outlined">
                {TOASTS[toast].icon}
              </span>
            </div>
            <div>
              <p className="text-white font-bold text-sm">
                {TOASTS[toast].title}
              </p>
              <p className="text-slate-400 text-xs">{TOASTS[toast].message}</p>
            </div>
            <button
              onClick={() => setToast(null)}
              className="ml-4 text-slate-500 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  tag,
  title,
  description,
  image,
  tech,
  link,
  confidential,
  onCodeClick,
  onUnpublishedClick,
  onConfidentialClick,
}: ProjectCardProps) {
  return (
    <div className="group relative h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative glass-morphism rounded-[32px] overflow-hidden border-white/5 p-4 h-full flex flex-col">
        {/* Image */}
        <div className="aspect-[16/10] rounded-[24px] overflow-hidden relative">
          <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute top-6 left-6 z-20">
            <span className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest border border-white/10">
              {tag}
            </span>
          </div>
          <div className="absolute top-6 right-6 z-20 text-[10px]">
            {confidential ? (
              <span className="px-3 py-1.5 rounded-full bg-accent-lime/20 backdrop-blur-md text-accent-lime font-black uppercase tracking-widest border border-accent-lime/30 flex items-center gap-1">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "12px" }}
                >
                  lock
                </span>
                Confidencial
              </span>
            ) : (
              <span className="px-3 py-1.5 rounded-full bg-primary/50 backdrop-blur-md text-white font-black uppercase tracking-widest border border-primary/30 flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-[12px]"
                  style={{ fontSize: "12px" }}
                >
                  radio_button_checked
                </span>
                En línea
              </span>
            )}
          </div>
        </div>

        <div className="p-8 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-3xl font-black text-white font-display">
              {title}
            </h3>
            <div className="flex gap-4">
              <button
                onClick={onCodeClick}
                className="material-symbols-outlined text-slate-400 hover:text-white cursor-pointer transition-colors"
                title="Ver código"
              >
                code
              </button>
              {link && link !== "#" ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="material-symbols-outlined text-slate-400 hover:text-white cursor-pointer transition-colors"
                  title="Ver sitio"
                >
                  open_in_new
                </a>
              ) : (
                <button
                  onClick={
                    confidential ? onConfidentialClick : onUnpublishedClick
                  }
                  className={`material-symbols-outlined text-slate-400 cursor-pointer transition-colors ${
                    confidential ? "hover:text-accent-lime" : "hover:text-white"
                  }`}
                  title="Ver sitio"
                >
                  open_in_new
                </button>
              )}
            </div>
          </div>

          <p className="text-slate-400 mb-8 text-lg leading-relaxed flex-grow">
            {description}
          </p>

          <div className="flex flex-wrap gap-3 mt-auto">
            {tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
