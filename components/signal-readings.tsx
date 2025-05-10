import { WifiOff } from "lucide-react"
import type { CollectionPoint } from "./signal-collection-simulator"

interface SignalReadingsProps {
  point: CollectionPoint
}

export function SignalReadings({ point }: SignalReadingsProps) {
  // Função para determinar a força do sinal
  const getSignalStrength = (rssi: number): { label: string; color: string } => {
    if (rssi > -50) return { label: "Excelente", color: "bg-green-500" }
    if (rssi > -60) return { label: "Bom", color: "bg-green-400" }
    if (rssi > -70) return { label: "Médio", color: "bg-yellow-500" }
    if (rssi > -80) return { label: "Fraco", color: "bg-orange-500" }
    return { label: "Muito fraco", color: "bg-red-500" }
  }

  // Ordenar redes por força de sinal (do mais forte para o mais fraco)
  const sortedNetworks = [...point.redes].sort((a, b) => b.rssi - a.rssi)

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Redes Wi-Fi detectadas ({sortedNetworks.length})</h3>
        <div className="text-xs text-muted-foreground">
          Ponto: ({Math.round(point.x)}, {Math.round(point.y)})
        </div>
      </div>

      {sortedNetworks.length === 0 ? (
        <div className="flex items-center justify-center p-4 text-muted-foreground">
          <WifiOff className="mr-2 h-4 w-4" />
          <span>Nenhuma rede detectada</span>
        </div>
      ) : (
        <ul className="space-y-2">
          {sortedNetworks.map((network) => {
            const strength = getSignalStrength(network.rssi)
            const signalBars = Math.max(1, Math.min(4, Math.floor((network.rssi + 90) / 15)))

            return (
              <li key={network.ssid} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                <div className="flex items-center gap-2">
                  <div className="flex items-end h-4 gap-[2px]">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-sm ${i < signalBars ? strength.color : "bg-muted-foreground/30"}`}
                        style={{ height: `${(i + 1) * 25}%` }}
                      />
                    ))}
                  </div>
                  <span className="font-medium text-sm">{network.ssid}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{network.rssi} dBm</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${strength.color} text-white`}>{strength.label}</span>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
