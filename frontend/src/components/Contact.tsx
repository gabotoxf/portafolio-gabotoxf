"use client";

import { useState } from "react";

const FORMSPREE_URL = "https://formspree.io/f/mvgppdba";
const INITIAL = { name: "", email: "", message: "" };

export default function ContactSection() {
  const [form, setForm]     = useState(INITIAL);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("juanmeza242001@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      if (res.ok) { setStatus("success"); setForm(INITIAL); }
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-32" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-[48px] overflow-hidden border
          dark:bg-slate-900       bg-[#f5f0ff]
          dark:border-white/5     border-[#cdc9de]
          px-8 py-20 lg:py-24 group shadow-sm">

          {/* Glows — solo visibles en dark */}
          <div className="absolute -top-24 -right-24 size-96 bg-primary/20 blur-[100px] rounded-full dark:opacity-100 opacity-0 transition-opacity" />
          <div className="absolute -bottom-24 -left-24 size-96 bg-primary/10 blur-[100px] rounded-full dark:opacity-100 opacity-0 transition-opacity" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* ── Izquierda: copy ── */}
            <div className="space-y-8">
              <span className="text-primary font-bold tracking-[0.25em] text-xs uppercase">
                Disponible para proyectos
              </span>

              <h2 className="text-4xl lg:text-6xl font-black dark:text-white text-slate-900 leading-[1.1] font-display">
                Construyamos algo{" "}
                {/* Gradiente: en dark lime, en light violet sólido legible */}
                <span className="dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-primary dark:to-accent-lime text-violet-700">
                  que funcione.
                </span>
              </h2>

              <p className="text-lg dark:text-slate-400 text-slate-600 leading-relaxed max-w-md">
                ¿Tienes una idea, un problema que resolver o un proyecto
                que necesita un dev? Cuéntame — te respondo en menos de 24h.
              </p>

              {/* Links directos */}
              <div className="space-y-3 pt-2">
                <a
                  href="https://wa.link/r1zxye"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 dark:text-slate-400 text-slate-600 hover:text-primary transition-colors group/link"
                >
                  <span className="w-10 h-10 rounded-xl border flex items-center justify-center
                    dark:bg-white/5   bg-[#e8e3f5]
                    dark:border-white/10 border-[#cdc9de]
                    group-hover/link:border-primary/40 transition-colors">
                    <i className="fa-brands fa-whatsapp text-lg"></i>
                  </span>
                  <span className="text-sm font-medium">Hablemos por WhatsApp</span>
                  <span className="material-symbols-outlined text-[16px] opacity-0 group-hover/link:opacity-100 transition-opacity">
                    arrow_forward
                  </span>
                </a>

                <button
                  onClick={copyEmail}
                  className="flex items-center gap-3 dark:text-slate-400 text-slate-600 hover:text-primary transition-colors group/link w-full text-left"
                >
                  <span className="w-10 h-10 rounded-xl border flex items-center justify-center
                    dark:bg-white/5   bg-[#e8e3f5]
                    dark:border-white/10 border-[#cdc9de]
                    group-hover/link:border-primary/40 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                  </span>
                  <span className="text-sm font-medium">
                    {copied
                      ? <span className="dark:text-accent-lime text-violet-600">¡Email copiado!</span>
                      : "juanmeza242001@gmail.com"
                    }
                  </span>
                  <span className="material-symbols-outlined text-[16px] opacity-0 group-hover/link:opacity-100 transition-opacity">
                    {copied ? "check" : "content_copy"}
                  </span>
                </button>
              </div>
            </div>

            {/* ── Derecha: formulario ── */}
            <div className="rounded-3xl border p-8
              dark:bg-white/[0.04]  bg-[#f7efff]
              dark:border-white/5   border-[#cdc9de]
              shadow-sm">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center
                    dark:bg-accent-lime/10 bg-violet-100">
                    <span className="material-symbols-outlined dark:text-accent-lime text-violet-700 text-3xl">
                      check_circle
                    </span>
                  </div>
                  <h3 className="text-xl font-black dark:text-white text-slate-900">¡Mensaje enviado!</h3>
                  <p className="dark:text-slate-400 text-slate-600 text-sm">Te respondo en menos de 24h.</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-2 text-xs dark:text-slate-500 text-slate-400 hover:text-primary transition-colors underline underline-offset-4"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input type="text" name="_gotcha" style={{ display: "none" }} />

                  {/* Nombre */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest dark:text-slate-500 text-slate-500 mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      required
                      className="w-full rounded-xl px-4 py-3 text-sm border
                        dark:bg-white/5       bg-[#f5f0ff]
                        dark:border-white/10  border-[#cdc9de]
                        dark:text-white       text-slate-900
                        dark:placeholder-slate-600 placeholder-slate-400
                        focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest dark:text-slate-500 text-slate-500 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      required
                      className="w-full rounded-xl px-4 py-3 text-sm border
                        dark:bg-white/5       bg-[#f5f0ff]
                        dark:border-white/10  border-[#cdc9de]
                        dark:text-white       text-slate-900
                        dark:placeholder-slate-600 placeholder-slate-400
                        focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest dark:text-slate-500 text-slate-500 mb-2">
                      ¿En qué puedo ayudarte?
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Cuéntame sobre tu proyecto o idea..."
                      required
                      rows={4}
                      className="w-full rounded-xl px-4 py-3 text-sm border resize-none
                        dark:bg-white/5       bg-[#f5f0ff]
                        dark:border-white/10  border-[#cdc9de]
                        dark:text-white       text-slate-900
                        dark:placeholder-slate-600 placeholder-slate-400
                        focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-500 text-xs flex items-center gap-2">
                      <span className="material-symbols-outlined text-[14px]">error</span>
                      Algo falló. Intenta por WhatsApp o escríbeme directo.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-primary text-white rounded-xl py-3.5 font-bold text-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === "sending" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar mensaje
                        <span className="material-symbols-outlined text-[18px]">send</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs dark:text-slate-600 text-slate-400">
                    Sin spam. Solo respondo cuando puedo ayudar.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}