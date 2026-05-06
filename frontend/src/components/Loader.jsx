"use client";

import { useEffect, useState } from 'react';

export default function Loader() {
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const fullText = "gm";

  // Animación de texto — se queda igual
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // 👇 Reemplaza este useEffect
  useEffect(() => {
    const textDuration = fullText.length * 200 + 400;
    let siteLoaded = false;
    let animationDone = false;

    const tryHide = () => {
      if (siteLoaded && animationDone) {
        setFadeOut(true);
        setTimeout(() => setVisible(false), 1000);
      }
    };

    const handleLoad = () => {
      siteLoaded = true;
      tryHide();
    };

    const animationTimer = setTimeout(() => {
      animationDone = true;
      tryHide();
    }, textDuration);

    if (document.readyState === 'complete') {
      siteLoaded = true;
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(animationTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-background-dark flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" />

      <div className="relative flex flex-col items-center justify-center">
        {/* Logo Animation */}
        <div className="flex items-center mb-8 animate-in fade-in zoom-in duration-1000">
          <span className="text-5xl font-black text-accent-lime font-mono">
            {"{"}
          </span>
          <span className="text-5xl font-black text-white font-mono mx-2 min-w-[1.2em] text-center italic">
            {text}
            <span className="animate-pulse">_</span>
          </span>
          <span className="text-5xl font-black text-accent-lime font-mono">
            {"}"}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
          <div className="h-full bg-gradient-to-r from-primary to-accent-lime animate-loader-progress rounded-full" />
        </div>
      </div>

      <p className="mt-6 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
        Construyendo experiencias
      </p>

      <style jsx>{`
        @keyframes loader-progress {
          0% {
            width: 0%;
            transform: translateX(-100%);
          }
          50% {
            width: 70%;
            transform: translateX(0%);
          }
          100% {
            width: 100%;
            transform: translateX(100%);
          }
        }
        .animate-loader-progress {
          animation: loader-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
}
