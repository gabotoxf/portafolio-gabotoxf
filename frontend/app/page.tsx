import Hero from "@/src/components/Hero";
import About from "@/src/components/About";
import Skills from "@/src/components/Skills";
import Projects from "@/src/components/Projects";
import TestimonialsSection from "@/src/components/TestimonialsSection";
import Contact from "@/src/components/Contact";
import Chatbot from "@/src/components/Chatbot/index";

export default function HomePage() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white transition-colors duration-300 overflow-x-hidden">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <TestimonialsSection />
      <Contact />
      <Chatbot />
    </div>
  );
}