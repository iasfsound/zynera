import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Devuelve true cuando debemos reducir animaciones: usuarios con
 * prefers-reduced-motion o viewport móvil (ancho < 768px).
 */
export function useLowMotion() {
  const [lowMotion, setLowMotion] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mediaReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mediaMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const compute = () => {
      setLowMotion(mediaReduce.matches || mediaMobile.matches);
    };

    mediaReduce.addEventListener("change", compute);
    mediaMobile.addEventListener("change", compute);
    compute();

    return () => {
      mediaReduce.removeEventListener("change", compute);
      mediaMobile.removeEventListener("change", compute);
    };
  }, []);

  return !!lowMotion;
}

