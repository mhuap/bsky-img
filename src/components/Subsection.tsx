import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface SubsectionProps {
  title: string,
  grow?: boolean
}

export default function Subsection({
  title,
  grow,
  children
} : PropsWithChildren<SubsectionProps>) {
  return (
    <div className={cn(
      "mb-6 text-secondary gap-1 flex flex-col",
      {"grow": grow}
    )}>
      <p className='text-xs tracking-wide'>{title}</p>
      {children}
    </div>
  )
}
