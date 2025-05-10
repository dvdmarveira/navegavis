"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import type { MapObject } from "@/lib/types"
import type { CollectionPoint } from "./signal-collection-simulator"
import { Loader2 } from "lucide-react"

interface CollectionMapProps {
  mapData: MapObject[]
  collectionPoints: CollectionPoint[]
  currentPoint: CollectionPoint | null
  onPointClick: (x: number, y: number) => void
  isCollecting: boolean
  setMapSize: (size: { width: number; height: number }) => void
}

export function CollectionMap({
  mapData,
  collectionPoints,
  currentPoint,
  onPointClick,
  isCollecting,
  setMapSize,
}: CollectionMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 400 })

  // Ajustar o tamanho do canvas com base no container
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth
        // Manter proporção 5:4
        const height = Math.floor((width * 4) / 5)
        setCanvasSize({ width, height })
        setMapSize({ width, height })
      }
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)
    return () => window.removeEventListener("resize", updateCanvasSize)
  }, [setMapSize])

  // Renderizar o mapa
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Desenhar objetos do mapa (paredes, portas, etc)
    mapData.forEach((obj) => {
      ctx.fillStyle = obj.color || "#cccccc"
      ctx.strokeStyle = "#333333"
      ctx.lineWidth = 1

      if (obj.type === "wall") {
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height)
        ctx.strokeRect(obj.x, obj.y, obj.width, obj.height)
      } else if (obj.type === "door") {
        ctx.fillStyle = "#8B4513"
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height)
      } else if (obj.type === "room") {
        ctx.fillStyle = "rgba(200, 200, 200, 0.3)"
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height)
        ctx.strokeRect(obj.x, obj.y, obj.width, obj.height)

        // Adicionar texto do nome da sala
        if (obj.name) {
          ctx.fillStyle = "#333333"
          ctx.font = "12px Arial"
          ctx.textAlign = "center"
          ctx.fillText(obj.name, obj.x + obj.width / 2, obj.y + obj.height / 2)
        }
      }
    })

    // Desenhar grid de referência (linhas mais claras)
    ctx.strokeStyle = "rgba(200, 200, 200, 0.5)"
    ctx.lineWidth = 0.5

    // Linhas horizontais a cada 20px
    for (let y = 0; y < canvas.height; y += 20) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Linhas verticais a cada 20px
    for (let x = 0; x < canvas.width; x += 20) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    // Desenhar pontos de coleta
    collectionPoints.forEach((point, index) => {
      const isCurrentPoint = currentPoint && point.x === currentPoint.x && point.y === currentPoint.y

      // Desenhar círculo para o ponto
      ctx.beginPath()
      ctx.arc(point.x, point.y, isCurrentPoint ? 8 : 6, 0, Math.PI * 2)
      ctx.fillStyle = isCurrentPoint ? "rgba(16, 185, 129, 0.8)" : "rgba(59, 130, 246, 0.6)"
      ctx.fill()
      ctx.strokeStyle = isCurrentPoint ? "#10B981" : "#3B82F6"
      ctx.lineWidth = 2
      ctx.stroke()

      // Adicionar número do ponto
      ctx.fillStyle = "#FFFFFF"
      ctx.font = "bold 10px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText((index + 1).toString(), point.x, point.y)
    })
  }, [mapData, collectionPoints, currentPoint, canvasSize])

  // Manipular clique no mapa
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isCollecting) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    onPointClick(x, y)
  }

  return (
    <div ref={containerRef} className="relative w-full border border-border rounded-md bg-background overflow-hidden">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        onClick={handleCanvasClick}
        className={`w-full h-auto ${isCollecting ? "cursor-wait" : "cursor-crosshair"}`}
      />
      {isCollecting && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <div className="bg-white p-3 rounded-full">
            <Loader2 className="h-6 w-6 text-primary animate-spin" />
          </div>
        </div>
      )}
    </div>
  )
}
