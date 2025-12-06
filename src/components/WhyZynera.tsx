import { Clock, TrendingDown, Brain, TrendingUp } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const benefits = [
  {
    icon: Clock,
    title: "Ahorro de tiempo",
    description: "Automatiza tareas repetitivas y libera horas valiosas cada semana."
  },
  {
    icon: TrendingDown,
    title: "Reducción de costes",
    description: "Optimiza recursos y reduce gastos operativos significativamente."
  },
  {
    icon: Brain,
    title: "Sistemas inteligentes",
    description: "IA que aprende y se adapta a las necesidades de tu negocio."
  },
  {
    icon: TrendingUp,
    title: "Escalabilidad real",
    description: "Crece sin límites con infraestructura que escala contigo."
  }
];

export function WhyZynera() {
  return (
    <section id="ventajas" className="relative z-10 px-6 py-20 md:py-32 bg-[#F6F8FA]">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E4E7EB] mb-6">
              <span className="text-sm text-gray-600">Ventajas</span>
            </div>
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">
              Por qué Zynera
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Resultados medibles y tecnología que marca la diferencia
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 border border-[#E4E7EB] hover:border-[#00E4FF]/50 transition-all hover:shadow-lg text-center group"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00E4FF]/10 to-[#147BFF]/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-[#147BFF]" />
                  </div>
                  
                  <h3 className="text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}