'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { validateInviteToken, submitTestimonial } from '@/src/services/testimonialApi';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';

interface ApiError {
  status?: number;
  message?: string;
}

export default function ReferenceForm() {
  const { token } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    position: '',
    message: '',
    rating: 5,
    image: '',
  });

  useEffect(() => {
    const validateToken = async () => {
      try {
        const data = await validateInviteToken(token);
        if (data.clientName) setFormData(prev => ({ ...prev, name: data.clientName }));
      } catch (err) {
        const e = err as ApiError;
        setError(e.message || 'Link inválido o expirado');
      } finally {
        setLoading(false);
      }
    };
    if (token) validateToken();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error('La imagen es demasiado grande (máximo 10MB)');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        const MAX_SIZE = 800;
        if (width > height) {
          if (width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; }
        } else {
          if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        setFormData(prev => ({ ...prev, image: compressedBase64 }));
        setImagePreview(compressedBase64);
      };
    };
    reader.onerror = () => toast.error('Error al procesar la imagen');
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();

    if (!formData.name.trim()) { toast.error('El nombre es obligatorio'); return; }
    if (formData.message.length < 20) { toast.error('El testimonio debe tener al menos 20 caracteres'); return; }

    try {
      setSubmitting(true);
      setError(null);
      await submitTestimonial(token, formData);

      toast.success('¡Muchas gracias! Tu testimonio ha sido enviado y está en revisión.', {
        duration: 6000,
        icon: <span className="material-symbols-outlined text-accent-lime text-xl">task_alt</span>,
      });

      setSuccess(true);
      setTimeout(() => router.push('/'), 5000);
    } catch (err) {
      const e = err as ApiError;
      const msg = e.message || 'Error enviando testimonio';
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Loading ── */
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center dark:bg-background-dark bg-background-light">
      <div className="text-center space-y-4">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="dark:text-slate-500 text-slate-400 text-xs font-bold uppercase tracking-widest">Validando acceso...</p>
      </div>
    </div>
  );

  /* ── Error de token ── */
  if (error && !success) return (
    <div className="min-h-screen flex items-center justify-center dark:bg-background-dark bg-background-light px-4">
      <div className="dark:bg-white/[0.04] bg-white dark:border-white/5 border-slate-200 rounded-3xl p-10 max-w-sm w-full text-center space-y-5 shadow-lg">
        <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-red-400 text-2xl">lock</span>
        </div>
        <div>
          <h2 className="text-xl font-black dark:text-white text-slate-900 mb-2 font-display">Acceso denegado</h2>
          <p className="dark:text-slate-500 text-slate-400 text-sm leading-relaxed">{error}</p>
        </div>
        <button onClick={() => router.push('/')}
          className="w-full py-3 dark:bg-white/5 bg-slate-100 hover:bg-slate-200 dark:hover:bg-white/10 dark:border-white/10 border-slate-200 dark:text-white text-slate-900 rounded-xl text-sm font-bold transition-all">
          Volver al inicio
        </button>
      </div>
    </div>
  );

  /* ── Formulario ── */
  return (
    <div className="min-h-screen dark:bg-background-dark bg-background-light flex flex-col relative overflow-hidden pt-32 lg:pt-28">
      {success && (
        <div className="fixed inset-0 z-[100] backdrop-blur-xl dark:bg-background-dark/80 bg-background-light/85 flex items-center justify-center p-6 text-center animate-in fade-in duration-700">
          <div className="max-w-md space-y-8 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10" />
            <div className="w-24 h-24 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-primary/20 animate-bounce-slow">
              <span className="material-symbols-outlined text-primary text-5xl">check_circle</span>
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-black dark:text-white text-slate-900 font-display tracking-tight">¡Referencia Enviada!</h2>
              <p className="dark:text-slate-400 text-slate-600 text-lg leading-relaxed">
                Muchas gracias por tu tiempo. Tu testimonio ha sido recibido y será revisado pronto.
              </p>
            </div>
            <div className="pt-4 flex flex-col items-center gap-6">
              <button onClick={() => router.push('/')}
                className="px-10 py-4 bg-primary hover:brightness-110 text-white rounded-2xl text-sm font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-primary/20 active:scale-95">
                Volver al inicio
              </button>
              <div className="flex items-center gap-3 dark:text-slate-500 text-slate-400 text-xs font-bold uppercase tracking-widest">
                <div className="w-4 h-4 border-2 dark:border-slate-700 border-slate-300 border-t-primary rounded-full animate-spin" />
                Redirigiendo automáticamente...
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent-lime/5 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <div className="flex-1 flex items-center justify-center py-16 px-4 relative z-10">
        <div className="w-full max-w-4xl">

          <div className="mb-10 space-y-3">
            <span className="text-primary font-bold tracking-[0.25em] text-xs uppercase">Invitación exclusiva</span>
            <h1 className="text-4xl lg:text-5xl font-black dark:text-white text-slate-900 leading-tight font-display">
              Deja tu{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-lime">
                referencia.
              </span>
            </h1>
            <p className="dark:text-slate-400 text-slate-600 text-base max-w-sm">
              Tu opinión ayuda a que mi trabajo llegue a más personas como tú.
            </p>
          </div>

          <div className="dark:bg-white/[0.04] bg-white dark:border-white/5 border-slate-200 rounded-[2rem] overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* Izquierda */}
              <div className="p-8 dark:border-b border-slate-200 dark:border-white/5 lg:border-b-0 lg:border-r flex flex-col gap-8">

                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-widest dark:text-slate-500 text-slate-400">Foto de perfil</label>
                  <div className="relative w-fit">
                    <input type="file" accept="image/*" onChange={handleImage} disabled={submitting}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full" />
                    <div className={`w-20 h-20 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden transition-all
                      ${imagePreview ? 'border-primary/50' : 'dark:border-white/10 border-slate-200 dark:hover:border-primary/30 hover:border-primary/30'}`}>
                      {imagePreview
                        ? <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                        : <span className="material-symbols-outlined dark:text-slate-600 text-slate-400 text-2xl pointer-events-none">add_a_photo</span>
                      }
                    </div>
                    {imagePreview && (
                      <button type="button"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setImagePreview(null); setFormData(p => ({ ...p, image: '' })); }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center z-20">
                        <span className="material-symbols-outlined text-white text-xs">close</span>
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] dark:text-slate-600 text-slate-400 uppercase tracking-widest font-bold">Opcional</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest dark:text-slate-500 text-slate-400">
                    Nombre <span className="text-primary">*</span>
                  </label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} disabled={submitting}
                    placeholder="Tu nombre" required
                    className="w-full dark:bg-white/5 bg-slate-50 dark:border-white/10 border-slate-200 rounded-xl px-4 py-3 dark:text-white text-slate-900 dark:placeholder-slate-600 placeholder-slate-400 text-sm focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50" />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest dark:text-slate-500 text-slate-400">Cargo</label>
                  <input type="text" name="position" value={formData.position} onChange={handleChange} disabled={submitting}
                    placeholder="Ej. CEO"
                    className="w-full dark:bg-white/5 bg-slate-50 dark:border-white/10 border-slate-200 rounded-xl px-4 py-3 dark:text-white text-slate-900 dark:placeholder-slate-600 placeholder-slate-400 text-sm focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50" />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest dark:text-slate-500 text-slate-400">Empresa</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange} disabled={submitting}
                    placeholder="Ej. TechCorp"
                    className="w-full dark:bg-white/5 bg-slate-50 dark:border-white/10 border-slate-200 rounded-xl px-4 py-3 dark:text-white text-slate-900 dark:placeholder-slate-600 placeholder-slate-400 text-sm focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50" />
                </div>
              </div>

              {/* Derecha */}
              <div className="p-8 flex flex-col gap-6">

                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-widest dark:text-slate-500 text-slate-400">Calificación</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        disabled={submitting}
                        className={`text-2xl transition-all hover:scale-125 active:scale-95 disabled:opacity-50 ${star <= formData.rating
                          ? 'text-accent-lime drop-shadow-[0_0_8px_rgba(190,242,100,0.5)]'
                          : 'dark:text-slate-700 text-slate-300'}`}>
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 flex-1">
                  <label className="block text-xs font-bold uppercase tracking-widest dark:text-slate-500 text-slate-400">
                    Testimonio <span className="text-primary">*</span>
                  </label>
                  <textarea name="message" value={formData.message} onChange={handleChange} disabled={submitting}
                    placeholder="Cuéntanos cómo fue tu experiencia..." required rows={5}
                    className="w-full dark:bg-white/5 bg-slate-50 dark:border-white/10 border-slate-200 rounded-xl px-4 py-3 dark:text-white text-slate-900 dark:placeholder-slate-600 placeholder-slate-400 text-sm focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50 resize-none" />
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${formData.message.length < 20 ? 'dark:text-slate-600 text-slate-400' : 'text-accent-lime'}`}>
                    {formData.message.length} / 20 mín.
                  </p>
                </div>

                {error && (
                  <p className="text-red-400 text-xs flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">error</span>
                    {error}
                  </p>
                )}

                <button type="submit" onClick={handleSubmit} disabled={submitting}
                  className="w-full bg-primary hover:brightness-110 text-white rounded-xl py-3.5 font-bold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar referencia
                      <span className="material-symbols-outlined text-[18px]">send</span>
                    </>
                  )}
                </button>

                <p className="text-center text-xs dark:text-slate-600 text-slate-400">
                  Tu referencia pasa por revisión antes de publicarse.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
