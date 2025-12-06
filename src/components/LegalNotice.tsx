import { ArrowLeft } from "lucide-react";

export function LegalNotice({ setCurrentPage }: { setCurrentPage: (page: "home" | "privacy" | "terms" | "legal" | "cookies") => void }) {
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
            Aviso Legal
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
              1. OBJETO
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              El presente Aviso Legal regula el acceso y uso del sitio web zynerapro.com (en adelante, "el Sitio"), cuyo titular es Guillermo Chueca, actuando bajo el nombre comercial Zynera.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Al navegar por este sitio web, el usuario acepta todas las condiciones incluidas en el presente documento.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. IDENTIFICACIÓN DEL TITULAR
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los siguientes datos:
            </p>
            <div className="bg-gradient-to-r from-[#00E4FF]/10 to-[#147BFF]/10 p-6 rounded-lg border border-[#00E4FF]/20 space-y-2">
              <p className="text-gray-700"><strong>Titular:</strong> Guillermo Chueca</p>
              <p className="text-gray-700"><strong>Nombre comercial:</strong> Zynera</p>
              <p className="text-gray-700"><strong>Email:</strong> info@zynerapro.com</p>
              <p className="text-gray-700"><strong>Teléfono:</strong> +34 614 095 478</p>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. CONDICIONES DE USO DEL SITIO WEB
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              El acceso al sitio web es gratuito.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
              El usuario se compromete a:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Usar el sitio web de forma lícita</li>
              <li>No realizar actividades que puedan dañar, sobrecargar o deteriorar el sitio</li>
              <li>No utilizar el Sitio con fines fraudulentos</li>
              <li>No introducir virus ni software dañino</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Zynera podrá limitar o bloquear el acceso a usuarios que incumplan estas condiciones.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. RESPONSABILIDAD DEL TITULAR
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
              Aunque Zynera procura ofrecer información veraz y actualizada, no garantiza:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>La ausencia de errores</li>
              <li>La disponibilidad continua del sitio</li>
              <li>La actualización permanente de los contenidos</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
              Zynera no se hace responsable de:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Daños derivados del uso del sitio</li>
              <li>Fallos técnicos o interrupciones</li>
              <li>Incorrecta interpretación de la información publicada</li>
              <li>Contenidos aportados por terceros</li>
              <li>Caídas o errores generados por proveedores externos</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. SERVICIOS OFRECIDOS
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Zynera ofrece servicios de:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Automatización inteligente de procesos</li>
              <li>Desarrollo de chatbots y asistentes IA</li>
              <li>Implementación de automatizaciones en plataformas externas</li>
              <li>Consultoría tecnológica</li>
              <li>Gestión y soporte técnico</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              El alcance de cada servicio será detallado en la propuesta comercial correspondiente.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. PROPIEDAD INTELECTUAL
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Todos los contenidos del sitio web (textos, imágenes, logotipos, código, diseño, estructura…) están protegidos por la legislación sobre propiedad intelectual e industrial.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Queda prohibida la reproducción, distribución, comunicación pública o transformación sin autorización previa del titular.
            </p>
            <p className="text-gray-700 leading-relaxed">
              El usuario puede visualizar, descargar o imprimir contenidos únicamente para uso personal.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. ENLACES EXTERNOS
            </h2>
            <p className="text-gray-700 leading-relaxed">
              El sitio web puede incluir enlaces hacia páginas externas.
              Zynera no se hace responsable del contenido, disponibilidad o correcto funcionamiento de dichos sitios.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. PROTECCIÓN DE DATOS
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Los datos personales facilitados a través del Sitio serán tratados conforme a nuestra Política de Privacidad, accesible en:
            </p>
            <div className="bg-gradient-to-r from-[#00E4FF]/10 to-[#147BFF]/10 p-4 rounded-lg border border-[#00E4FF]/20 mb-4">
              <p className="text-gray-700">
                👉 <a href="#" className="text-[#00E4FF] hover:text-[#147BFF] transition-colors">Política de Privacidad</a>
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed">
              El usuario es responsable de proporcionar datos veraces y actualizados.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. USO DE COOKIES
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Este sitio web puede utilizar cookies técnicas, analíticas o de personalización.
              Para más información, consulte nuestra Política de Cookies.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. LEGISLACIÓN APLICABLE Y JURISDICCIÓN
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              El presente Aviso Legal se rige por la legislación española.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Para cualquier conflicto o controversia, ambas partes se someten a los juzgados y tribunales competentes según la legislación española, salvo que la ley disponga lo contrario.
            </p>
          </section>

          {/* Contact */}
          <section className="mt-12 p-6 bg-gradient-to-r from-[#00E4FF]/10 to-[#147BFF]/10 rounded-lg border border-[#00E4FF]/20">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contacto</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              Para cualquier duda sobre este Aviso Legal, contáctanos:
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
