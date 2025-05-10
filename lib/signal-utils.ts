import type { WifiSignal } from "@/components/signal-collection-simulator"

// Lista de SSIDs possíveis para simulação
const possibleSSIDs = [
  "Loja_101",
  "Loja_102",
  "Loja_103",
  "Corridor_WIFI",
  "FoodCourt_FreeNet",
  "Admin_Network",
  "Guest_WiFi",
  "Security_Net",
  "Mall_Public",
  "Staff_Only",
  "Maintenance_AP",
  "Emergency_Network",
  "Parking_WiFi",
  "Restaurant_Zone",
  "VIP_Lounge",
]

// Função para gerar sinais Wi-Fi aleatórios com base na posição
export function generateRandomSignals(x: number, y: number): WifiSignal[] {
  // Determinar quantas redes serão detectadas (entre 2 e 6)
  const networkCount = Math.floor(Math.random() * 5) + 2

  // Criar um conjunto para evitar SSIDs duplicados
  const selectedSSIDs = new Set<string>()

  // Selecionar SSIDs aleatórios
  while (selectedSSIDs.size < networkCount) {
    const randomIndex = Math.floor(Math.random() * possibleSSIDs.length)
    selectedSSIDs.add(possibleSSIDs[randomIndex])
  }

  // Gerar sinais para cada SSID selecionado
  return Array.from(selectedSSIDs).map((ssid) => {
    // Calcular RSSI com base na posição (para simular que redes têm força diferente em pontos diferentes)
    // Usamos o hash do SSID + coordenadas para ter consistência para o mesmo ponto
    const hash = simpleHash(ssid + x.toString() + y.toString())

    // Base RSSI entre -50 e -85
    const baseRSSI = -50 - (hash % 35)

    // Adicionar um pouco de variação aleatória (-3 a +3)
    const variation = Math.floor(Math.random() * 7) - 3

    return {
      ssid,
      rssi: baseRSSI + variation,
    }
  })
}

// Função de hash simples para gerar valores consistentes
function simpleHash(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Converter para inteiro de 32 bits
  }
  return Math.abs(hash)
}
