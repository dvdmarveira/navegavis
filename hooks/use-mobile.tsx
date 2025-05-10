"use client";

import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    // Inicialmente definir com base no tamanho da janela
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // Use a API matchMedia com tratamento de fallback
    const updateSize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Adicionar listeners para resize
    window.addEventListener("resize", updateSize);

    // Verificar se matchMedia é suportado
    if (typeof window.matchMedia === "function") {
      try {
        const mql = window.matchMedia(
          `(max-width: ${MOBILE_BREAKPOINT - 1}px)`
        );

        // Usar addEventListener se disponível (mais moderno)
        if (mql.addEventListener) {
          mql.addEventListener("change", updateSize);
          return () => {
            mql.removeEventListener("change", updateSize);
            window.removeEventListener("resize", updateSize);
          };
        }
        // Fallback para o método mais antigo
        else if (mql.addListener) {
          mql.addListener(updateSize);
          return () => {
            mql.removeListener(updateSize);
            window.removeEventListener("resize", updateSize);
          };
        }
      } catch (e) {
        console.warn("Error setting up matchMedia listener:", e);
      }
    }

    // Fallback apenas com resize event
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  // Retorna false durante a renderização no servidor (SSR)
  // e o valor real uma vez que o efeito é executado no cliente
  return isMobile === null ? false : isMobile;
}
