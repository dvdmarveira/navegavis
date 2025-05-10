// Função para calcular a posição com base nas leituras RSSI
export function calculatePosition(
  rssiReadings: Record<string, number>,
  accessPoints: { ssid: string; position: [number, number]; mac: string }[],
): [number, number] {
  // Implementação simplificada de triangulação
  // Em um sistema real, usaríamos algoritmos mais complexos como trilateração
  // ou fingerprinting com machine learning

  let totalWeight = 0
  let weightedX = 0
  let weightedY = 0

  // Para cada ponto de acesso detectado
  Object.entries(rssiReadings).forEach(([ssid, rssi]) => {
    // Encontrar o ponto de acesso correspondente
    const ap = accessPoints.find((point) => point.ssid === ssid)
    if (!ap) return

    // Calcular peso baseado na força do sinal
    // Quanto mais forte o sinal, maior o peso
    const weight = Math.pow(10, (rssi + 100) / 20) // Normalizar para valores positivos

    // Acumular coordenadas ponderadas
    weightedX += ap.position[0] * weight
    weightedY += ap.position[1] * weight
    totalWeight += weight
  })

  // Se nenhum ponto de acesso foi detectado, retornar posição padrão
  if (totalWeight === 0) return [0, 0]

  // Calcular média ponderada das coordenadas
  return [Math.round(weightedX / totalWeight), Math.round(weightedY / totalWeight)]
}

// Função para verificar se a posição atual está na rota planejada
export function isOnRoute(position: [number, number], routePoints: [number, number][], threshold = 15): boolean {
  // Verificar se a posição está próxima de algum ponto da rota
  for (const point of routePoints) {
    const distance = Math.sqrt(Math.pow(position[0] - point[0], 2) + Math.pow(position[1] - point[1], 2))

    if (distance <= threshold) {
      return true
    }
  }

  // Verificar se a posição está próxima de algum segmento da rota
  for (let i = 0; i < routePoints.length - 1; i++) {
    const pointA = routePoints[i]
    const pointB = routePoints[i + 1]

    // Calcular distância do ponto ao segmento de reta
    const distance = distanceToSegment(position, pointA, pointB)

    if (distance <= threshold) {
      return true
    }
  }

  return false
}

// Função auxiliar para calcular a distância de um ponto a um segmento de reta
function distanceToSegment(point: [number, number], lineStart: [number, number], lineEnd: [number, number]): number {
  const [x, y] = point
  const [x1, y1] = lineStart
  const [x2, y2] = lineEnd

  const A = x - x1
  const B = y - y1
  const C = x2 - x1
  const D = y2 - y1

  const dot = A * C + B * D
  const lenSq = C * C + D * D

  // Se o segmento for um ponto
  if (lenSq === 0) return Math.sqrt(A * A + B * B)

  let param = dot / lenSq

  // Encontrar o ponto mais próximo no segmento
  if (param < 0) param = 0
  else if (param > 1) param = 1

  const xx = x1 + param * C
  const yy = y1 + param * D

  const dx = x - xx
  const dy = y - yy

  return Math.sqrt(dx * dx + dy * dy)
}

// Função para gerar comandos de navegação
export function getNavigationCommand(
  currentPosition: [number, number],
  nextWaypoint: [number, number] | null,
  previousPosition: [number, number] | null,
): string {
  // Se chegou ao destino
  if (!nextWaypoint) {
    return "Você chegou ao seu destino."
  }

  // Se não tiver posição anterior, apenas seguir em frente
  if (!previousPosition) {
    return "Você está no caminho certo. Dê cerca de 10 passos para frente."
  }

  // Calcular ângulos
  const currentAngle = Math.atan2(currentPosition[1] - previousPosition[1], currentPosition[0] - previousPosition[0])

  const targetAngle = Math.atan2(nextWaypoint[1] - currentPosition[1], nextWaypoint[0] - currentPosition[0])

  // Calcular diferença de ângulo (em radianos)
  let angleDiff = targetAngle - currentAngle

  // Normalizar para [-PI, PI]
  while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI
  while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI

  // Converter para graus
  const angleDiffDegrees = angleDiff * (180 / Math.PI)

  // Gerar comando com base no ângulo
  if (Math.abs(angleDiffDegrees) < 10) {
    return "Você está no caminho certo. Dê cerca de 10 passos para frente."
  } else if (angleDiffDegrees >= 10 && angleDiffDegrees < 45) {
    return "Vire um pouco à direita e continue caminhando."
  } else if (angleDiffDegrees >= 45 && angleDiffDegrees < 135) {
    return "Vire à direita e siga em frente."
  } else if (angleDiffDegrees >= 135) {
    return "Dê uma volta completa para a direita e continue."
  } else if (angleDiffDegrees <= -10 && angleDiffDegrees > -45) {
    return "Vire um pouco à esquerda e continue caminhando."
  } else if (angleDiffDegrees <= -45 && angleDiffDegrees > -135) {
    return "Vire à esquerda e siga em frente."
  } else if (angleDiffDegrees <= -135) {
    return "Dê uma volta completa para a esquerda e continue."
  }

  // Comando padrão
  return "Você está no caminho certo. Dê cerca de 10 passos para frente."
}
