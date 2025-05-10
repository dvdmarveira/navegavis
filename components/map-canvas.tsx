"use client";

import { useEffect, useRef, useState } from "react";
import type { AccessPoint, MapObject } from "@/lib/types";
import { useIsMobile } from "@/hooks/use-mobile";

interface MapCanvasProps {
  mapData: MapObject[];
  wifiPoints: AccessPoint[];
  routePoints: [number, number][];
  currentPosition: [number, number];
  destinationPosition: [number, number];
  showWifiPoints: boolean;
}

export function MapCanvas({
  mapData,
  wifiPoints,
  routePoints,
  currentPosition,
  destinationPosition,
  showWifiPoints,
}: MapCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 400 });
  const isMobile = useIsMobile();

  // Ajustar o tamanho do canvas com base no contêiner pai
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        // Manter a proporção original (500:400)
        const aspectRatio = 400 / 500;
        const newHeight = containerWidth * aspectRatio;

        setCanvasSize({
          width: containerWidth,
          height: newHeight,
        });
      }
    };

    // Atualizar inicialmente e em caso de redimensionamento
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ajustar o canvas para o tamanho atual
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    // Calcular a escala para ajustar os objetos à nova dimensão do canvas
    const scaleX = canvasSize.width / 500;
    const scaleY = canvasSize.height / 400;

    // Ajustar o contexto com a escala correta
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(scaleX, scaleY);

    // Desenhar objetos do mapa (paredes, portas, etc)
    mapData.forEach((obj) => {
      ctx.fillStyle = obj.color || "#cccccc";
      ctx.strokeStyle = "#333333";
      ctx.lineWidth = 1;

      if (obj.type === "wall") {
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
      } else if (obj.type === "door") {
        ctx.fillStyle = "#8B4513";
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
      } else if (obj.type === "room") {
        ctx.fillStyle = "rgba(200, 200, 200, 0.3)";
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);

        // Adicionar texto do nome da sala
        if (obj.name) {
          ctx.fillStyle = "#333333";
          ctx.font = `${isMobile ? "10px" : "12px"} Arial`;
          ctx.textAlign = "center";
          ctx.fillText(obj.name, obj.x + obj.width / 2, obj.y + obj.height / 2);
        }
      }
    });

    // Desenhar pontos de acesso Wi-Fi
    if (showWifiPoints) {
      wifiPoints.forEach((ap) => {
        ctx.beginPath();
        ctx.arc(ap.position[0], ap.position[1], 5, 0, Math.PI * 2);
        ctx.fillStyle = "#3B82F6";
        ctx.fill();

        // Desenhar círculos de alcance (simplificado)
        ctx.beginPath();
        ctx.arc(ap.position[0], ap.position[1], 50, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(59, 130, 246, 0.3)";
        ctx.stroke();

        // Nome do ponto de acesso
        ctx.fillStyle = "#1E3A8A";
        ctx.font = `${isMobile ? "8px" : "10px"} Arial`;
        ctx.textAlign = "center";
        ctx.fillText(ap.ssid, ap.position[0], ap.position[1] - 10);
      });
    }

    // Desenhar rota
    if (routePoints.length > 1) {
      ctx.beginPath();
      ctx.moveTo(routePoints[0][0], routePoints[0][1]);

      for (let i = 1; i < routePoints.length; i++) {
        ctx.lineTo(routePoints[i][0], routePoints[i][1]);
      }

      ctx.strokeStyle = "rgba(16, 185, 129, 0.7)";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Desenhar pontos da rota
      routePoints.forEach((point, index) => {
        if (index === 0 || index === routePoints.length - 1) return; // Pular origem e destino

        ctx.beginPath();
        ctx.arc(point[0], point[1], 3, 0, Math.PI * 2);
        ctx.fillStyle = "#10B981";
        ctx.fill();
      });
    }

    // Desenhar ponto de origem (A)
    ctx.beginPath();
    ctx.arc(routePoints[0][0], routePoints[0][1], 8, 0, Math.PI * 2);
    ctx.fillStyle = "#1E3A8A";
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = `bold ${isMobile ? "9px" : "10px"} Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("A", routePoints[0][0], routePoints[0][1]);

    // Desenhar ponto de destino (B)
    ctx.beginPath();
    ctx.arc(destinationPosition[0], destinationPosition[1], 8, 0, Math.PI * 2);
    ctx.fillStyle = "#EF4444";
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = `bold ${isMobile ? "9px" : "10px"} Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("B", destinationPosition[0], destinationPosition[1]);

    // Desenhar posição atual
    ctx.beginPath();
    ctx.arc(currentPosition[0], currentPosition[1], 10, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(239, 68, 68, 0.7)";
    ctx.fill();
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Desenhar direção (seta simples)
    if (routePoints.length > 1) {
      // Encontrar o próximo ponto da rota
      let nextPointIndex = 0;
      for (let i = 0; i < routePoints.length - 1; i++) {
        if (
          currentPosition[0] === routePoints[i][0] &&
          currentPosition[1] === routePoints[i][1]
        ) {
          nextPointIndex = i + 1;
          break;
        }
      }

      if (nextPointIndex < routePoints.length) {
        const nextPoint = routePoints[nextPointIndex];
        const angle = Math.atan2(
          nextPoint[1] - currentPosition[1],
          nextPoint[0] - currentPosition[0]
        );

        // Desenhar seta de direção
        ctx.beginPath();
        ctx.moveTo(
          currentPosition[0] + 15 * Math.cos(angle),
          currentPosition[1] + 15 * Math.sin(angle)
        );
        ctx.lineTo(
          currentPosition[0] + 8 * Math.cos(angle + Math.PI * 0.8),
          currentPosition[1] + 8 * Math.sin(angle + Math.PI * 0.8)
        );
        ctx.lineTo(
          currentPosition[0] + 8 * Math.cos(angle - Math.PI * 0.8),
          currentPosition[1] + 8 * Math.sin(angle - Math.PI * 0.8)
        );
        ctx.closePath();
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
      }
    }

    // Restaurar contexto para voltar à escala normal
    ctx.restore();
  }, [
    mapData,
    wifiPoints,
    routePoints,
    currentPosition,
    destinationPosition,
    showWifiPoints,
    canvasSize,
    isMobile,
  ]);

  return (
    <div ref={containerRef} className="w-full">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="w-full h-auto border border-border rounded-md bg-background"
      />
    </div>
  );
}
