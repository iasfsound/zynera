import { Search, Hammer, Zap } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const steps = [
  {
    icon: Search,
    title: "Descubrir",
    description: "Analizamos tu negocio y identificamos oportunidades de automatización."
  },
  {
    icon: Hammer,
    title: "Construir",
    description: "Diseñamos e implementamos soluciones personalizadas con IA."
  },
  {
    icon: Zap,
    title: "Automatizar",
    description: "Activamos sistemas inteligentes que funcionan 24/7 para ti."
  }
];

export function HowItWorks() {
  return (
    <section id="proceso" className="relative z-10 px-6 py-20 md:py-32">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F6F8FA] border border-[#E4E7EB] mb-6">
              <span className="text-sm text-gray-600">Proceso</span>
            </div>
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">
              Cómo funciona
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un proceso simple y efectivo para transformar tu empresa
            </p>
          </div>
          
          <div className="relative">
            {/* Connection lines */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00E4FF]/20 via-[#147BFF]/20 to-[#00E4FF]/20" style={{ transform: 'translateY(-50%)' }} />
            
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative">
                    {/* Arrow for mobile */}
                    {index < steps.length - 1 && (
                      <div className="md:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 text-[#00E4FF]/30">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5V19M12 19L6 13M12 19L18 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                    
                    <div className="bg-white rounded-2xl p-8 border border-[#E4E7EB] hover:border-[#00E4FF]/50 transition-all hover:shadow-lg text-center">
                      {/* Step number */}
                      <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-[#00E4FF] to-[#147BFF] text-white flex items-center justify-center shadow-lg">
                        {index + 1}
                      </div>
                      
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00E4FF]/10 to-[#147BFF]/10 flex items-center justify-center mx-auto mb-6">
                        <Icon className="w-10 h-10 text-[#00E4FF]" />
                      </div>
                      
                      <h3 className="text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      
                      <p className="text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}