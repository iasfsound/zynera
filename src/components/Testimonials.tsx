import { ImageWithFallback } from './figma/ImageWithFallback';
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLowMotion } from "../hooks/useLowMotion";

const testimonials = [
  {
    name: "María González",
    role: "CEO, TechFlow Solutions",
    image: "https://images.unsplash.com/photo-1496180470114-6ef490f3ff22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvbWFufGVufDF8fHx8MTc2Mzk3OTkzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    text: "Zynera transformó completamente nuestra operación. Ahorramos más de 30 horas semanales en tareas repetitivas y el ROI fue inmediato."
  },
  {
    name: "Carlos Mendoza",
    role: "Director de Operaciones, InnovateLab",
    image: "https://images.unsplash.com/photo-1737574821698-862e77f044c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDA2NjI4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    text: "El chatbot inteligente que desarrollaron maneja el 80% de nuestras consultas automáticamente. Nuestros clientes están más satisfechos que nunca."
  },
  {
    name: "Laura Martínez",
    role: "Fundadora, Digital Growth Agency",
    image: "https://images.unsplash.com/photo-1762341114803-a797c44649f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGVudHJlcHJlbmV1cnxlbnwxfHx8fDE3NjQwMTE0MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    text: "Profesionales excepcionales. Su enfoque estratégico y tecnología de punta nos permitieron escalar sin aumentar costos operativos."
  },
  {
    name: "Roberto Silva",
    role: "CTO, CloudBase Systems",
    image: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQwMTQyNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    text: "La implementación de sus asistentes IA en nuestro equipo aumentó la productividad un 45%. La inversión se recuperó en menos de 3 meses."
  },
  {
    name: "Ana Rodríguez",
    role: "Directora Ejecutiva, Innovate Corp",
    image: "https://images.unsplash.com/photo-1562935345-5080389daccd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwZXhlY3V0aXZlfGVufDF8fHx8MTc2Mzk3MDUxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    text: "Desde que trabajamos con Zynera, automatizamos procesos clave y mejoramos nuestra eficiencia operativa de manera impresionante."
  },
  {
    name: "David Morales",
    role: "CEO, NextGen Ventures",
    image: "https://images.unsplash.com/photo-1529688530647-93a6e1916f5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyZXByZW5ldXIlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY0MDg2MjY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    text: "La calidad y el soporte que ofrece Zynera es incomparable. Sus soluciones de IA están a la altura de las grandes empresas tech."
  }
];

export function Testimonials() {
  const lowMotion = useLowMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (lowMotion) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, slidesToShow, lowMotion]);

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev + slidesToShow >= testimonials.length ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, testimonials.length - slidesToShow) : prev - 1
    );
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + slidesToShow
  );

  // Fill with items from the beginning if we're at the end
  if (visibleTestimonials.length < slidesToShow) {
    visibleTestimonials.push(
      ...testimonials.slice(0, slidesToShow - visibleTestimonials.length)
    );
  }

  return (
    <section id="testimonios" className="relative z-10 px-6 py-20 md:py-32">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F6F8FA] border border-[#E4E7EB] mb-6">
              <span className="text-sm text-gray-600">Testimonios</span>
            </div>
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Empresas que ya están automatizando con Zynera
            </p>
          </div>
        </ScrollReveal>
        
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="hidden md:flex absolute -left-6 lg:-left-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-[#E4E7EB] hover:border-[#00E4FF]/50 hover:bg-gradient-to-br hover:from-[#00E4FF]/10 hover:to-[#147BFF]/10 items-center justify-center transition-all shadow-md hover:shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={handleNext}
            className="hidden md:flex absolute -right-6 lg:-right-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-[#E4E7EB] hover:border-[#00E4FF]/50 hover:bg-gradient-to-br hover:from-[#00E4FF]/10 hover:to-[#147BFF]/10 items-center justify-center transition-all shadow-md hover:shadow-lg"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden">
            <motion.div
              className="grid gap-6"
              style={{
                gridTemplateColumns: `repeat(${slidesToShow}, 1fr)`
              }}
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              {visibleTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`${currentIndex}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 border border-[#E4E7EB] hover:border-[#00E4FF]/50 transition-all hover:shadow-xl"
                >
                  <Quote className="w-10 h-10 text-[#00E4FF]/30 mb-6" />
                  
                  <p className="text-gray-700 mb-8 min-h-[120px]">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(testimonials.length / slidesToShow) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * slidesToShow)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  Math.floor(currentIndex / slidesToShow) === index
                    ? 'bg-[#00E4FF] w-8'
                    : 'bg-[#E4E7EB] hover:bg-[#00E4FF]/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
