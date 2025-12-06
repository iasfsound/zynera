import { ArrowLeft } from "lucide-react";

export function CookiePolicy({ setCurrentPage }: { setCurrentPage: (page: "home" | "privacy" | "terms" | "legal" | "cookies") => void }) {
  const handleBack = () => {
    setCurrentPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-[#00E4FF] hover:text-[#147BFF] transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al inicio
        </button>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Política de Cookies
          </h1>
          <p className="text-gray-600">
            Última actualización: Diciembre 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. ¿QUÉ SON LAS COOKIES?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Las cookies son pequeños archivos que se almacenan en tu dispositivo cuando visitas un sitio web.
              Permiten recordar preferencias, mejorar la navegación y ofrecer funcionalidades personalizadas.
            </p>
            <p className="text-gray-700 leading-relaxed font-semibold">
              Las cookies no dañan tu dispositivo.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. TIPOS DE COOKIES UTILIZADAS EN ESTE SITIO
            </h2>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                2.1. Cookies técnicas o necesarias (imprescindibles)
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3 font-semibold">
                Permiten:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>Navegar por la web</li>
                <li>Mostrar correctamente los contenidos</li>
                <li>Mantener sesiones abiertas</li>
                <li>Gestionar formularios</li>
              </ul>
              <p className="text-gray-700 leading-relaxed text-sm bg-gradient-to-r from-[#00E4FF]/10 to-[#147BFF]/10 p-4 rounded-lg border border-[#00E4FF]/20">
                ℹ️ Estas cookies no requieren consentimiento, según la legislación vigente.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                2.2. Cookies analíticas (requieren consentimiento)
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Solo se activan si el usuario acepta el uso de cookies.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3 font-semibold">
                Se utilizan para medir el uso de la web:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>Google Analytics</li>
                <li>Plausible</li>
                <li>Vercel Analytics</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3 font-semibold">
                Permiten:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Conocer qué páginas se visitan</li>
                <li>Mejorar la experiencia</li>
                <li>Optimizar el sitio</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                Los datos se anonimizan siempre que sea posible.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                2.3. Cookies de personalización
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Permiten recordar:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Idioma</li>
                <li>Preferencias de usuario</li>
                <li>Configuraciones de navegación</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                2.4. Cookies de terceros
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                En Zynera pueden existir integraciones que utilicen cookies externas, como:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>Formularios (Tally, Typeform…)</li>
                <li>Scripts de Make o Webhooks</li>
                <li>CDN de Vercel</li>
                <li>Reproductores incrustados</li>
                <li>Chat widgets</li>
                <li>OpenAI / ChatGPT embebido (si se añade)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Cada proveedor tiene su propia política de cookies.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                2.5. Cookies publicitarias o de marketing
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Actualmente Zynera no utiliza cookies de publicidad.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Si se añadiera Pixel de Facebook, Google Ads u otro sistema, se solicitaría consentimiento explícito.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. ¿CÓMO GESTIONAR O DESACTIVAR LAS COOKIES?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              El usuario puede aceptar o rechazar cookies desde:
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                A) El banner de cookies del sitio
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Con opciones:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Aceptar todas</li>
                <li>Rechazar</li>
                <li>Configurar por categorías</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                B) El navegador (Chrome, Safari, Firefox, Edge…)
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                El usuario puede:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>Bloquear cookies</li>
                <li>Borrar cookies existentes</li>
                <li>Recibir avisos</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3 font-semibold">
                Enlaces útiles:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#00E4FF] hover:text-[#147BFF] transition-colors">Chrome</a></li>
                <li><a href="https://support.mozilla.org/es/kb/Deshabilitar%20cookies" target="_blank" rel="noopener noreferrer" className="text-[#00E4FF] hover:text-[#147BFF] transition-colors">Firefox</a></li>
                <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#00E4FF] hover:text-[#147BFF] transition-colors">Safari</a></li>
                <li><a href="https://support.microsoft.com/es-es/help/4027947" target="_blank" rel="noopener noreferrer" className="text-[#00E4FF] hover:text-[#147BFF] transition-colors">Edge</a></li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. COOKIES UTILIZADAS EN ESTE SITIO
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-[#E4E7EB]">
                <thead className="bg-gradient-to-r from-[#00E4FF]/10 to-[#147BFF]/10">
                  <tr>
                    <th className="border border-[#E4E7EB] p-3 text-left text-sm font-semibold text-gray-900">Cookie</th>
                    <th className="border border-[#E4E7EB] p-3 text-left text-sm font-semibold text-gray-900">Tipo</th>
                    <th className="border border-[#E4E7EB] p-3 text-left text-sm font-semibold text-gray-900">Duración</th>
                    <th className="border border-[#E4E7EB] p-3 text-left text-sm font-semibold text-gray-900">Finalidad</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-[#F9FAFB]">
                    <td className="border border-[#E4E7EB] p-3 text-sm text-gray-700">vercel-cache</td>
                    <td className="border border-[#E4E7EB] p-3 text-sm text-gray-700">Técnica</td>
                    <td className="border border-[#E4E7EB] p-3 text-sm text-gray-700">Sesión</td>
                    <td className="border border-[#E4E7EB] p-3 text-sm text-gray-700">Optimización del rendimiento</td>
                  </tr>
                  <tr className="hover:bg-[#F9FAFB]">
                    <td className="border border-[#E4E7EB] p-3 text-sm text-gray-700">_ga</td>
                    <td className="border border-[#E4E7EB] p-3 text-sm text-gray-700">Analítica</td>
                    <td className="border border-[#E4E7EB] p-3 text-sm text-gray-700">2 años</td>
                    <td className="border border-[#E4E7EB] p-3 text-sm text-gray-700">Google Analytics</td>
                  </tr>
                  <tr className="hover:bg-[#F9FAFB]">
                    <td className="border border-[#E4E7EB] p-3 text-sm text-gray-700">_gid</td>
                    <td className="border border-[#E4E7EB] p-3 text-sm text-gray-700">Analítica</td>
                    <td className="border border-[#E4E7EB] p-3 text-sm text-gray-700">24h</td>
                    <td className="border border-[#E4E7EB] p-3 text-sm text-gray-700">Google Analytics</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. ACEPTACIÓN DE LA POLÍTICA DE COOKIES
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Al continuar navegando por este sitio tras mostrar el banner de cookies, el usuario acepta o rechaza el uso según la opción seleccionada.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. CAMBIOS EN LA POLÍTICA DE COOKIES
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Zynera puede modificar esta política en cualquier momento debido a:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Cambios legales</li>
              <li>Incorporación de nuevas tecnologías</li>
              <li>Implementación de nuevos servicios</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              La versión actualizada estará siempre disponible en esta página.
            </p>
          </section>

          {/* Contact */}
          <section className="mt-12 p-6 bg-gradient-to-r from-[#00E4FF]/10 to-[#147BFF]/10 rounded-lg border border-[#00E4FF]/20">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contacto</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              Para cualquier duda sobre esta Política de Cookies, contáctanos:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>📧 Email: <a href="mailto:info@zynerapro.com" className="text-[#00E4FF] hover:text-[#147BFF] transition-colors">info@zynerapro.com</a></li>
              <li>📱 Teléfono: <a href="tel:+34614095478" className="text-[#00E4FF] hover:text-[#147BFF] transition-colors">+34 614 095 478</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
