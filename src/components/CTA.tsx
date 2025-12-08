import { useState } from "react";
import { ArrowRight, Sparkles, X, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { ScrollReveal } from "./ScrollReveal";
import { useForm } from "../context/FormContext";
import { AnimatedGradientButton } from "./AnimatedGradientButton";

export function CTA() {
  const { showCtaForm, setShowCtaForm } = useForm();
  const showForm = showCtaForm;
  const setShowForm = setShowCtaForm;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "/api";
      const response = await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source: "cta",
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      setSubmitted(true);

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
        setSubmitted(false);
        setShowForm(false);
      }, 2000);
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("Hubo un error al enviar el formulario. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="cta-section" className="relative z-10 px-6 py-20 md:py-32 bg-[#F6F8FA]">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-[#E4E7EB] overflow-hidden">
            {/* Glassmorphism effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00E4FF]/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#147BFF]/10 to-transparent rounded-full blur-3xl" />

            <div className="relative">
              {!showForm ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center space-y-8"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#00E4FF]/10 to-[#147BFF]/10 border border-[#00E4FF]/20">
                    <Sparkles className="w-4 h-4 text-[#00E4FF]" />
                    <span className="text-sm text-gray-700">Empieza tu transformación digital</span>
                  </div>

                  <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900">
                    Automatiza tu empresa<br />
                    <span className="bg-gradient-to-r from-[#00E4FF] to-[#147BFF] bg-clip-text text-transparent">
                      hoy mismo.
                    </span>
                  </h2>

                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Únete a las empresas que ya están aprovechando el poder de la automatización inteligente
                  </p>

                  <AnimatedGradientButton 
                    onClick={() => setShowForm(true)}
                    size="lg"
                    className="hover:shadow-2xl hover:shadow-[#00E4FF]/30"
                  />
                </motion.div>
              ) : submitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center space-y-4 py-8"
                >
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#00E4FF]/20 to-[#147BFF]/20 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#00E4FF] to-[#147BFF] rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold">
                      ¡Gracias por contactarnos!
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      Nos pondremos en contacto pronto para discutir tu proyecto
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
                    <div className="bg-gradient-to-r from-[#00E4FF]/10 to-[#147BFF]/10 px-8 py-6 border-b border-[#E4E7EB] flex items-center justify-between -mx-8 -mt-8 mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">¿Hablamos de tu proyecto?</h3>
                        <p className="text-gray-600 text-sm mt-1">Cuéntanos sobre tu negocio y cómo podemos ayudarte</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Nombre */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Nombre
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Tu nombre"
                          className="w-full px-4 py-3 rounded-lg border border-[#E4E7EB] bg-[#F9FAFB] focus:outline-none focus:border-[#00E4FF] focus:ring-1 focus:ring-[#00E4FF]/50 transition-colors"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="tu@email.com"
                          className="w-full px-4 py-3 rounded-lg border border-[#E4E7EB] bg-[#F9FAFB] focus:outline-none focus:border-[#00E4FF] focus:ring-1 focus:ring-[#00E4FF]/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Teléfono (opcional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+34 123 456 789"
                        className="w-full px-4 py-3 rounded-lg border border-[#E4E7EB] bg-[#F9FAFB] focus:outline-none focus:border-[#00E4FF] focus:ring-1 focus:ring-[#00E4FF]/50 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Empresa (opcional)
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Nombre de tu empresa"
                        className="w-full px-4 py-3 rounded-lg border border-[#E4E7EB] bg-[#F9FAFB] focus:outline-none focus:border-[#00E4FF] focus:ring-1 focus:ring-[#00E4FF]/50 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Cuéntanos sobre tu proyecto
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="¿Qué desafíos tienes? ¿Qué esperas lograr?"
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg border border-[#E4E7EB] bg-[#F9FAFB] focus:outline-none focus:border-[#00E4FF] focus:ring-1 focus:ring-[#00E4FF]/50 transition-colors resize-none"
                      />
                    </div>

                    {/* Botones */}
                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-[#00E4FF] to-[#147BFF] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#00E4FF]/25 transition-all hover:scale-105 flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          "Enviar mensaje"
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="flex-1 px-6 py-3 border border-[#E4E7EB] text-gray-700 font-medium rounded-lg hover:bg-[#F9FAFB] transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>

                    {/* Contact info */}
                    <div className="pt-4 border-t border-[#E4E7EB] text-center">
                      <p className="text-sm text-gray-600 mb-2">O llámanos directamente para agendar una consulta:</p>
                      <a href="tel:+34614095478" className="text-lg font-semibold text-[#00E4FF] hover:text-[#147BFF] transition-colors">
                        +34 614 095 478
                      </a>
                    </div>
                  </form>
                </motion.div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}