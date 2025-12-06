import { Workflow, MessageSquare, Users, Sparkles } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const services = [
  {
    icon: Workflow,
    title: "Automatización de Procesos",
    description: "Optimiza tus operaciones con flujos de trabajo inteligentes que ahorran tiempo y recursos."
  },
  {
    icon: MessageSquare,
    title: "Chatbots con IA",
    description: "Asistentes conversacionales avanzados que entienden y resuelven las necesidades de tus clientes."
  },
  {
    icon: Users,
    title: "Asistentes Internos Inteligentes",
    description: "Potencia la productividad de tu equipo con herramientas de IA personalizadas."
  },
  {
    icon: Sparkles,
    title: "Estrategia e Implementación de IA",
    description: "Diseñamos e implementamos soluciones de inteligencia artificial adaptadas a tu negocio."
  }
];

export function Services() {
  return (
    <section id="servicios" className="relative z-10 px-6 py-20 md:py-32 bg-[#F6F8FA]">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E4E7EB] mb-6">
              <span className="text-sm text-gray-600">Nuestros Servicios</span>
            </div>
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">
              Soluciones que transforman
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tecnología de vanguardia para automatizar y escalar tu empresa
            </p>
          </div>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div
                  className="group relative bg-white rounded-2xl p-8 border border-[#E4E7EB] hover:border-[#00E4FF]/50 transition-all hover:shadow-xl hover:shadow-[#00E4FF]/10 hover:-translate-y-1"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00E4FF]/5 to-[#147BFF]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00E4FF]/10 to-[#147BFF]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-[#00E4FF]" />
                    </div>
                    
                    <h3 className="text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}