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
    title: "Martinez - Madera",
    description:
      "Impulsa la presencia digital de un bufete de abogados — posiciona sus servicios legales, transmite confianza y facilita la captación de clientes a través de una experiencia web moderna y optimizada.",
    image: "martinezmadera",
    tech: ["Vue.js", "NestJS", "TypeScript", "PostgreSQL", "SEO", "Responsive Design"],
    link: "https://martinez-madera.vercel.app/",
    github: "#",
    confidential: false,
  },
  {
    tag: "Full Stack",
    title: "Xinergia",
    description:
      "Elimina horas de trabajo manual en empresas eléctricas — analiza datos con IA y genera reportes técnicos automáticamente en segundos.",
    image: "xinergia",
    tech: ["TypeScript", "React", "NestJS", "PostgreSQL", "Python", "Machine Learning", "Prisma ORM"],
    link: "https://xinergia.vercel.app/",
    github: "#",
    confidential: true,
  },
  {
    tag: "Full Stack",
    title: "Andrix",
    description:
      "Plataforma de streaming que resuelve la fragmentación de contenido — agrega fuentes, enriquece con metadatos de TMDB y recomienda contenido con IA.",
    image: "andrix",
    tech: ["TypeScript", "Next.js 14", "NestJS", "PostgreSQL", "Prisma", "Socket.io", "Redis", "Puppeteer", "Supabase"],
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
    tech: ["TypeScript", "React", "Vite", "Tailwind CSS", "LLaMA 3.1", "Groq API", "PDF.js"],
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
  code:         { icon: "info",     title: "Código no disponible",  message: "Aún no está disponible públicamente."               },
  unpublished:  { icon: "schedule", title: "Aún no publicado",      message: "Este proyecto todavía no está publicado."           },
  confidential: { icon: "lock",     title: "Proyecto confidencial", message: "Este proyecto pertenece a un cliente y no puede mostrarse." },
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

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <h2 className="text-4xl md:text-5xl font-black dark:text-white text-slate-900 mb-6 font-display">
          Proyectos
        </h2>
        <p className="text-lg dark:text-slate-400 text-slate-600 max-w-2xl mx-auto">
          Una selección de lo que he construido — desde ideas propias hasta
          soluciones reales para clientes y empresas.
        </p>
      </div>

      {/* Slider */}
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
          <div className="
            dark:bg-slate-900/90 bg-[#f5f0ff]
            dark:border-white/10 border-[#cdc9de]
            border backdrop-blur-xl
            px-6 py-4 rounded-2xl shadow-lg
            flex items-center gap-4
          ">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                toast === "confidential"
                  ? "dark:bg-accent-lime/20 bg-violet-100 dark:text-accent-lime text-violet-700"
                  : "bg-primary/10 text-primary"
              }`}
            >
              <span className="material-symbols-outlined">
                {TOASTS[toast].icon}
              </span>
            </div>
            <div>
              <p className="dark:text-white text-slate-900 font-bold text-sm">
                {TOASTS[toast].title}
              </p>
              <p className="dark:text-slate-400 text-slate-500 text-xs">
                {TOASTS[toast].message}
              </p>
            </div>
            <button
              onClick={() => setToast(null)}
              className="ml-4 dark:text-slate-500 text-slate-400 hover:text-primary transition-colors"
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
      {/* Glow hover — solo en dark tiene sentido visualmente */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-violet-400/10 rounded-[32px] blur-2xl opacity-0 dark:group-hover:opacity-100 transition-opacity duration-500" />

      <div className="
        relative rounded-[32px] overflow-hidden p-4 h-full flex flex-col shadow-sm
        dark:bg-white/[0.04]      bg-[#f5f0ff]
        dark:border-white/5       border-[#cdc9de]
        border
        dark:shadow-none
      ">
        {/* Imagen */}
        <div className="aspect-[16/10] rounded-[24px] overflow-hidden relative">
          <div className="absolute inset-0 dark:bg-black/40 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${image})` }}
          />

          {/* Tag izquierda */}
          <div className="absolute top-6 left-6 z-20">
            <span className="px-4 py-1.5 rounded-full dark:bg-black/60 bg-white/90 backdrop-blur-md dark:text-white text-slate-800 text-[10px] font-black uppercase tracking-widest border dark:border-white/10 border-slate-200">
              {tag}
            </span>
          </div>

          {/* Badge confidencial / en línea */}
          <div className="absolute top-6 right-6 z-20 text-[10px]">
            {confidential ? (
              <span className="px-3 py-1.5 rounded-full dark:bg-accent-lime/20 bg-violet-100 backdrop-blur-md dark:text-accent-lime text-violet-700 font-black uppercase tracking-widest border dark:border-accent-lime/30 border-violet-300 flex items-center gap-1">
                <span className="material-symbols-outlined" style={{ fontSize: "12px" }}>lock</span>
                Confidencial
              </span>
            ) : (
              <span className="px-3 py-1.5 rounded-full bg-primary/80 backdrop-blur-md text-white font-black uppercase tracking-widest border border-primary/40 flex items-center gap-1">
                <span className="material-symbols-outlined" style={{ fontSize: "12px" }}>radio_button_checked</span>
                En línea
              </span>
            )}
          </div>
        </div>

        {/* Contenido */}
        <div className="p-8 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-3xl font-black dark:text-white text-slate-900 font-display">
              {title}
            </h3>
            <div className="flex gap-4">
              <button
                onClick={onCodeClick}
                className="material-symbols-outlined dark:text-slate-400 text-slate-500 hover:text-primary cursor-pointer transition-colors"
                title="Ver código"
              >
                code
              </button>
              {link && link !== "#" ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="material-symbols-outlined dark:text-slate-400 text-slate-500 hover:text-primary cursor-pointer transition-colors"
                  title="Ver sitio"
                >
                  open_in_new
                </a>
              ) : (
                <button
                  onClick={confidential ? onConfidentialClick : onUnpublishedClick}
                  className={`material-symbols-outlined dark:text-slate-400 text-slate-500 cursor-pointer transition-colors ${
                    confidential
                      ? "dark:hover:text-accent-lime hover:text-violet-600"
                      : "hover:text-primary"
                  }`}
                  title="Ver sitio"
                >
                  open_in_new
                </button>
              )}
            </div>
          </div>

          <p className="dark:text-slate-400 text-slate-600 mb-8 text-lg leading-relaxed flex-grow">
            {description}
          </p>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-3 mt-auto">
            {tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-lg text-xs font-semibold
                  dark:bg-slate-800 bg-[#e4dff5]
                  dark:text-slate-300 text-violet-800"
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