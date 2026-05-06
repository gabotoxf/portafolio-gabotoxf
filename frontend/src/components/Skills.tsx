"use client";

import { useState } from "react";

const categories = [
  {
    label: "Frontend",
    skills: [
      { icon: "devicon-react-original",      name: "React",      label: "UI Library"   },
      { icon: "devicon-vuejs-plain",          name: "Vue.js",     label: "UI Framework" },
      { icon: "devicon-nextjs-plain",         name: "Next.js",    label: "Framework"    },
      { icon: "devicon-javascript-plain",     name: "JavaScript", label: "Lenguaje"     },
      { icon: "devicon-typescript-plain",     name: "TypeScript", label: "Lenguaje"     },
      { icon: "devicon-html5-plain",          name: "HTML5",      label: "Markup"       },
      { icon: "devicon-css3-plain",           name: "CSS3",       label: "Estilos"      },
      { icon: "devicon-tailwindcss-plain",    name: "Tailwind",   label: "CSS Framework"},
      { icon: "devicon-vitejs-plain",         name: "Vite",       label: "Bundler"      },
    ],
  },
  {
    label: "Backend",
    skills: [
      { icon: "devicon-nodejs-plain",  name: "Node.js", label: "Runtime"   },
      { icon: "devicon-nestjs-plain",  name: "NestJS",  label: "Framework" },
      { icon: "devicon-php-plain",     name: "PHP",     label: "Lenguaje"  },
      { icon: "devicon-laravel-plain", name: "Laravel", label: "Framework" },
      { icon: "devicon-python-plain",  name: "Python",  label: "Lenguaje"  },
    ],
  },
  {
    label: "Base de Datos",
    skills: [
      { icon: "devicon-postgresql-plain", name: "PostgreSQL", label: "SQL"   },
      { icon: "devicon-mysql-plain",      name: "MySQL",      label: "SQL"   },
      { icon: "devicon-redis-plain",      name: "Redis",      label: "Cache" },
      { icon: "devicon-prisma-plain",     name: "Prisma",     label: "ORM"   },
      { icon: "devicon-supabase-plain",   name: "Supabase",   label: "BaaS"  },
    ],
  },
  {
    label: "IA & ML",
    skills: [
      { icon: "devicon-python-plain",       name: "Python",      label: "ML Base"     },
      { icon: "devicon-tensorflow-original",name: "TensorFlow",  label: "ML Framework"},
      { icon: "devicon-jupyter-plain",      name: "Jupyter",     label: "Notebooks"   },
    ],
  },
  {
    label: "DevOps",
    skills: [
      { icon: "devicon-docker-plain",   name: "Docker", label: "Containers"  },
      { icon: "devicon-git-plain",      name: "Git",    label: "Versiones"   },
      { icon: "devicon-github-original",name: "GitHub", label: "Repositorios"},
      { icon: "devicon-linux-plain",    name: "Linux",  label: "OS"          },
    ],
  },
];

export default function Skills() {
  const [active, setActive] = useState(0);
  const current = categories[active];

  return (
    <section
      id="skills"
      className="py-32 bg-light dark:bg-background-dark relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black dark:text-white text-slate-900 mb-6 font-display">
            Mi stack de trabajo
          </h2>
          <p className="text-lg dark:text-slate-400 text-slate-600 max-w-2xl mx-auto">
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
                  ? // Tab activo
                    "dark:bg-accent-lime/10 bg-violet-100 dark:text-accent-lime text-violet-700 dark:border-accent-lime/20 border-violet-300"
                  : // Tab inactivo
                    "dark:border-white/10 border-[#cdc9de] dark:text-slate-500 text-slate-500 hover:text-primary hover:border-primary/40 dark:hover:border-primary/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {current.skills.map((skill) => (
            <div
              key={skill.name}
              className="
                flex flex-col items-center gap-3 p-5 rounded-2xl border
                transition-all duration-300 group cursor-default shadow-sm
                dark:border-white/5       border-[#cdc9de]
                dark:bg-white/[0.03]      bg-[#f5f0ff]
                dark:hover:bg-white/[0.07] hover:bg-[#ede8f5]
                dark:hover:border-white/10 hover:border-[#b8b0d4]
              "
            >
              <i
                className={`
                  ${skill.icon} text-4xl transition-all duration-300
                  group-hover:-translate-y-1
                  dark:text-slate-400          text-slate-500
                  dark:group-hover:text-accent-lime group-hover:text-violet-600
                `}
              />
              <div className="text-center">
                <p className="dark:text-white text-slate-800 text-sm font-semibold">
                  {skill.name}
                </p>
                <p className="dark:text-slate-500 text-slate-400 text-[10px] uppercase tracking-widest mt-0.5">
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