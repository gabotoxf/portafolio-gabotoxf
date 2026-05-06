"use client";

const cv = "/cv/CV - Gabriel Meza.pdf";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-6 sm:px-10 pt-32 lg:pt-28 relative overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto grid grid-cols-12 gap-6 items-center">
        {/* Texto decorativo vertical */}
        <div className="col-span-1 hidden lg:flex items-center justify-center overflow-hidden">
          <h1 className="vertical-text text-7xl font-black opacity-5 select-none tracking-widest dark:text-white text-slate-900">
            GMEZA
          </h1>
        </div>

        {/* Columna izquierda — contenido principal */}
        <div className="col-span-12 lg:col-span-6 z-10 space-y-6">
          {/* Badge */}
          <span className="dark:text-accent-lime text-purple-700 font-bold tracking-[0.25em] text-xs uppercase">
            Desarrollo web · React + NestJS
          </span>

          {/* Título */}
          <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-black leading-[1.1] tracking-tight dark:text-white text-slate-900">
            <span className="text-primary">Desarrollo apps web</span> que
            automatizan tus procesos.
          </h2>

          {/* Descripción */}
          <p className="max-w-lg text-base sm:text-lg leading-relaxed dark:text-slate-400 text-slate-600">
            Desde la idea hasta producción — construyo aplicaciones escalables
            con React y NestJS para startups y negocios que quieren crecer sin
            perder el control.
          </p>

          {/* Botones */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-primary text-white rounded-xl font-bold px-6 py-3 transition-all hover:scale-105 hover:brightness-110"
            >
              Ver proyectos
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </a>

            <a
              href={cv}
              download
              className="inline-flex items-center gap-2 rounded-xl font-bold px-6 py-3
                                dark:text-white text-slate-800
                                border
                                dark:border-white/10 border-[#cdc9de]
                                dark:bg-white/5 bg-[#e8e6f0]
                                transition-all hover:scale-105
                                dark:hover:bg-white/10 hover:bg-[#dddae8]"
            >
              Descargar CV
              <span className="material-symbols-outlined text-[18px]">
                download
              </span>
            </a>
          </div>
        </div>

        {/* Columna derecha — tarjeta de código */}
        <div className="col-span-12 lg:col-span-5 flex items-center justify-center">
          <div
            className="w-full max-w-[420px] rounded-2xl border overflow-hidden shadow-sm
                        dark:border-white/10 border-[#cdc9de]
                        dark:bg-white/5 bg-[#f0eeff]"
          >
            {/* Barra superior de la terminal */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-b
                            dark:border-white/10 border-[#cdc9de]
                            dark:bg-white/5 bg-[#e8e6f0]"
            >
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-3 text-xs font-mono dark:text-slate-500 text-[#7a758f]">
                gabriel-meza.dev
              </span>
            </div>

            {/* Cuerpo del código */}
            <div className="p-6 font-mono text-sm space-y-3">
              <p className="dark:text-slate-500 text-[#7a758f]">
                <span className="text-primary">const</span>{" "}
                <span className="dark:text-accent-lime text-violet-600">
                  dev
                </span>{" "}
                = {"{"}
              </p>
              <p className="pl-4 dark:text-slate-400 text-slate-600">
                nombre:{" "}
                <span className="dark:text-white text-slate-900">
                  "Gabriel Meza"
                </span>
                ,
              </p>
              <p className="pl-4 dark:text-slate-400 text-slate-600">
                rol:{" "}
                <span className="dark:text-white text-slate-900">
                  "Fullstack Developer"
                </span>
                ,
              </p>
              <p className="pl-4 dark:text-slate-400 text-slate-600">
                stack: [
                <span className="dark:text-accent-lime text-violet-600">
                  {" "}
                  "React"
                </span>
                ,
                <span className="dark:text-accent-lime text-violet-600">
                  {" "}
                  "NestJS"
                </span>
                ,
                <span className="dark:text-accent-lime text-violet-600">
                  {" "}
                  "Node"
                </span>{" "}
                ],
              </p>
              <p className="pl-4 dark:text-slate-400 text-slate-600">
                disponible:{" "}
                <span className="dark:text-green-400 text-green-700">true</span>
                ,
              </p>
              <p className="pl-4 dark:text-slate-400 text-slate-600">
                enfoque:{" "}
                <span className="dark:text-white text-slate-900">
                  "empresas - startups - negocios digitales"
                </span>
              </p>
              <p className="dark:text-slate-500 text-[#7a758f]">{"}"}</p>

              <div className="pt-3 border-t dark:border-white/10 border-[#cdc9de]">
                <p className="dark:text-slate-500 text-[#7a758f] animate-pulse">
                  <span className="text-primary">▶</span> Listo para tu
                  proyecto_
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
