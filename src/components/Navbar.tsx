import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useForm } from "../context/FormContext";
import LogoColor from "../assets/logos/Logo color.png";
import Letras from "../assets/logos/LETRAS.png";

export function Navbar({ setCurrentPage }: { setCurrentPage: (page: "home" | "privacy" | "terms" | "legal" | "cookies") => void }) {
  const { setShowCtaForm } = useForm();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleBeginClick = () => {
    setShowCtaForm(true);
    setCurrentPage("home");
    // Scroll a la sección del CTA
    const ctaSection = document.getElementById("cta-section");
    if (ctaSection) {
      setTimeout(() => {
        ctaSection.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-[#E4E7EB] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => {
              setCurrentPage("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 group"
          >
            <img 
              src={LogoColor} 
              alt="Zynera Logo" 
              className="h-10 transition-transform group-hover:scale-110 animate-spin"
              style={{ animationDuration: '5s' }}
            />
            <div className="flex flex-col">
              <img 
                src={Letras} 
                alt="Zynera" 
                className="h-8"
              />
              <span className="text-xs text-gray-600 -mt-1">By Guillermo Chueca</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("servicios")}
              className="text-gray-700 hover:text-[#00E4FF] transition-colors"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection("proceso")}
              className="text-gray-700 hover:text-[#00E4FF] transition-colors"
            >
              Proceso
            </button>
            <button
              onClick={() => scrollToSection("ventajas")}
              className="text-gray-700 hover:text-[#00E4FF] transition-colors"
            >
              Ventajas
            </button>
            <button
              onClick={() => scrollToSection("testimonios")}
              className="text-gray-700 hover:text-[#00E4FF] transition-colors"
            >
              Testimonios
            </button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button 
              onClick={handleBeginClick}
              className="px-6 py-2.5 bg-gradient-to-r from-[#00E4FF] to-[#147BFF] text-white rounded-lg hover:shadow-lg hover:shadow-[#00E4FF]/25 transition-all hover:scale-105">
              Comenzar
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-[#F6F8FA] border border-[#E4E7EB]"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-700" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-[#E4E7EB] space-y-4">
            <button
              onClick={() => scrollToSection("servicios")}
              className="block w-full text-left text-gray-700 hover:text-[#00E4FF] transition-colors py-2"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection("proceso")}
              className="block w-full text-left text-gray-700 hover:text-[#00E4FF] transition-colors py-2"
            >
              Proceso
            </button>
            <button
              onClick={() => scrollToSection("ventajas")}
              className="block w-full text-left text-gray-700 hover:text-[#00E4FF] transition-colors py-2"
            >
              Ventajas
            </button>
            <button
              onClick={() => scrollToSection("testimonios")}
              className="block w-full text-left text-gray-700 hover:text-[#00E4FF] transition-colors py-2"
            >
              Testimonios
            </button>
            <button 
              onClick={handleBeginClick}
              className="w-full px-6 py-2.5 bg-gradient-to-r from-[#00E4FF] to-[#147BFF] text-white rounded-lg">
              Comenzar
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
