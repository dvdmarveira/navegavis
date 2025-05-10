import { Badge } from "@/components/ui/badge"
import { WifiOff } from "lucide-react"

interface WifiSignalListProps {
  rssiValues: Record<string, number>
}

export function WifiSignalList({ rssiValues }: WifiSignalListProps) {
  // Função para determinar a força do sinal
  const getSignalStrength = (rssi: number): { label: string; color: string } => {
    if (rssi > -50) return { label: "Excelente", color: "bg-green-500" }
    if (rssi > -60) return { label: "Bom", color: "bg-green-400" }
    if (rssi > -70) return { label: "Médio", color: "bg-yellow-500" }
    if (rssi > -80) return { label: "Fraco", color: "bg-orange-500" }
    return { label: "Muito fraco", color: "bg-red-500" }
  }

  // Ordenar redes por força de sinal (do mais forte para o mais fraco)
  const sortedNetworks = Object.entries(rssiValues).sort(([, rssiA], [, rssiB]) => rssiB - rssiA)

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Redes Wi-Fi detectadas ({sortedNetworks.length})</h3>

      {sortedNetworks.length === 0 ? (
        <div className="flex items-center justify-center p-4 text-muted-foreground">
          <WifiOff className="mr-2 h-4 w-4" />
          <span>Nenhuma rede detectada</span>
        </div>
      ) : (
        <ul className="space-y-2">
          {sortedNetworks.map(([ssid, rssi]) => {
            const strength = getSignalStrength(rssi)
            const signalBars = Math.max(1, Math.min(4, Math.floor((rssi + 90) / 15)))

            return (
              <li key={ssid} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
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
                  <span className="font-medium">{ssid}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{rssi} dBm</span>
                  <Badge variant="outline" className={`text-xs ${strength.color} text-white`}>
                    {strength.label}
                  </Badge>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
