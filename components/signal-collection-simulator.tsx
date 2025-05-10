"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollectionMap } from "./collection-map";
import { SignalReadings } from "./signal-readings";
import { CollectionPoints } from "./collection-points";
import { generateRandomSignals } from "@/lib/signal-utils";
import { useToast } from "@/hooks/use-toast";
import { Download, MapPin, Wifi } from "lucide-react";
import { indoorMap } from "@/lib/map-data";
import { useIsMobile } from "@/hooks/use-mobile";

// Tipos para os dados coletados
export interface WifiSignal {
  ssid: string;
  rssi: number;
}

export interface CollectionPoint {
  x: number;
  y: number;
  timestamp: string;
  redes: WifiSignal[];
}

export default function SignalCollectionSimulator() {
  const [collectionPoints, setCollectionPoints] = useState<CollectionPoint[]>(
    []
  );
  const [currentPoint, setCurrentPoint] = useState<CollectionPoint | null>(
    null
  );
  const [isCollecting, setIsCollecting] = useState(false);
  const [mapSize, setMapSize] = useState({ width: 500, height: 400 });
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Referência para o elemento de download
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  // Função para coletar sinais em um ponto específico do mapa
  const collectSignals = (x: number, y: number) => {
    if (isCollecting) return;

    setIsCollecting(true);

    // Simular um pequeno atraso para dar a sensação de coleta
    setTimeout(() => {
      const timestamp = new Date().toISOString();
      const redes = generateRandomSignals(x, y);

      const newPoint: CollectionPoint = {
        x,
        y,
        timestamp,
        redes,
      };

      setCurrentPoint(newPoint);
      setCollectionPoints((prev) => [...prev, newPoint]);

      toast({
        title: "Sinais coletados",
        description: `${
          redes.length
        } redes Wi-Fi detectadas no ponto (${Math.round(x)}, ${Math.round(y)})`,
        variant: "success",
      });

      setIsCollecting(false);
    }, 800);
  };

  // Função para limpar todos os pontos coletados
  const clearAllPoints = () => {
    if (
      window.confirm("Tem certeza que deseja limpar todos os pontos coletados?")
    ) {
      setCollectionPoints([]);
      setCurrentPoint(null);
      toast({
        title: "Dados limpos",
        description: "Todos os pontos de coleta foram removidos",
      });
    }
  };

  // Função para exportar os dados coletados como JSON
  const exportData = () => {
    if (collectionPoints.length === 0) {
      toast({
        title: "Nenhum dado para exportar",
        description: "Colete alguns pontos antes de exportar",
        variant: "destructive",
      });
      return;
    }

    const dataStr = JSON.stringify(
      {
        ambiente: "Simulação NavegaVis",
        data_coleta: new Date().toISOString(),
        total_pontos: collectionPoints.length,
        pontos: collectionPoints,
      },
      null,
      2
    );

    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);

    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = `navegavis_mapeamento_${new Date()
        .toISOString()
        .slice(0, 10)}.json`;
      downloadLinkRef.current.click();
    }

    toast({
      title: "Dados exportados",
      description: `${collectionPoints.length} pontos salvos com sucesso`,
      variant: "success",
    });
  };

  return (
    <div className="space-y-6">
      {/* Exibir leituras de sinais no topo em dispositivos móveis */}
      {isMobile && currentPoint && (
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-primary" />
              Último Ponto Coletado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SignalReadings point={currentPoint} />
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col lg:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Mapa de Coleta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 text-sm text-muted-foreground">
              Clique em qualquer ponto do mapa para coletar sinais Wi-Fi naquela
              localização.
            </div>
            <CollectionMap
              mapData={indoorMap}
              collectionPoints={collectionPoints}
              currentPoint={currentPoint}
              onPointClick={collectSignals}
              isCollecting={isCollecting}
              setMapSize={setMapSize}
            />
            <div className="mt-4 flex flex-wrap gap-2 justify-between items-center">
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <Button
                  onClick={clearAllPoints}
                  variant="outline"
                  disabled={collectionPoints.length === 0 || isCollecting}
                  className="flex-1 sm:flex-auto"
                >
                  Limpar Pontos
                </Button>
                <Button
                  onClick={exportData}
                  disabled={collectionPoints.length === 0 || isCollecting}
                  className="flex items-center gap-2 flex-1 sm:flex-auto"
                >
                  <Download className="h-4 w-4" />
                  Exportar
                </Button>
                <a ref={downloadLinkRef} className="hidden" />
              </div>
              <div className="text-sm text-muted-foreground w-full sm:w-auto text-center sm:text-right mt-2 sm:mt-0">
                {collectionPoints.length}{" "}
                {collectionPoints.length === 1
                  ? "ponto coletado"
                  : "pontos coletados"}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dados detalhados - ocultar em dispositivos móveis */}
        <div
          className={`flex flex-col gap-4 w-full lg:w-96 ${
            isMobile ? "mt-4" : ""
          }`}
        >
          {!isMobile && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-primary" />
                  Leituras de Sinais
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentPoint ? (
                  <SignalReadings point={currentPoint} />
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Clique no mapa para coletar sinais Wi-Fi
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="points">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="points">Pontos Coletados</TabsTrigger>
              <TabsTrigger value="data">Dados JSON</TabsTrigger>
            </TabsList>
            <TabsContent value="points">
              <Card>
                <CardContent className="pt-4 px-2">
                  <CollectionPoints
                    points={collectionPoints}
                    onSelectPoint={setCurrentPoint}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="data">
              <Card>
                <CardContent className="pt-4">
                  <pre className="text-xs bg-muted p-2 rounded-md overflow-auto max-h-[300px]">
                    {JSON.stringify(
                      currentPoint || { mensagem: "Nenhum ponto selecionado" },
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
  );
}
