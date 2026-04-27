"use client";

import { useState } from "react";

const categories = [
  {
    label: "Frontend",
    badge: "bg-accent-lime/10 text-accent-lime border-accent-lime/20",
    skills: [
      { icon: "devicon-react-original", name: "React", label: "UI Library" },
      { icon: "devicon-vuejs-plain", name: "Vue.js", label: "UI Framework" },
      { icon: "devicon-nextjs-plain", name: "Next.js", label: "Framework" },
      {
        icon: "devicon-javascript-plain",
        name: "JavaScript",
        label: "Lenguaje",
      },
      {
        icon: "devicon-typescript-plain",
        name: "TypeScript",
        label: "Lenguaje",
      },
      { icon: "devicon-html5-plain", name: "HTML5", label: "Markup" },
      { icon: "devicon-css3-plain", name: "CSS3", label: "Estilos" },
      {
        icon: "devicon-tailwindcss-plain",
        name: "Tailwind",
        label: "CSS Framework",
      },
      { icon: "devicon-vitejs-plain", name: "Vite", label: "Bundler" },
    ],
  },
  {
    label: "Backend",
    badge: "bg-accent-lime/10 text-accent-lime border-accent-lime/20",
    skills: [
      { icon: "devicon-nodejs-plain", name: "Node.js", label: "Runtime" },
      { icon: "devicon-nestjs-plain", name: "NestJS", label: "Framework" },
      { icon: "devicon-php-plain", name: "PHP", label: "Lenguaje" },
      { icon: "devicon-laravel-plain", name: "Laravel", label: "Framework" },
      { icon: "devicon-python-plain", name: "Python", label: "Lenguaje" },
    ],
  },
  {
    label: "Base de Datos",
    badge: "bg-accent-lime/10 text-accent-lime border-accent-lime/20",
    skills: [
      { icon: "devicon-postgresql-plain", name: "PostgreSQL", label: "SQL" },
      { icon: "devicon-mysql-plain", name: "MySQL", label: "SQL" },
      { icon: "devicon-redis-plain", name: "Redis", label: "Cache" },
      { icon: "devicon-prisma-plain", name: "Prisma", label: "ORM" },
      { icon: "devicon-supabase-plain", name: "Supabase", label: "BaaS" },
    ],
  },
  {
    label: "IA & ML",
    badge: "bg-accent-lime/10 text-accent-lime border-accent-lime/20",
    skills: [
      { icon: "devicon-python-plain", name: "Python", label: "ML Base" },
      {
        icon: "devicon-tensorflow-original",
        name: "TensorFlow",
        label: "ML Framework",
      },
      { icon: "devicon-jupyter-plain", name: "Jupyter", label: "Notebooks" },
    ],
  },
  {
    label: "DevOps",
    badge: "bg-accent-lime/10 text-accent-lime border-accent-lime/20",
    skills: [
      { icon: "devicon-docker-plain", name: "Docker", label: "Containers" },
      { icon: "devicon-git-plain", name: "Git", label: "Versiones" },
      {
        icon: "devicon-github-original",
        name: "GitHub",
        label: "Repositorios",
      },
      { icon: "devicon-linux-plain", name: "Linux", label: "OS" },
    ],
  },
];

export default function Skills() {
  const [active, setActive] = useState(0);
  const current = categories[active];

  return (
    <section
      id="skills"
      className="py-32 bg-background-light dark:bg-background-dark relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white mb-6 font-display">
            Mi stack de trabajo
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Las herramientas con las que construyo proyectos reales, día a día.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => setActive(i)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                active === i
                  ? cat.badge
                  : "border-white/10 text-slate-500 hover:text-white hover:border-white/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {current.skills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/10 transition-all duration-300 group cursor-default"
            >
              <i
                className={`${skill.icon} text-4xl text-slate-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:text-accent-lime`}
              />
              <div className="text-center">
                <p className="text-white text-sm font-semibold">{skill.name}</p>
                <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-0.5">
                  {skill.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
