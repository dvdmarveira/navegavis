"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verifica se já está em modo standalone (já instalado)
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    if (isStandalone) {
      return; // PWA já está instalada
    }

    // Salva o evento beforeinstallprompt para uso posterior
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Redireciona para a página de instalação manual se não temos o prompt
      window.location.href = "/install-pwa.html";
      return;
    }

    // Mostra o prompt de instalação
    deferredPrompt.prompt();

    // Espera o usuário responder ao prompt
    const choiceResult = await deferredPrompt.userChoice;

    // Usuário aceitou a instalação
    if (choiceResult.outcome === "accepted") {
      console.log("Usuário aceitou instalar o PWA");
    } else {
      console.log("Usuário recusou instalar o PWA");
    }

    // Limpa o prompt salvo, ele só pode ser usado uma vez
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const dismissPrompt = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-blue-600 text-white z-50 flex items-center justify-between">
      <div>
        <p className="font-medium">Instale o NavegaVis em seu dispositivo</p>
        <p className="text-sm opacity-90">Acesse mais rápido e use offline</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="text-blue-600 bg-white hover:bg-blue-50"
          onClick={handleInstallClick}
        >
          Instalar
        </Button>
        <Button
          variant="ghost"
          className="text-white hover:bg-blue-700"
          size="icon"
          onClick={dismissPrompt}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Fechar</span>
        </Button>
      </div>
    </div>
  );
}
