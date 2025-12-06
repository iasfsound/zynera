import { ArrowLeft } from "lucide-react";

export function TermsAndConditions({ setCurrentPage }: { setCurrentPage: (page: "home" | "privacy" | "terms" | "legal" | "cookies") => void }) {
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
            Términos y Condiciones
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
            <p className="text-gray-700 leading-relaxed">
              Los presentes Términos y Condiciones regulan el acceso y uso de los servicios ofrecidos por Zynera, empresa dedicada a la automatización de procesos, implementación de soluciones basadas en Inteligencia Artificial, desarrollo de chatbots, consultoría tecnológica y mantenimiento de sistemas.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Al contratar cualquiera de nuestros servicios, el cliente acepta expresamente estas condiciones.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. SERVICIOS OFRECIDOS
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Zynera ofrece, entre otros, los siguientes servicios:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Automatización de procesos con IA</li>
              <li>Desarrollo y configuración de chatbots (WhatsApp, web u otros canales)</li>
              <li>Creación de asistentes internos basados en IA y datos del cliente</li>
              <li>Generación automática de contenido (texto, emails, publicaciones…)</li>
              <li>Consultoría estratégica en IA y automatización</li>
              <li>Planes de mantenimiento y soporte (Zynera Care)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Cada servicio incluye su propia descripción, alcance y limitaciones dentro de la propuesta comercial aceptada por el cliente.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. ALCANCE DEL SERVICIO
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3 font-semibold">
              Zynera se compromete a:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Analizar las necesidades del cliente</li>
              <li>Diseñar e implementar la solución acordada</li>
              <li>Realizar pruebas básicas de funcionamiento</li>
              <li>Entregar documentación interna cuando proceda</li>
              <li>Ofrecer soporte limitado según el plan contratado</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-3 font-semibold">
              El cliente es responsable de:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Proporcionar acceso a sus herramientas, plataformas o bases de datos</li>
              <li>Facilitar información precisa y actualizada</li>
              <li>Garantizar que dispone de los derechos necesarios sobre los datos que comparte</li>
              <li>Mantener sus cuentas (Google, WhatsApp, OpenAI, Make, etc.) en estado activo</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. RESPONSABILIDAD SOBRE PLATAFORMAS DE TERCEROS
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Zynera integra automatizaciones y sistemas en plataformas externas como Make, Google Workspace, OpenAI, WhatsApp Business API, Slack, Airtable, entre otras.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3 font-semibold">
              El cliente reconoce que:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>El funcionamiento de dichas plataformas depende exclusivamente de sus proveedores</li>
              <li>Las políticas, limitaciones o caídas de servicios externos no son responsabilidad de Zynera</li>
              <li>Algunos servicios requieren suscripciones adicionales del cliente</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-3 font-semibold">
              Zynera no se hace responsable por:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Cambios en APIs externas</li>
              <li>Caídas de servidores terceros</li>
              <li>Limitaciones de uso o bloqueos provenientes de Meta, Google, OpenAI u otros</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. TARIFAS Y FORMA DE PAGO
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Las tarifas se indicarán en cada propuesta individual.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3 font-semibold">
              El pago se realizará según las condiciones pactadas:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>50% al inicio del proyecto</li>
              <li>50% a la entrega final (salvo que se acuerde otro sistema)</li>
              <li>Los planes mensuales se abonan por adelantado</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Los precios no incluyen impuestos, salvo que se indique lo contrario.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. MODIFICACIONES Y ALCANCE ADICIONAL
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Las modificaciones no contempladas en la propuesta inicial serán consideradas trabajos adicionales y presupuestadas por separado.
            </p>
            <p className="text-gray-700 leading-relaxed">
              El cliente podrá solicitar ampliaciones, actualizaciones o nuevos desarrollos, pero estos no están cubiertos por el servicio original ni por el soporte básico.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. CONFIDENCIALIDAD Y PROTECCIÓN DE DATOS
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3 font-semibold">
              Zynera se compromete a:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Mantener la confidencialidad de la información del cliente</li>
              <li>No divulgar datos a terceros</li>
              <li>Adoptar medidas razonables de seguridad</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-3 font-semibold">
              El cliente declara que:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Cumple con la normativa de protección de datos aplicable</li>
              <li>Tiene derecho a utilizar y procesar la información que aporta</li>
              <li>Autoriza a Zynera a usar sus datos con el único fin de prestar el servicio contratado</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Zynera no almacena información de clientes finales salvo para propósitos técnicos o cuando el cliente lo solicite expresamente.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. LIMITACIÓN DE RESPONSABILIDAD
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3 font-semibold">
              Zynera no será responsable de:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Pérdidas económicas derivadas del uso de automatizaciones</li>
              <li>Fallos causados por cambios de terceros en APIs o servicios</li>
              <li>Uso indebido de las herramientas por parte del cliente</li>
              <li>Resultados derivados de contenido generado por IA</li>
              <li>Errores provocados por configuraciones externas o accesos incorrectos del cliente</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              En ningún caso Zynera será responsable por daños indirectos, lucro cesante o pérdida de datos.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. PROPIEDAD INTELECTUAL
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Todos los desarrollos entregados al cliente serán de su propiedad final, salvo componentes propiedad de terceros (APIs, modelos de IA, plantillas, librerías, etc.), cuyo licenciamiento se regirá por sus proveedores.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Zynera podrá conservar copias internas del trabajo a efectos de documentación y portafolio, salvo acuerdo en contrario.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. SOPORTE Y MANTENIMIENTO
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              El soporte posterior a la entrega incluye únicamente lo especificado en la propuesta o en el plan Zynera Care.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Modificaciones, mejoras o consultoría adicional no están cubiertas salvo contratación de un plan mensual o paquete adicional.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. CANCELACIONES Y REEMBOLSOS
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Una vez iniciado un proyecto, no se realizarán reembolsos.</li>
              <li>Si el cliente cancela el proyecto tras el inicio, deberá abonar el trabajo realizado hasta la fecha.</li>
              <li>Los planes mensuales pueden cancelarse con preaviso de 15 días antes de la próxima renovación.</li>
            </ul>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              12. LEY APLICABLE
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Los presentes términos se regirán por la legislación española.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Cualquier controversia será sometida a los tribunales de la ciudad de residencia del prestador del servicio, salvo que la ley indique lo contrario.
            </p>
          </section>

          {/* Contact */}
          <section className="mt-12 p-6 bg-gradient-to-r from-[#00E4FF]/10 to-[#147BFF]/10 rounded-lg border border-[#00E4FF]/20">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contacto</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              Para cualquier duda sobre estos términos y condiciones, contáctanos:
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
