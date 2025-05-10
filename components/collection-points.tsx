"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import type { CollectionPoint } from "./signal-collection-simulator"

interface CollectionPointsProps {
  points: CollectionPoint[]
  onSelectPoint: (point: CollectionPoint) => void
}

export function CollectionPoints({ points, onSelectPoint }: CollectionPointsProps) {
  if (points.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">Nenhum ponto coletado ainda</div>
  }

  // Formatar data e hora
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="space-y-2">
        {points.map((point, index) => (
          <div
            key={point.timestamp}
            className="p-2 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
            onClick={() => onSelectPoint(point)}
          >
            <div className="flex justify-between items-center">
              <div className="font-medium">Ponto #{index + 1}</div>
              <div className="text-xs text-muted-foreground">{formatTimestamp(point.timestamp)}</div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Coordenadas: ({Math.round(point.x)}, {Math.round(point.y)})
            </div>
            <div className="text-xs mt-1">
              <span className="text-primary">{point.redes.length}</span> redes detectadas
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
