import { useState } from 'react';
import { createInvite } from '../services/testimonialApi';

export default function AdminInvites() {
  const [adminKey, setAdminKey] = useState('');
  const [formData, setFormData] = useState({ clientName: '', clientEmail: '', expiresAt: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const cleanData = {};
      if (formData.clientName.trim()) cleanData.clientName = formData.clientName.trim();
      if (formData.clientEmail.trim()) cleanData.clientEmail = formData.clientEmail.trim();
      if (formData.expiresAt.trim()) cleanData.expiresAt = formData.expiresAt.trim();
      const data = await createInvite(cleanData, adminKey);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Error al generar link');
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(result.inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center py-16 px-4 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent-lime/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">

        {/* Header */}
        <div className="mb-10 space-y-3">
          <span className="text-primary font-bold tracking-[0.25em] text-xs uppercase">
            Acceso restringido
          </span>
          <h1 className="text-4xl font-black text-white leading-tight font-display">
            Panel de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-lime">
              invitaciones.
            </span>
          </h1>
          <p className="text-slate-400 text-sm">
            Genera links únicos para que tus clientes dejen su testimonio.
          </p>
        </div>

        {/* Card */}
        <form onSubmit={handleSubmit} className="glass-morphism border border-white/5 rounded-[2rem] p-8 space-y-6">

          {/* Admin key */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500">
              Clave de Admin <span className="text-primary">*</span>
            </label>
            <input
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="border-t border-white/5 pt-6 space-y-4">
            <p className="text-xs font-black uppercase tracking-widest text-slate-500">
              Datos del cliente <span className="text-slate-700 normal-case font-normal">— opcional</span>
            </p>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500">Nombre</label>
              <input
                type="text"
                placeholder="Ej. Juan Pérez"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500">Correo</label>
              <input
                type="email"
                placeholder="cliente@email.com"
                value={formData.clientEmail}
                onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500">Expira el</label>
              <input
                type="date"
                value={formData.expiresAt}
                onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors"
                style={{ colorScheme: 'dark' }}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">error</span>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:brightness-110 text-white rounded-xl py-3.5 font-bold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
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
          <div className="mt-4 glass-morphism border border-primary/20 rounded-[2rem] p-6 space-y-4">
            <div className="flex items-center gap-2">
              <p className="text-primary text-xs font-black uppercase tracking-widest">Link generado</p>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-xl px-4 py-3 break-all">
              <code className="text-slate-300 text-xs">{result.inviteLink}</code>
            </div>
            <button
              onClick={copyLink}
              className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold transition-all rounded-xl border border-white/10 hover:border-primary/30 hover:bg-primary/5"
              style={{ color: copied ? '#fff' : '#94a3b8' }}
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