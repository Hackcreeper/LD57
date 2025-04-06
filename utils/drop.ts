const DropRadius = 120
const RandomRadius = 40

export const getDropCoordinates = (centerX: number, centerY: number): { x: number, y: number } => {
  const r = DropRadius + RandomRadius * Math.random()
  const theta = 2 * Math.PI * Math.random()

  return {
    x: centerX + r * Math.cos(theta),
    y: centerY + r * Math.sin(theta),
  }
}
