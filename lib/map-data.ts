import type { AccessPoint, MapObject } from "./types"

// Definição dos pontos de acesso Wi-Fi
export const wifiAccessPoints: AccessPoint[] = [
  {
    ssid: "AP_Entrada",
    position: [50, 50],
    mac: "00:11:22:33:44:55",
  },
  {
    ssid: "AP_Corredor1",
    position: [200, 50],
    mac: "00:11:22:33:44:56",
  },
  {
    ssid: "AP_Corredor2",
    position: [350, 50],
    mac: "00:11:22:33:44:57",
  },
  {
    ssid: "AP_Sala1",
    position: [100, 150],
    mac: "00:11:22:33:44:58",
  },
  {
    ssid: "AP_Sala2",
    position: [250, 150],
    mac: "00:11:22:33:44:59",
  },
  {
    ssid: "AP_Sala3",
    position: [400, 150],
    mac: "00:11:22:33:44:60",
  },
  {
    ssid: "AP_Corredor3",
    position: [200, 250],
    mac: "00:11:22:33:44:61",
  },
  {
    ssid: "AP_Saída",
    position: [350, 350],
    mac: "00:11:22:33:44:62",
  },
]

// Definição dos objetos do mapa (paredes, portas, etc)
export const indoorMap: MapObject[] = [
  // Paredes externas
  { type: "wall", x: 0, y: 0, width: 500, height: 10, color: "#333333" }, // Parede superior
  { type: "wall", x: 0, y: 0, width: 10, height: 400, color: "#333333" }, // Parede esquerda
  { type: "wall", x: 490, y: 0, width: 10, height: 400, color: "#333333" }, // Parede direita
  { type: "wall", x: 0, y: 390, width: 500, height: 10, color: "#333333" }, // Parede inferior

  // Paredes internas
  { type: "wall", x: 150, y: 0, width: 10, height: 100, color: "#555555" },
  { type: "wall", x: 300, y: 0, width: 10, height: 100, color: "#555555" },
  { type: "wall", x: 0, y: 100, width: 500, height: 10, color: "#555555" },

  { type: "wall", x: 150, y: 200, width: 10, height: 100, color: "#555555" },
  { type: "wall", x: 300, y: 200, width: 10, height: 100, color: "#555555" },
  { type: "wall", x: 0, y: 200, width: 500, height: 10, color: "#555555" },
  { type: "wall", x: 0, y: 300, width: 500, height: 10, color: "#555555" },

  // Portas
  { type: "door", x: 70, y: 100, width: 30, height: 10 },
  { type: "door", x: 220, y: 100, width: 30, height: 10 },
  { type: "door", x: 370, y: 100, width: 30, height: 10 },

  { type: "door", x: 70, y: 200, width: 30, height: 10 },
  { type: "door", x: 220, y: 200, width: 30, height: 10 },
  { type: "door", x: 370, y: 200, width: 30, height: 10 },

  { type: "door", x: 70, y: 300, width: 30, height: 10 },
  { type: "door", x: 220, y: 300, width: 30, height: 10 },
  { type: "door", x: 370, y: 300, width: 30, height: 10 },

  // Salas
  { type: "room", x: 10, y: 110, width: 140, height: 90, name: "Sala 101" },
  { type: "room", x: 160, y: 110, width: 140, height: 90, name: "Sala 102" },
  { type: "room", x: 310, y: 110, width: 180, height: 90, name: "Sala 103" },

  { type: "room", x: 10, y: 210, width: 140, height: 90, name: "Sala 201" },
  { type: "room", x: 160, y: 210, width: 140, height: 90, name: "Sala 202" },
  { type: "room", x: 310, y: 210, width: 180, height: 90, name: "Sala 203" },

  { type: "room", x: 10, y: 310, width: 140, height: 80, name: "Sala 301" },
  { type: "room", x: 160, y: 310, width: 140, height: 80, name: "Sala 302" },
  { type: "room", x: 310, y: 310, width: 180, height: 80, name: "Sala 303" },
]

// Definição dos pontos da rota (do ponto A ao ponto B)
export const routePoints: [number, number][] = [
  [50, 50], // Ponto de partida (entrada)
  [50, 150], // Corredor
  [85, 150], // Porta da Sala 101
  [85, 120], // Dentro da Sala 101
  [85, 150], // Volta para o corredor
  [150, 150], // Corredor
  [200, 150], // Corredor
  [235, 150], // Porta da Sala 102
  [235, 120], // Dentro da Sala 102
  [235, 150], // Volta para o corredor
  [300, 150], // Corredor
  [350, 150], // Corredor
  [385, 150], // Porta da Sala 103
  [385, 120], // Dentro da Sala 103
  [385, 150], // Volta para o corredor
  [385, 200], // Corredor
  [385, 250], // Corredor
  [385, 300], // Corredor
  [385, 350], // Ponto de chegada (saída)
  [350, 350], // Destino final
]
