export function luminosity(color: string) {
  const colorRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color)!;
  const r = parseInt(colorRegex[1], 16)
  const g = parseInt(colorRegex[2], 16)
  const b = parseInt(colorRegex[3], 16)

  return Math.round(r*0.299 + g*0.587 + b*0.114);
}