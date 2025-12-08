import { useRef, useState, MouseEvent } from "react";
import { ArrowRight } from "lucide-react";

interface AnimatedGradientButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  showArrow?: boolean;
}

export function AnimatedGradientButton({
  onClick,
  children = "Comenzar",
  className = "",
  size = "md",
  showArrow = true,
}: AnimatedGradientButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    // Volver a la posición central cuando el cursor sale
    setMousePosition({ x: 50, y: 50 });
  };

  const sizeClasses = {
    sm: "px-6 py-2.5 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-10 py-5 text-lg",
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative ${sizeClasses[size]} bg-gradient-to-r from-[#00E4FF] to-[#147BFF] text-white rounded-xl overflow-hidden transition-all hover:shadow-lg hover:shadow-[#00E4FF]/25 hover:scale-105 ${className}`}
    >
      {/* Degradado animado de fondo (animación continua) */}
      <div 
        className="absolute inset-0 opacity-100"
        style={{
          background: "linear-gradient(90deg, #00E4FF, #147BFF, #00E4FF)",
          backgroundSize: "200% 100%",
          animation: "gradientShift 3s ease infinite",
        }}
      />
      
      {/* Degradado que sigue el cursor */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          background: `radial-gradient(circle 200px at ${mousePosition.x}% ${mousePosition.y}%, rgba(20, 123, 255, 1), rgba(0, 228, 255, 0.6), transparent 70%)`,
        }}
      />
      
      {/* Contenido del botón */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        {showArrow && (
          <ArrowRight className={`transition-transform group-hover:translate-x-1 ${
            size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6"
          }`} />
        )}
      </span>

      {/* Estilos CSS para la animación del degradado */}
      <style>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </button>
  );
}

