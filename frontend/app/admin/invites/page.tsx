'use client';

import { useState } from 'react';
import { createInvite } from '@/src/services/testimonialApi';

interface InviteResult {
  inviteLink: string;
}

interface ApiError {
  status?: number;
  message?: string;
}

export default function AdminInvites() {
  const [adminKey, setAdminKey] = useState('');
  const [formData, setFormData] = useState({ clientName: '', clientEmail: '', expiresAt: '' });
  const [result, setResult] = useState<InviteResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const cleanData: Record<string, string> = {};
      if (formData.clientName.trim()) cleanData.clientName = formData.clientName.trim();
      if (formData.clientEmail.trim()) cleanData.clientEmail = formData.clientEmail.trim();
      if (formData.expiresAt.trim()) cleanData.expiresAt = formData.expiresAt.trim();
      const data = await createInvite(cleanData, adminKey);
      setResult(data);
    } catch (err) {
      const e = err as ApiError;
      setError(e.message || 'Error al generar link');
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen dark:bg-background-dark bg-background-light flex items-center justify-center py-38 px-4 relative overflow-hidden">

      {/* Glows — solo visibles en dark */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none dark:opacity-100 opacity-0 transition-opacity" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent-lime/5 rounded-full blur-[120px] pointer-events-none dark:opacity-100 opacity-0 transition-opacity" />

      <div className="relative z-10 w-full max-w-md">

        {/* Header */}
        <div className="mb-10 space-y-3">
          <span className="text-primary font-bold tracking-[0.25em] text-xs uppercase">
            Acceso restringido
          </span>
          <h1 className="text-4xl font-black dark:text-white text-slate-900 leading-tight font-display">
            Panel de{' '}
            <span className="dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-primary dark:to-accent-lime text-violet-700">
              invitaciones.
            </span>
          </h1>
          <p className="dark:text-slate-400 text-slate-600 text-sm">
            Genera links únicos para que tus clientes dejen su testimonio.
          </p>
        </div>

        {/* Card formulario */}
        <form onSubmit={handleSubmit} className="rounded-[2rem] p-8 space-y-6 shadow-sm border
          dark:bg-zinc-900/70  bg-[#f7efff]
          dark:border-white/5   border-[#cdc9de]">

          {/* Admin key */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest dark:text-slate-500 text-slate-500 mb-2">
              Clave de Admin <span className="text-primary">*</span>
            </label>
            <input
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-xl px-4 py-3 text-sm border
                dark:bg-white/5       bg-[#f5f0ff]
                dark:border-white/10  border-[#cdc9de]
                dark:text-white       text-slate-900
                dark:placeholder-slate-600 placeholder-slate-400
                focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          {/* Divisor */}
          <div className="border-t dark:border-white/5 border-[#cdc9de] pt-6 space-y-4">
            <p className="text-xs font-black uppercase tracking-widest dark:text-slate-500 text-slate-500">
              Datos del cliente{' '}
              <span className="dark:text-slate-700 text-slate-400 normal-case font-normal">— opcional</span>
            </p>

            {/* Nombre */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest dark:text-slate-500 text-slate-500 mb-2">
                Nombre
              </label>
              <input
                type="text"
                placeholder="Ej. Juan Pérez"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="w-full rounded-xl px-4 py-3 text-sm border
                  dark:bg-white/5       bg-[#f5f0ff]
                  dark:border-white/10  border-[#cdc9de]
                  dark:text-white       text-slate-900
                  dark:placeholder-slate-600 placeholder-slate-400
                  focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            {/* Correo */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest dark:text-slate-500 text-slate-500 mb-2">
                Correo
              </label>
              <input
                type="email"
                placeholder="cliente@email.com"
                value={formData.clientEmail}
                onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                className="w-full rounded-xl px-4 py-3 text-sm border
                  dark:bg-white/5       bg-[#f5f0ff]
                  dark:border-white/10  border-[#cdc9de]
                  dark:text-white       text-slate-900
                  dark:placeholder-slate-600 placeholder-slate-400
                  focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            {/* Fecha */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest dark:text-slate-500 text-slate-500 mb-2">
                Expira el
              </label>
              <input
                type="date"
                value={formData.expiresAt}
                onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                className="w-full rounded-xl px-4 py-3 text-sm border
                  dark:bg-white/5       bg-[#f5f0ff]
                  dark:border-white/10  border-[#cdc9de]
                  dark:text-white       text-slate-900
                  focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">error</span>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:brightness-110 text-white rounded-xl py-3.5 font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generando...
              </>
            ) : (
              <>
                Generar link
                <span className="material-symbols-outlined text-[18px]">link</span>
              </>
            )}
          </button>
        </form>

        {/* Resultado */}
        {result && (
          <div className="mt-4 rounded-[2rem] p-6 space-y-4 shadow-sm border
            dark:bg-white/[0.04]  bg-[#ede8f5]
            dark:border-primary/20 border-[#cdc9de]">

            <p className="text-primary text-xs font-black uppercase tracking-widest">Link generado</p>

            <div className="rounded-xl px-4 py-3 break-all border
              dark:bg-white/5     bg-[#f5f0ff]
              dark:border-white/5 border-[#cdc9de]">
              <code className="dark:text-slate-300 text-slate-600 text-xs">{result.inviteLink}</code>
            </div>

            <button
              onClick={copyLink}
              className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold transition-all rounded-xl border
                dark:border-white/10  border-[#cdc9de]
                dark:hover:border-primary/30 hover:border-primary/30
                dark:hover:bg-primary/5     hover:bg-primary/5
                dark:text-slate-400 text-slate-500
                dark:hover:text-white hover:text-violet-700"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              {copied ? '¡Copiado!' : 'Copiar link'}
            </button>

          </div>
        )}

      </div>
    </div>
  );
}