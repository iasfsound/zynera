import { useState } from "react";
import { ArrowRight, Calendar, X, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedGradientButton } from "./AnimatedGradientButton";
import heroVideo from "../assets/zynera-hero.webm";

export function Hero() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
          source: "hero",
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      setSubmitted(true);

      setTimeout(() => {
    setFormData({ name: "", email: "", phone: "", message: "" });
        setSubmitted(false);
    setShowContactForm(false);
      }, 2000);
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("Hubo un error al enviar el formulario. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative z-10 px-6 py-20 md:py-32 lg:py-40 pt-32 md:pt-40">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#00E4FF]/10 to-[#147BFF]/10 border border-[#00E4FF]/20"
            >
              <div className="w-2 h-2 rounded-full bg-[#00E4FF] animate-pulse" />
              <span className="text-sm text-gray-700">Empieza tu transformación digital</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl tracking-tight text-gray-900"
            >
              Automatización,<br />
              Inteligencia,<br />
              <span className="bg-gradient-to-r from-[#00E4FF] to-[#147BFF] bg-clip-text text-transparent">
                Eficiencia.
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-xl"
            >
              Zynera diseña flujos de trabajo con IA, chatbots inteligentes y sistemas automatizados para hacer crecer tu negocio.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <AnimatedGradientButton 
                onClick={() => setShowContactForm(!showContactForm)}
                size="md"
              />
            </motion.div>
          </div>
          
          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Outer glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00E4FF]/20 to-[#147BFF]/20 rounded-full blur-3xl" />
              
              {/* Main circle */}
              <div className="relative w-full h-full">
                {/* Orbiting elements */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-[#00E4FF] to-[#147BFF]" />
                </div>
                
                <div className="absolute inset-8 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#00E4FF]/60" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#147BFF]/60" />
                </div>
                
                {/* Center core */}
                <div className="absolute inset-1/4 rounded-full bg-gradient-to-br from-[#00E4FF] to-[#147BFF] opacity-10" />
                <div className="absolute inset-1/3 rounded-full bg-white border-2 border-[#00E4FF]/30 backdrop-blur-sm" />
                
                {/* Neural connections */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="60" fill="none" stroke="url(#gradient1)" strokeWidth="0.5" opacity="0.4" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="url(#gradient1)" strokeWidth="0.5" opacity="0.3" />
                  
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00E4FF" />
                      <stop offset="100%" stopColor="#147BFF" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Animación centrada y superpuesta */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <video 
                    src={heroVideo} 
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: '150px', height: '150px' }}
                    className="object-contain drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact Form - Appears inside the main card section */}
        <AnimatePresence>
          {showContactForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="mt-12 max-w-2xl mx-auto"
            >
              <div className="relative bg-white rounded-2xl border border-[#E4E7EB] shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#00E4FF]/10 to-[#147BFF]/10 px-8 py-6 border-b border-[#E4E7EB] flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">¿Hablamos de tu proyecto?</h3>
                    <p className="text-gray-600 text-sm mt-1">Cuéntanos sobre tu negocio y cómo podemos ayudarte</p>
                  </div>
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Form or Success Message */}
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="p-8 text-center space-y-4"
                    >
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#00E4FF]/20 to-[#147BFF]/20 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-[#00E4FF] to-[#147BFF] rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">¡Mensaje enviado!</h3>
                      <p className="text-gray-600">
                        Gracias por contactarnos. Te responderemos lo antes posible.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleSubmit}
                      className="p-8 space-y-6"
                    >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Nombre</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Tu nombre"
                        className="w-full px-4 py-3 rounded-lg border border-[#E4E7EB] bg-[#F9FAFB] focus:outline-none focus:border-[#00E4FF] focus:ring-1 focus:ring-[#00E4FF]/50 transition-colors"
                        required
                            disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="tu@email.com"
                        className="w-full px-4 py-3 rounded-lg border border-[#E4E7EB] bg-[#F9FAFB] focus:outline-none focus:border-[#00E4FF] focus:ring-1 focus:ring-[#00E4FF]/50 transition-colors"
                        required
                            disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Teléfono (opcional)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+34 123 456 789"
                      className="w-full px-4 py-3 rounded-lg border border-[#E4E7EB] bg-[#F9FAFB] focus:outline-none focus:border-[#00E4FF] focus:ring-1 focus:ring-[#00E4FF]/50 transition-colors"
                          disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Cuéntanos sobre tu proyecto</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="¿Qué desafíos tienes? ¿Qué esperas lograr?"
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-[#E4E7EB] bg-[#F9FAFB] focus:outline-none focus:border-[#00E4FF] focus:ring-1 focus:ring-[#00E4FF]/50 transition-colors resize-none"
                      required
                          disabled={isLoading}
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                          disabled={isLoading}
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-[#00E4FF] to-[#147BFF] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#00E4FF]/25 transition-all hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
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
                      onClick={() => setShowContactForm(false)}
                          disabled={isLoading}
                          className="flex-1 px-6 py-3 border border-[#E4E7EB] text-gray-700 font-medium rounded-lg hover:bg-[#F9FAFB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancelar
                    </button>
                  </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}