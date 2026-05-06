"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { getApprovedTestimonials } from "../services/testimonialApi";

interface Testimonial {
  id: string;
  name: string;
  message: string;
  rating?: number;
  image?: string;
  position?: string;
  company?: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getApprovedTestimonials();
        setTestimonials(data || []);
      } catch {
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-black dark:text-white text-slate-900 mb-6 font-display">
          Clientes Satisfechos
        </h2>
        <p className="text-lg dark:text-slate-400 text-slate-600 max-w-2xl mx-auto">
          Reseñas de quienes han confiado en mi trabajo.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-16 border rounded-3xl
            dark:border-white/5     border-[#cdc9de]
            dark:bg-white/[0.04]    bg-[#f5f0ff]">
            <span className="material-symbols-outlined dark:text-slate-500 text-slate-400 text-5xl mb-4 block">
              chat_bubble_outline
            </span>
            <p className="dark:text-slate-400 text-slate-500 font-medium tracking-wide">
              Aún no hay testimonios cargados
            </p>
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={true}
            autoplay={{ delay: 7000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="pb-10"
            style={{ paddingBottom: "2.5rem" }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="relative rounded-[1.5rem] p-6 h-full flex flex-col group overflow-hidden
                  border transition-all duration-300
                  dark:border-white/5         border-[#cdc9de]
                  dark:bg-white/[0.04]        bg-[#f5f0ff]
                  hover:border-primary/40
                  dark:hover:shadow-xl        dark:hover:shadow-primary/10
                  shadow-sm
                ">
                  {/* Glow hover — solo dark */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent opacity-0 dark:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[1.5rem]" />

                  {/* Estrellas */}
                  {testimonial.rating && (
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < (testimonial.rating ?? 0)
                              ? "dark:text-accent-lime text-violet-600 dark:drop-shadow-[0_0_6px_rgba(190,242,100,0.4)]"
                              : "dark:text-slate-700 text-slate-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Mensaje */}
                  <p className="dark:text-slate-300 text-slate-600 text-sm leading-relaxed relative z-10 mb-4 flex-grow">
                    "{testimonial.message}"
                  </p>

                  {/* Autor */}
                  <div className="flex items-center gap-4 pt-5 border-t relative z-10
                    dark:border-white/5 border-[#cdc9de]">
                    {testimonial.image ? (
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-primary/30 shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-2
                        dark:border-primary/20  border-violet-200
                        dark:bg-primary/15      bg-violet-100">
                        <span className="dark:text-primary text-violet-700 font-black text-lg">
                          {testimonial.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="font-black dark:text-white text-slate-900 text-sm truncate">
                        {testimonial.name}
                      </p>
                      <p className="text-[10px] dark:text-slate-500 text-slate-400 uppercase tracking-widest font-bold truncate mt-0.5">
                        {[testimonial.position, testimonial.company]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}