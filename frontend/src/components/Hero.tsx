"use client";

const cv = "/assets/cv/CV - Gabriel Meza.pdf";

 
export default function Hero() {
    return (
        <section className="min-h-screen flex items-center px-6 sm:px-10 pt-32 lg:pt-28 relative overflow-hidden">
            <div className="w-full max-w-[1200px] mx-auto grid grid-cols-12 gap-6 items-center">
 
                <div className="col-span-1 hidden lg:flex items-center justify-center overflow-hidden">
                    <h1 className="vertical-text text-7xl font-black opacity-5 select-none tracking-widest">
                        GMEZA
                    </h1>
                </div>
 
                <div className="col-span-12 lg:col-span-6 z-10 space-y-6">
 
                    <span className="text-accent-lime font-bold tracking-[0.25em] text-xs uppercase">
                        Desarrollo web · React + NestJS
                    </span>
 
                    <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-black leading-[1.1] tracking-tight">
                        <span className="text-primary">Desarrollo apps web</span>{" "}
                        que automatizan tus procesos.
                    </h2>
 
                    <p className="max-w-lg text-base sm:text-lg text-slate-400 leading-relaxed">
                        Desde la idea hasta producción — construyo aplicaciones
                        escalables con React y NestJS para startups y negocios
                        que quieren crecer sin perder el control.
                    </p>
 
                    {/* ── Sin stats aquí, viven en About ── */}
 
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                        <a
                            href="#projects"
                            className="inline-flex items-center gap-2 bg-primary text-white rounded-xl font-bold px-6 py-3 transition-all hover:scale-105 hover:brightness-110"
                        >
                            Ver proyectos
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </a>
 
                        <a
                            href={cv}
                            download
                            className="inline-flex items-center gap-2 rounded-xl font-bold px-6 py-3 text-white border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/10"
                        >
                            Descargar CV
                            <span className="material-symbols-outlined text-[18px]">download</span>
                        </a>
                    </div>
                </div>
 
                <div className="col-span-12 lg:col-span-5 flex items-center justify-center">
                    <div className="w-full max-w-[420px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                            <span className="w-3 h-3 rounded-full bg-red-500/70" />
                            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                            <span className="w-3 h-3 rounded-full bg-green-500/70" />
                            <span className="ml-3 text-xs text-slate-500 font-mono">gabriel-meza.dev</span>
                        </div>
                        <div className="p-6 font-mono text-sm space-y-3">
                            <p className="text-slate-500">
                                <span className="text-primary">const</span>{" "}
                                <span className="text-accent-lime">dev</span> = {"{"}
                            </p>
                            <p className="pl-4 text-slate-400">nombre: <span className="text-white">"Gabriel Meza"</span>,</p>
                            <p className="pl-4 text-slate-400">rol: <span className="text-white">"Fullstack Developer"</span>,</p>
                            <p className="pl-4 text-slate-400">
                                stack: [<span className="text-accent-lime"> "React"</span>,
                                <span className="text-accent-lime"> "NestJS"</span>,
                                <span className="text-accent-lime"> "Node"</span> ],
                            </p>
                            <p className="pl-4 text-slate-400">disponible: <span className="text-green-400">true</span>,</p>
                            <p className="pl-4 text-slate-400">enfoque: <span className="text-white">"empresas - startups - negocios digitales"</span></p>
                            <p className="text-slate-500">{"}"}</p>
                            <div className="pt-3 border-t border-white/10">
                                <p className="text-slate-500 animate-pulse">
                                    <span className="text-primary">▶</span> Listo para tu proyecto_
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
 
            </div>
        </section>
    );
}