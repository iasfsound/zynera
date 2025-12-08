import { useState } from "react";
import { X, Mail, User, Phone, MessageSquare, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
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
          source: "contact-modal",
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
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("Hubo un error al enviar el formulario. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 flex items-center justify-between p-6 border-b border-[#E4E7EB] bg-white rounded-t-2xl">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {submitted ? "¡Mensaje enviado!" : "Contacta con nosotros"}
                  </h2>
                  {!submitted && (
                    <p className="text-sm text-gray-600 mt-1">
                      Cuéntanos más sobre tu proyecto
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
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
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nombre */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre completo
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Tu nombre"
                          className="w-full pl-10 pr-4 py-2 border border-[#E4E7EB] rounded-lg focus:outline-none focus:border-[#00E4FF] focus:ring-2 focus:ring-[#00E4FF]/10 transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="tu@email.com"
                          className="w-full pl-10 pr-4 py-2 border border-[#E4E7EB] rounded-lg focus:outline-none focus:border-[#00E4FF] focus:ring-2 focus:ring-[#00E4FF]/10 transition-all"
                        />
                      </div>
                    </div>

                    {/* Teléfono */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+34 XXX XX XX XX"
                          className="w-full pl-10 pr-4 py-2 border border-[#E4E7EB] rounded-lg focus:outline-none focus:border-[#00E4FF] focus:ring-2 focus:ring-[#00E4FF]/10 transition-all"
                        />
                      </div>
                    </div>

                    {/* Empresa */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Empresa
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Nombre de tu empresa"
                        className="w-full px-4 py-2 border border-[#E4E7EB] rounded-lg focus:outline-none focus:border-[#00E4FF] focus:ring-2 focus:ring-[#00E4FF]/10 transition-all"
                      />
                    </div>

                    {/* Mensaje */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mensaje
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder="Cuéntanos sobre tu proyecto..."
                          rows={4}
                          className="w-full pl-10 pr-4 py-2 border border-[#E4E7EB] rounded-lg focus:outline-none focus:border-[#00E4FF] focus:ring-2 focus:ring-[#00E4FF]/10 transition-all resize-none"
                        />
                      </div>
                    </div>

                    {/* Botones */}
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-[#00E4FF] to-[#147BFF] text-white rounded-lg hover:shadow-lg hover:shadow-[#00E4FF]/25 disabled:opacity-70 transition-all font-medium flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          "Enviar"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
