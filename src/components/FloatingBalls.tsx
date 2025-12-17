import { useEffect, useRef } from "react";
import { useLowMotion } from "../hooks/useLowMotion";

interface Ball {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
  vx: number;
  vy: number;
}

export function FloatingBalls() {
  const lowMotion = useLowMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: -1000, y: -1000 }); // Inicializar fuera del canvas
  const ballsRef = useRef<Ball[]>([]);
  const animationFrameRef = useRef<number>();

  // Colores del tema
  const colors = [
    'rgba(0, 228, 255, 0.4)', // #00E4FF
    'rgba(20, 123, 255, 0.4)', // #147BFF
    'rgba(0, 228, 255, 0.2)',
    'rgba(20, 123, 255, 0.2)',
  ];

  useEffect(() => {
    // Desactivar completamente en móvil / reduced motion
    if (lowMotion) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajustar tamaño del canvas al viewport completo
    const getCanvasSize = () => {
      // Usar el viewport completo para asegurar que cubra toda la pantalla
      return { width: window.innerWidth, height: window.innerHeight };
    };

    const getBallCount = (width: number) => {
      if (width < 640) return 4;      // móviles (mucho menos)
      if (width < 1024) return 10;    // tablets
      return 18;                      // desktop
    };

    const resizeCanvas = () => {
      const { width, height } = getCanvasSize();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const initBalls = () => {
      const { width, height } = getCanvasSize();
      const ballCount = getBallCount(width);
      const balls: Ball[] = [];

      for (let i = 0; i < ballCount; i++) {
        balls.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 40 + 14, // Tamaño menor para móvil/rendimiento
          speed: Math.random() * 0.4 + 0.15,
          opacity: Math.random() * 0.45 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 0.35,
          vy: -Math.random() * 0.4 - 0.15,
        });
      }
      ballsRef.current = balls;
    };
    
    // Inicializar después de que el DOM esté listo
    const initialize = () => {
      resizeCanvas();
      const { width, height } = getCanvasSize();
      
      // Solo inicializar si tenemos un tamaño válido
      if (width > 0 && height > 0) {
        initBalls();
        // Iniciar animación
        animate();
      } else {
        // Reintentar si el tamaño aún no está disponible
        requestAnimationFrame(initialize);
      }
    };

    // Esperar un frame para asegurar que el DOM esté listo
    requestAnimationFrame(initialize);

    const handleResize = () => {
      resizeCanvas();
      initBalls();
    };
    window.addEventListener('resize', handleResize);

    // Manejar movimiento del mouse relativo al canvas (usando ref para evitar re-renders)
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Función de animación
    const animate = () => {
      const { width, height } = getCanvasSize();
      ctx.clearRect(0, 0, width, height);

      const balls = ballsRef.current;
      const mouseRadius = 150; // Radio de influencia del cursor
      const mousePos = mousePosRef.current;
      
      balls.forEach((ball) => {
        // Calcular distancia al cursor
        const dx = mousePos.x - ball.x;
        const dy = mousePos.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Interacción con el cursor: las bolas se alejan cuando el cursor se acerca
        if (distance < mouseRadius && distance > 0) {
          const force = (mouseRadius - distance) / mouseRadius;
          // Ángulo opuesto (alejándose del cursor)
          const angle = Math.atan2(dy, dx) + Math.PI; // +Math.PI invierte la dirección
          ball.vx += Math.cos(angle) * force * 0.12;
          ball.vy += Math.sin(angle) * force * 0.12;
        }

        // Movimiento natural hacia arriba
        ball.vy -= ball.speed * 0.01;

        // Actualizar posición
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Aplicar fricción
        ball.vx *= 0.98;
        ball.vy *= 0.98;

        // Reaparecer abajo cuando salen por arriba
        if (ball.y + ball.size < 0) {
          ball.y = height + ball.size;
          ball.x = Math.random() * width;
          ball.vx = (Math.random() - 0.5) * 0.5;
          ball.vy = -Math.random() * 0.5 - 0.2;
        }

        // Mantener las bolas dentro de los límites horizontales
        if (ball.x < -ball.size) {
          ball.x = width + ball.size;
        } else if (ball.x > width + ball.size) {
          ball.x = -ball.size;
        }

        // Dibujar la bola
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
        
        // Gradiente radial para efecto de brillo
        const gradient = ctx.createRadialGradient(
          ball.x - ball.size * 0.3,
          ball.y - ball.size * 0.3,
          0,
          ball.x,
          ball.y,
          ball.size
        );
        gradient.addColorStop(0, ball.color.replace('0.4', '0.6').replace('0.2', '0.4'));
        gradient.addColorStop(1, ball.color.replace('0.6', '0').replace('0.4', '0'));

        ctx.fillStyle = gradient;
        ctx.fill();

        // Borde sutil
        ctx.strokeStyle = ball.color.replace('0.4', '0.3').replace('0.2', '0.15');
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [lowMotion]);

  if (lowMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent', width: '100vw', height: '100vh' }}
    />
  );
}

