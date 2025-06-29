import { useBackgroundContext } from "@/contexts/BackgroundContext";
import { cn } from "@/lib/utils";

export const GRADIENTS = {
  g1: {start: '#00FF8F', end: '#60EFFF'},
  g2: {start: '#0061ff', end: '#60EFFF'},
  g3: {start: '#00ddff', end: '#e81cff'},
  g4: {start: '#ff930f', end: '#fff95b'},
  g5: {start: '#ff0f7b', end: '#f89b29'},
  g6: {start: '#BD19ED', end: '#ff0f7b'},
  g7: {start: '#fed1c7', end: '#fe8dc6'},
  g8: {start: '#7f00ff', end: '#E75BFF'}
};

export type GradientKey = keyof typeof GRADIENTS;

export default function GradientSwatch({
  id,
  css
} : {
  id: GradientKey,
  css: string
}) {
  const { background, setBackground } = useBackgroundContext();
  const isSelected = background.gradientId === id;

  const handleGradientChange = (e: any) => {
    const gId: GradientKey = e.target.value;
    setBackground({
      ...background,
      gradientId: gId
    });
  }

  return (
    <div>
      <input id={id} type='radio'
        value={id}
        checked={isSelected}
        onChange={handleGradientChange}
        className="hidden"
      />
      <label tabIndex={0}
        htmlFor={id}
        style={{background: css}}
        className={cn(
          "block h-7 w-14 rounded-sm cursor-pointer",
          {"shadow-[inset_rgba(0,0,0,0.4)_0px_0px_4px_2px]": isSelected}
        )}
      />
    </div>
  )
}
