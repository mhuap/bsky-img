export enum BgMode {
  Solid,
  Gradient,
  Image
}

const blackFilter = `linear-gradient(
  rgba(0, 0, 0, 0.7),
  rgba(0, 0, 0, 0.7)
), `
const whiteFilter = `linear-gradient(
  rgba(255, 255, 255, 0.85),
  rgba(255, 255, 255, 0.85)
), `

export enum ImgFilter {
  Default = "default",
  Dark = blackFilter,
  Light = whiteFilter
}

export enum CardProperty {
  Rounded = "rounded",
  Border = "border",
  WhiteBg = "whiteBg",
  Shadow = "shadow"
}