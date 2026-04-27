import React from "react";

/**
 * Solicita reproducir un sonido de mensaje
 */
export function requestMessageSound(type = "assistant") {
  try {
    const soundPath =
      type === "assistant" ? "/sound/note.mp3" : "/sound/pop.mp3";
    const audio = new Audio(soundPath);
    audio.volume = 0.4;
    audio.load();
    const p = audio.play();
    if (p !== undefined) p.catch(() => {});
  } catch {}
}

/**
 * Construye el enlace de WhatsApp con el resumen de la conversación
 */
export function buildWhatsAppLink(messages) {
  const phone = "573115140908";

  // Toma el último mensaje del bot que tenga el resumen de cotización
  const ultimoResumen = [...messages]
    .reverse()
    .find((m) => m.role === "assistant" && m.content.includes("Anticipo:"));

  if (!ultimoResumen) {
    const message =
      "👋 ¡Hola, Gabriel!\n\nEstuve chateando con tu asistente y me gustaría hablar contigo. ¿Tienes disponibilidad? 🚀";
    const encoded = encodeURIComponent(message);
    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
    return isMobile
      ? `https://wa.me/${phone}?text=${encoded}`
      : `https://web.whatsapp.com/send?phone=${phone}&text=${encoded}`;
  }

  // Limpieza profunda del mensaje para WhatsApp
  let cleanContent = ultimoResumen.content
    .replace(/https?:\/\/[^\s]+/g, "") // quita links
    .replace(/---/g, "") // quita separadores
    .replace(/.*?(?=📋)/s, "") // quita todo antes del primer emoji de proyecto 📋
    .replace(/¿Quieres contactarlo.*$/s, "") // quita el cierre del bot
    .replace(/Esto es un estimado.*$/s, "") // quita la nota del estimado
    .trim();

  // Asegurar negritas en etiquetas para WhatsApp (si el bot no las puso)
  const labels = [
    "Proyecto:",
    "Funcionalidades:",
    "Precio estimado:",
    "Tiempo estimado:",
    "Anticipo:",
  ];
  labels.forEach((label) => {
    const regex = new RegExp(label.replace(":", "\\:"), "g");
    if (!cleanContent.includes(`*${label}*`)) {
      cleanContent = cleanContent.replace(regex, `*${label}*`);
    }
  });

  const message = `👋 ¡Hola, Gabriel!\n\nEstuve hablando con tu asistente y quedamos en lo siguiente:\n\n${cleanContent}\n\n¿Podríamos hablar?`;

  const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
  const encoded = encodeURIComponent(message);

  return isMobile
    ? `https://wa.me/${phone}?text=${encoded}`
    : `https://web.whatsapp.com/send?phone=${phone}&text=${encoded}`;
}

/**
 * Renderiza el mensaje con enlaces clickeables y manejados
 */
export function renderMessage(content, messages, buildLinkFn) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = content.split(urlRegex);
  return parts.map((part, i) => {
    if (!part.match(urlRegex)) return part;

    // Reemplaza el link de wa.link por uno nutrido con la conversación
    const href = part.includes("wa.link") ? buildLinkFn(messages) : part;

    return (
      <a
        key={i}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white underline decoration-white/30 hover:decoration-white transition-all font-bold"
      >
        {part}
      </a>
    );
  });
}
