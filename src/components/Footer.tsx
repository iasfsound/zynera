import { Mail } from "lucide-react";
import LogoColor from "../assets/logos/Logo color.png";
import Letras from "../assets/logos/LETRAS.png";

export function Footer({ setCurrentPage }: { setCurrentPage: (page: "home" | "privacy" | "terms" | "legal" | "cookies") => void }) {
  return (
    <footer className="relative z-10 px-6 py-16 bg-white border-t border-[#E4E7EB]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src={LogoColor} 
                alt="Zynera Logo" 
                className="h-10"
              />
              <img 
                src={Letras} 
                alt="Zynera" 
                className="h-8"
              />
            </div>
            <p className="text-gray-600 max-w-sm">
              Automatización inteligente, chatbots avanzados y flujos de trabajo con IA para empresas del futuro.
            </p>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-gray-900 mb-4">Servicios</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-[#00E4FF] transition-colors">
                  Automatización
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#00E4FF] transition-colors">
                  Chatbots IA
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#00E4FF] transition-colors">
                  Asistentes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#00E4FF] transition-colors">
                  Consultoría
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-gray-900 mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@zynerapro.com"
                  className="text-gray-600 hover:text-[#00E4FF] transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  info@zynerapro.com
                </a>
              </li>
              <li>
                <a href="tel:+34614095478" className="text-gray-600 hover:text-[#00E4FF] transition-colors">
                  +34 614 095 478
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#00E4FF] transition-colors">
                  Documentación
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-[#E4E7EB] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © 2025 Zynera. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => {
                setCurrentPage("privacy");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-sm text-gray-600 hover:text-[#00E4FF] transition-colors"
            >
              Privacidad
            </button>
            <button 
              onClick={() => {
                setCurrentPage("legal");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-sm text-gray-600 hover:text-[#00E4FF] transition-colors"
            >
              Aviso Legal
            </button>
            <button 
              onClick={() => {
                setCurrentPage("terms");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-sm text-gray-600 hover:text-[#00E4FF] transition-colors"
            >
              Términos
            </button>
            <a 
              onClick={() => {
                setCurrentPage("cookies");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-sm text-gray-600 hover:text-[#00E4FF] transition-colors cursor-pointer"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
