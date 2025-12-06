import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  personalization: boolean;
}

export function CookieBanner({ setCurrentPage }: { setCurrentPage: (page: "home" | "privacy" | "terms" | "legal" | "cookies") => void }) {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    personalization: false,
  });

  useEffect(() => {
    // Verificar si el usuario ya ha aceptado/rechazado cookies
    const savedConsent = localStorage.getItem("cookieConsent");
    if (!savedConsent) {
      setShowBanner(true);
    } else {
      const parsedConsent = JSON.parse(savedConsent);
      setConsent(parsedConsent);
    }
  }, []);

  const handleAcceptAll = () => {
    const allConsent: CookieConsent = {
      necessary: true,
      analytics: true,
      personalization: true,
    };
    localStorage.setItem("cookieConsent", JSON.stringify(allConsent));
    setConsent(allConsent);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const minimalConsent: CookieConsent = {
      necessary: true,
      analytics: false,
      personalization: false,
    };
    localStorage.setItem("cookieConsent", JSON.stringify(minimalConsent));
    setConsent(minimalConsent);
    setShowBanner(false);
  };

  const handleSaveSettings = () => {
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
    setShowBanner(false);
  };

  const toggleCookieType = (type: keyof CookieConsent) => {
    if (type === "necessary") return; // No permitir desactivar cookies necesarias
    setConsent((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          {/* Overlay */}
          {showSettings && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setShowSettings(false)}
            />
          )}

          {/* Banner */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4"
          >
            <div className="max-w-6xl mx-auto">
              {!showSettings ? (
                // Banner Principal
                <div className="bg-white rounded-2xl shadow-2xl border border-[#E4E7EB] overflow-hidden">
                  <div className="bg-gradient-to-r from-[#00E4FF]/10 to-[#147BFF]/10 p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                          Gestión de Cookies
                        </h3>
                        <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
                          Utilizamos cookies para mejorar tu experiencia en Zynera. Algunas son necesarias para el funcionamiento del sitio, otras nos ayudan a entender cómo usas la web.
                        </p>
                        <button
                          onClick={() => {
                            setCurrentPage("cookies");
                            setShowBanner(false);
                          }}
                          className="text-sm text-[#00E4FF] hover:text-[#147BFF] transition-colors font-medium"
                        >
                          Leer Política de Cookies →
                        </button>
                      </div>
                      <button
                        onClick={() => setShowBanner(false)}
                        className="p-2 hover:bg-white/50 rounded-lg transition-colors flex-shrink-0"
                      >
                        <X className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                      <button
                        onClick={handleRejectAll}
                        className="flex-1 px-6 py-3 bg-white border border-[#E4E7EB] text-gray-700 rounded-lg hover:bg-[#F9FAFB] transition-colors font-medium text-sm"
                      >
                        Rechazar
                      </button>
                      <button
                        onClick={() => setShowSettings(true)}
                        className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
                      >
                        Configurar
                      </button>
                      <button
                        onClick={handleAcceptAll}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-[#00E4FF] to-[#147BFF] text-white rounded-lg hover:shadow-lg hover:shadow-[#00E4FF]/25 transition-all font-medium text-sm"
                      >
                        Aceptar todas
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // Panel de Configuración
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white rounded-2xl shadow-2xl border border-[#E4E7EB] p-6 md:p-8 max-h-[80vh] overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Configuración de Cookies
                    </h3>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>

                  {/* Cookie Options */}
                  <div className="space-y-4 mb-8">
                    {/* Necesarias */}
                    <div className="border border-[#E4E7EB] rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            Cookies Necesarias
                          </h4>
                          <p className="text-sm text-gray-600">
                            Imprescindibles para que el sitio funcione correctamente.
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={consent.necessary}
                          disabled
                          className="w-5 h-5 rounded cursor-not-allowed"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        ✓ Siempre activas
                      </p>
                    </div>

                    {/* Analíticas */}
                    <div className="border border-[#E4E7EB] rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            Cookies Analíticas
                          </h4>
                          <p className="text-sm text-gray-600">
                            Nos ayudan a mejorar el sitio analizando cómo lo utilizas.
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={consent.analytics}
                            onChange={() => toggleCookieType("analytics")}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#00E4FF]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00E4FF]" />
                        </label>
                      </div>
                    </div>

                    {/* Personalización */}
                    <div className="border border-[#E4E7EB] rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            Cookies de Personalización
                          </h4>
                          <p className="text-sm text-gray-600">
                            Permiten recordar tus preferencias y configuración.
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={consent.personalization}
                            onChange={() => toggleCookieType("personalization")}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#00E4FF]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00E4FF]" />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 flex-col sm:flex-row">
                    <button
                      onClick={() => {
                        handleRejectAll();
                        setShowSettings(false);
                      }}
                      className="flex-1 px-6 py-3 bg-white border border-[#E4E7EB] text-gray-700 rounded-lg hover:bg-[#F9FAFB] transition-colors font-medium"
                    >
                      Rechazar todo
                    </button>
                    <button
                      onClick={handleSaveSettings}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-[#00E4FF] to-[#147BFF] text-white rounded-lg hover:shadow-lg hover:shadow-[#00E4FF]/25 transition-all font-medium"
                    >
                      Guardar preferencias
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
