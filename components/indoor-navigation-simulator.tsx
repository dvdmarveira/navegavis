"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapCanvas } from "./map-canvas";
import { NavigationFeedback } from "./navigation-feedback";
import { WifiSignalList } from "./wifi-signal-list";
import { getNavigationCommand, isOnRoute } from "@/lib/navigation-utils";
import { wifiAccessPoints, indoorMap, routePoints } from "@/lib/map-data";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

export default function IndoorNavigationSimulator() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<[number, number]>([
    50, 50,
  ]);
  const [destinationPosition, setDestinationPosition] = useState<
    [number, number]
  >([350, 350]);
  const [currentCommand, setCurrentCommand] = useState(
    "Aguardando início da navegação"
  );
  const [currentRssi, setCurrentRssi] = useState<Record<string, number>>({});
  const [deviationDetected, setDeviationDetected] = useState(false);
  const [routeProgress, setRouteProgress] = useState(0);
  const [currentRouteIndex, setCurrentRouteIndex] = useState(0);
  const simulationInterval = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Função para iniciar a simulação
  const startSimulation = () => {
    if (isSimulating) return;

    setIsSimulating(true);
    setCurrentPosition(routePoints[0]);
    setCurrentRouteIndex(0);
    setRouteProgress(0);
    setDeviationDetected(false);

    // Simular leituras RSSI iniciais
    updateRssiReadings(routePoints[0]);

    // Emitir comando inicial
    const initialCommand = getNavigationCommand(
      routePoints[0],
      routePoints[1],
      null
    );
    setCurrentCommand(initialCommand);

    // Anunciar início da navegação
    speakCommand("Iniciando navegação. " + initialCommand);

    // Iniciar simulação de movimento
    simulationInterval.current = setInterval(() => {
      setCurrentRouteIndex((prevIndex) => {
        // Se chegou ao destino, parar simulação
        if (prevIndex >= routePoints.length - 1) {
          stopSimulation();
          return prevIndex;
        }

        // Calcular próxima posição na rota
        const nextIndex = prevIndex + 1;
        const nextPosition = routePoints[nextIndex];

        // Atualizar posição atual
        setCurrentPosition(nextPosition);

        // Atualizar leituras RSSI
        updateRssiReadings(nextPosition);

        // Verificar se está na rota
        const onRoute = isOnRoute(nextPosition, routePoints, 20);
        setDeviationDetected(!onRoute);

        // Calcular progresso da rota (0-100%)
        const progress = Math.min(
          100,
          Math.round((nextIndex / (routePoints.length - 1)) * 100)
        );
        setRouteProgress(progress);

        // Gerar comando de navegação
        const prevPosition = routePoints[prevIndex];
        const nextWaypoint =
          nextIndex < routePoints.length - 1
            ? routePoints[nextIndex + 1]
            : null;
        const command = getNavigationCommand(
          nextPosition,
          nextWaypoint,
          prevPosition
        );
        setCurrentCommand(command);

        // Falar comando a cada 2 passos ou se houver desvio
        if (nextIndex % 2 === 0 || !onRoute) {
          speakCommand(command);
        }

        // Se chegou ao destino
        if (nextIndex === routePoints.length - 1) {
          speakCommand("Você chegou ao seu destino.");
          toast({
            title: "Destino alcançado",
            description: "A navegação foi concluída com sucesso.",
            variant: "success",
          });
        }

        return nextIndex;
      });
    }, 2000); // Atualizar a cada 2 segundos
  };

  // Função para parar a simulação
  const stopSimulation = () => {
    if (simulationInterval.current) {
      clearInterval(simulationInterval.current);
      simulationInterval.current = null;
    }
    setIsSimulating(false);
    speakCommand("Navegação finalizada.");
  };

  // Função para simular leituras RSSI com base na posição
  const updateRssiReadings = (position: [number, number]) => {
    const rssiReadings: Record<string, number> = {};

    // Para cada ponto de acesso, calcular RSSI com base na distância
    wifiAccessPoints.forEach((ap) => {
      const dx = position[0] - ap.position[0];
      const dy = position[1] - ap.position[1];
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Modelo simplificado de propagação: RSSI = -40 - 20*log10(d)
      // Com variação aleatória para simular ruído
      const noise = Math.random() * 5 - 2.5; // Ruído de ±2.5 dBm
      const rssi = Math.round(-40 - 20 * Math.log10(distance / 10) + noise);

      // Limitar RSSI entre -30 e -90 dBm
      rssiReadings[ap.ssid] = Math.max(-90, Math.min(-30, rssi));
    });

    setCurrentRssi(rssiReadings);
  };

  // Função para falar comando usando TTS
  const speakCommand = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "pt-BR";
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Limpar intervalo ao desmontar componente
  useEffect(() => {
    return () => {
      if (simulationInterval.current) {
        clearInterval(simulationInterval.current);
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Painel de navegação e feedback */}
      <div className="flex flex-col gap-4">
        {/* Feedback sempre visível no topo em dispositivos móveis */}
        <div className={isMobile ? "order-first" : "hidden"}>
          <NavigationFeedback
            position={currentPosition}
            command={currentCommand}
            deviationDetected={deviationDetected}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Mapa */}
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle>Mapa de Navegação</CardTitle>
            </CardHeader>
            <CardContent>
              <MapCanvas
                mapData={indoorMap}
                wifiPoints={wifiAccessPoints}
                routePoints={routePoints}
                currentPosition={currentPosition}
                destinationPosition={destinationPosition}
                showWifiPoints={true}
              />
              <div className="mt-4 flex flex-wrap justify-between items-center gap-2">
                <Button
                  onClick={isSimulating ? stopSimulation : startSimulation}
                  variant={isSimulating ? "destructive" : "default"}
                  className="w-full sm:w-auto"
                >
                  {isSimulating ? "Parar Simulação" : "Iniciar Simulação"}
                </Button>
                <div className="text-sm w-full sm:w-auto text-center sm:text-right">
                  Progresso: {routeProgress}%
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Controles laterais - apenas visíveis em desktop */}
          <div className="flex flex-col gap-4 w-full md:w-96 md:block">
            <div className="hidden md:block">
              <NavigationFeedback
                position={currentPosition}
                command={currentCommand}
                deviationDetected={deviationDetected}
              />
            </div>

            <Tabs defaultValue="wifi">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="wifi">Sinais Wi-Fi</TabsTrigger>
                <TabsTrigger value="data">Dados JSON</TabsTrigger>
              </TabsList>
              <TabsContent value="wifi">
                <Card>
                  <CardContent className="pt-4">
                    <WifiSignalList rssiValues={currentRssi} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="data">
                <Card>
                  <CardContent className="pt-4">
                    <pre className="text-xs bg-muted p-2 rounded-md overflow-auto max-h-[300px]">
                      {JSON.stringify(
                        {
                          posiçãoAtual: currentPosition,
                          comando: currentCommand,
                          rssiLido: currentRssi,
                          desvioDetectado: deviationDetected,
                        },
                        null,
                        2
                      )}
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
