import { ImgFilter } from "@/util/enums";

export default function Radio({
  label,
  onClick,
  defaultChecked
}:{
  label: string,
  onClick: () => void,
  defaultChecked: boolean
}) {
  
  return (
    <label className="flex items-center">
      <input type='radio' name={"img-filter"}
        className="mr-1"
        onClick={onClick}
        defaultChecked={defaultChecked}
      />
      {label}
    </label>
  )
}
