"use client";

import { useState, useRef, useEffect } from "react";
const BotAvatar = "/img/yo/bot3.png";

import {
  GROQ_MODEL,
  API_TIMEOUT_MS,
  AUTO_OPEN_DELAY_MS,
  AUTO_OPEN_SESSION_KEY,
  THROTTLE_AUTO_OPEN,
  WELCOME_MESSAGE,
  RATE_LIMIT,
  SUGGESTIONS,
} from "./constants";
import { SYSTEM_PROMPT } from "./prompts";
import {
  requestMessageSound,
  buildWhatsAppLink,
  renderMessage,
} from "./utils.jsx";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "¡Hola! " + WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);  // ✅ tipo añadido
  const openRef = useRef(open);

  const rateLimitRef = useRef({
    count: 0,
    resetAt: Date.now() + RATE_LIMIT.windowMs,
  });

  const checkRateLimit = () => {
    const now = Date.now();
    if (now > rateLimitRef.current.resetAt) {
      rateLimitRef.current = { count: 0, resetAt: now + RATE_LIMIT.windowMs };
    }
    if (rateLimitRef.current.count >= RATE_LIMIT.maxMessages) return false;
    rateLimitRef.current.count++;
    return true;
  };

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    openRef.current = open;
    if (open) setHasUnread(false);
  }, [open]);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      if (openRef.current) return;
      if (THROTTLE_AUTO_OPEN) {
        try {
          if (sessionStorage.getItem(AUTO_OPEN_SESSION_KEY) === "1") return;
        } catch {}
      }
      setOpen(true);
      if (THROTTLE_AUTO_OPEN) {
        try {
          sessionStorage.setItem(AUTO_OPEN_SESSION_KEY, "1");
        } catch {}
      }
    }, AUTO_OPEN_DELAY_MS);
    return () => window.clearTimeout(timerId);
  }, []);

  // ✅ text es opcional con valor por defecto ""
  const sendMessage = async (text: string = "") => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    if (!checkRateLimit()) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Espera un momento antes de enviar más mensajes. Si necesitas hablar con Gabriel directamente: 👉 https://wa.link/r1zxye 🙏",
        },
      ]);
      return;
    }

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    requestMessageSound("user");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          model: GROQ_MODEL,
          max_tokens: 500,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...newMessages.slice(-6),
          ],
        }),
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error?.message ?? `HTTP ${res.status}`);
      }

      const data = await res.json();
      const reply =
        data.choices?.[0]?.message?.content?.trim() ??
        "No pude generar una respuesta. Intenta de nuevo.";

      requestMessageSound("assistant");
      if (!openRef.current) setHasUnread(true);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      clearTimeout(timeoutId);
      // ✅ cast a Error
      const isTimeout = (err as Error).name === "AbortError";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: isTimeout
            ? "La respuesta tardó demasiado. Intenta de nuevo o escríbele a Gabriel: 👉 https://wa.link/r1zxye"
            : "Ups, algo falló. Puedes escribirle a Gabriel: 👉 https://wa.link/r1zxye",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {  // ✅ tipo añadido
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const showSuggestions =
    messages.filter((m) => m.role === "user").length === 0;

  return (
    <>
      <div
        className={`fixed bottom-24 right-4 z-50 w-[90vw] max-w-[360px] origin-bottom-right ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
          mounted ? "transition-all duration-500" : ""
        } ${
          open
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-10 scale-90 pointer-events-none"
        }`}
      >
        <div
          className="rounded-[2rem] overflow-hidden border border-white/20 bg-[#0a0a0c]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col ring-1 ring-white/10"
          style={{ height: "min(500px, 80vh)" }}
        >
          <div className="relative flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
            <div className="relative bg-primary rounded">
              <img src={BotAvatar} alt="Gabotoxf AI" className="w-10 h-10 rounded-2xl object-cover" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-primary border-[2px] border-[#0a0a0c] shadow-sm" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-sm tracking-tight">Gabotoxf AI</h3>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
                <p className="text-accent-lime text-[10px] font-medium uppercase tracking-wider">En línea</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="group p-1.5 rounded-xl hover:bg-white/10 transition-all">
              <span className="material-symbols-outlined text-slate-400 group-hover:text-white text-[20px]">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 transition-all">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} transition-all duration-300`}>
                <div className={`max-w-[88%] px-4 py-3 rounded-[1.25rem] text-sm leading-relaxed shadow-sm whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-primary to-fuchsia-600 text-white rounded-tr-none font-medium"
                    : "bg-white/5 border border-white/10 text-slate-200 rounded-tl-none"
                }`}>
                  {renderMessage(msg.content, messages.slice(0, i + 1), buildWhatsAppLink)}
                </div>
              </div>
            ))}

            {showSuggestions && (
              <div className="flex flex-col gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => sendMessage(s)}
                    className="text-left text-xs px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:border-primary/50 hover:bg-primary/10 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0">
                    {s}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="px-4 py-3 border-t border-white/10 bg-white/5">
            <div className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-2 border border-white/10 focus-within:border-primary/40 transition-colors">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Escribe tu pregunta..."
                className="flex-1 bg-transparent text-white text-sm placeholder-slate-600 focus:outline-none"
              />
              <button onClick={() => sendMessage()} disabled={!input.trim() || loading}
                className="text-slate-500 hover:text-primary transition-colors disabled:opacity-30">
                <span className="material-symbols-outlined text-[20px]">send</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setOpen((v) => { const next = !v; if (next) setHasUnread(false); return next; })}
        className={`group fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl active:scale-95 ${
          open ? "bg-slate-800 rotate-90" : "bg-gradient-to-tr from-primary via-primary to-fuchsia-500 hover:scale-110"
        }`}
        aria-label="Abrir asistente IA"
      >
        {!open && <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping opacity-20 group-hover:opacity-40 transition-opacity" />}
        <div className={`absolute inset-0 rounded-full transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100 bg-white/10 blur-[2px]"}`} />
        {!open && (
          <span className="hidden sm:flex absolute right-[80px] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-2xl bg-slate-900/95 backdrop-blur-md border border-white/10 px-4 py-2 text-sm font-medium text-white shadow-2xl opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            {hasUnread ? "¡Nuevo mensaje!" : "¿Necesitas ayuda?"}
          </span>
        )}
        {open ? (
          <span className="material-symbols-outlined text-white text-[24px]">close</span>
        ) : (
          <img src={BotAvatar} alt="Gabotoxf AI" className="w-15 h-15 rounded-full object-cover" />
        )}
        {!open && (
          <div className="absolute -bottom-1 -left-1 flex items-center gap-1 rounded-full bg-slate-900/90 border border-white/20 px-2 py-0.5 shadow-lg backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-bold text-white tracking-wider">IA</span>
          </div>
        )}
        {hasUnread && !open && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-5 w-5 bg-primary border-2 border-slate-900" />
          </span>
        )}
      </button>
    </>
  );
}