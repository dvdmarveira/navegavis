export interface AccessPoint {
  ssid: string
  position: [number, number]
  mac: string
}

export interface MapObject {
  type: "wall" | "door" | "room" | "obstacle"
  x: number
  y: number
  width: number
  height: number
  color?: string
  name?: string
}

export interface NavigationUpdate {
  position: [number, number]
  command: string
  rssiValues: Record<string, number>
  deviationDetected: boolean
}
