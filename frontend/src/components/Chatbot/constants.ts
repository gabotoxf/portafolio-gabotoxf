export const GROQ_MODEL = "llama-3.3-70b-versatile";
export const API_TIMEOUT_MS = 25_000;
export const AUTO_OPEN_DELAY_MS = 10_000;
export const AUTO_OPEN_SESSION_KEY = "gm_chatbot_auto_opened_v2";
export const THROTTLE_AUTO_OPEN = process.env.NODE_ENV === "production";
export const WELCOME_MESSAGE =
  "Soy el asistente virtual de Gabriel. Pregúntame sobre su stack, proyectos o disponibilidad para freelance. 👋";

export const RATE_LIMIT = { maxMessages: 10, windowMs: 60_000 };

export const SUGGESTIONS = [
  "¿Con qué tecnologías trabajas?",
  "¿Estás disponible para freelance?",
  "¿Cuánto cobras por un proyecto?",
  "¿Qué proyectos has hecho?",
];
