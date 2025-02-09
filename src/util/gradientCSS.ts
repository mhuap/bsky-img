export function swatchCSS(gradient: { start: string, end: string }) {
  const { start, end } = gradient;
  return `linear-gradient(to right, ${start}, ${end})`;
};

export function bgCSS(gradient: { start: string, end: string }) {
  const { start, end } = gradient;
  return `linear-gradient(to bottom right, ${start}, ${end})`;
};