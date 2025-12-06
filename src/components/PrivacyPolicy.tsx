import { ArrowLeft } from "lucide-react";

export function PrivacyPolicy({ setCurrentPage }: { setCurrentPage: (page: "home" | "privacy" | "terms" | "legal" | "cookies") => void }) {
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
            Política de Privacidad
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
              1. IDENTIDAD DEL RESPONSABLE DEL TRATAMIENTO
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), se informa que los datos personales recopilados a través de este sitio web serán tratados por:
            </p>
            <div className="bg-gradient-to-r from-[#00E4FF]/10 to-[#147BFF]/10 p-6 rounded-lg border border-[#00E4FF]/20 space-y-2">
              <p className="text-gray-700"><strong>Responsable:</strong> Guillermo Chueca</p>
              <p className="text-gray-700"><strong>Nombre comercial:</strong> Zynera</p>
              <p className="text-gray-700"><strong>Email:</strong> info@zynerapro.com</p>
              <p className="text-gray-700"><strong>Finalidad:</strong> Prestación de servicios de automatización, IA, consultoría y atención al usuario.</p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. DATOS QUE SE RECOGEN
            </h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                2.1. Datos proporcionados voluntariamente por el usuario
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                A través de formularios de contacto, presupuestos o reuniones:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Nombre y apellidos</li>
                <li>Email</li>
                <li>Número de teléfono</li>
                <li>Empresa</li>
                <li>Información del proyecto</li>
                <li>Mensajes o consultas enviadas</li>
                <li>Cualquier dato incorporado en la comunicación</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                2.2. Datos recopilados automáticamente
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Al navegar por el sitio web:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Dirección IP</li>
                <li>Datos de dispositivo y navegador</li>
                <li>Cookies</li>
                <li>Páginas visitadas</li>
                <li>Tiempo de navegación</li>
              </ul>
              <p className="text-gray-600 text-sm mt-3 italic">
                (Ver Política de Cookies para más detalle.)
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                2.3. Datos derivados del uso de servicios inteligentes
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Si el usuario interactúa con chatbots, asistentes o automatizaciones:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Mensajes enviados</li>
                <li>Archivos proporcionados voluntariamente</li>
                <li>Preferencias o respuestas del usuario</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. FINALIDAD DEL TRATAMIENTO
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Los datos se tratarán con las siguientes finalidades:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Responder solicitudes de información o contacto</li>
              <li>Gestión y ejecución de proyectos relacionados con automatización, IA o consultoría</li>
              <li>Envío de comunicaciones comerciales (solo si el usuario da consentimiento)</li>
              <li>Mejorar el funcionamiento del sitio web</li>
              <li>Gestión de historial y soporte técnico, especialmente en chatbots o automatizaciones</li>
              <li>Generación de presupuestos automáticos cuando aplique</li>
              <li>Cumplimiento de obligaciones legales</li>
            </ul>
            <p className="text-gray-700 leading-relaxed font-semibold">
              Los datos NO se venden a terceros.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. LEGITIMACIÓN DEL TRATAMIENTO
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              El tratamiento de los datos se basa en:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Consentimiento del usuario al enviar un formulario o contactar por cualquier vía</li>
              <li>Ejecución de una relación contractual o precontractual</li>
              <li>Interés legítimo para mantenimiento, seguridad y mejora de servicios</li>
              <li>Obligación legal en materia fiscal, contable o administrativa</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. CONSERVACIÓN DE LOS DATOS
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Los datos se conservarán:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Mientras dure la relación comercial</li>
              <li>Hasta que el usuario solicite su supresión</li>
              <li>Durante 6 años para cumplimiento legal (facturación)</li>
              <li>Los logs técnicos de automatizaciones y chatbots: máximo 12 meses, salvo necesidad técnica o consentimiento expreso</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. DESTINATARIOS Y TRANSFERENCIAS
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Zynera utiliza plataformas externas para prestar sus servicios, entre ellas:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Make / n8n</li>
              <li>OpenAI / ChatGPT API</li>
              <li>WhatsApp Business API / Meta</li>
              <li>Google Workspace</li>
              <li>Airtable / Notion</li>
              <li>Vercel / GitHub (hosting)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              Estas empresas pueden alojar datos fuera de la UE, pero se adhieren a cláusulas contractuales estándar (SCC) y garantías adecuadas según RGPD.
            </p>
            <p className="text-gray-700 leading-relaxed font-semibold">
              Zynera no cede datos a terceros salvo obligación legal.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. DERECHOS DEL USUARIO
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              El usuario puede ejercer en cualquier momento:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Acceso a sus datos</li>
              <li>Rectificación de datos incorrectos</li>
              <li>Supresión de sus datos (derecho al olvido)</li>
              <li>Limitación del tratamiento</li>
              <li>Portabilidad de datos</li>
              <li>Oposición al tratamiento</li>
            </ul>
            <div className="bg-gradient-to-r from-[#00E4FF]/10 to-[#147BFF]/10 p-6 rounded-lg border border-[#00E4FF]/20">
              <p className="text-gray-700 font-semibold mb-3">Para ejercerlos:</p>
              <p className="text-gray-700 mb-2">📧 Email: info@zynerapro.com</p>
              <p className="text-gray-700">📄 Asunto: "Ejercicio de derechos RGPD"</p>
              <p className="text-gray-600 text-sm mt-3">Responderemos en un máximo de 30 días.</p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. SEGURIDAD DE LOS DATOS
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Zynera aplica medidas técnicas y organizativas para proteger los datos:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Cifrado SSL</li>
              <li>Control de accesos</li>
              <li>Copias de seguridad</li>
              <li>Servidores seguros</li>
              <li>Políticas internas de retención</li>
              <li>No se almacenan contraseñas ni credenciales sin cifrado</li>
            </ul>
            <p className="text-gray-700 leading-relaxed italic">
              Sin embargo, ningún sistema es 100% invulnerable.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. TRATAMIENTO DE DATOS EN WHATSAPP, CHATBOTS Y AUTOMATIZACIONES
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Cuando un usuario escribe a través de:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>WhatsApp</li>
              <li>Formulario integrado con IA</li>
              <li>Chatbot web</li>
              <li>Asistentes inteligentes</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              Sus mensajes pueden ser procesados automáticamente por sistemas de IA y por plataformas externas como OpenAI, Make o Meta.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
              El usuario acepta el tratamiento automatizado de dichos mensajes para:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Responder consultas</li>
              <li>Crear presupuestos</li>
              <li>Realizar acciones solicitadas</li>
              <li>Mejorar el servicio</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              El usuario puede solicitar la eliminación de su historial en cualquier momento.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. MENORES DE EDAD
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
              No se recopilan datos de menores de 14 años.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Si se detecta información de menores, será eliminada de inmediato.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. MODIFICACIÓN DE LA POLÍTICA
            </h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              Zynera puede actualizar esta Política de Privacidad en cualquier momento.
            </p>
            <p className="text-gray-700 leading-relaxed">
              La versión vigente será la publicada en este sitio web.
            </p>
          </section>

          {/* Contact */}
          <section className="mt-12 p-6 bg-gradient-to-r from-[#00E4FF]/10 to-[#147BFF]/10 rounded-lg border border-[#00E4FF]/20">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contacto</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              Para cualquier duda sobre esta Política de Privacidad, contáctanos:
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
