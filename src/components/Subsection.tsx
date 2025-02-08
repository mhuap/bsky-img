import { PropsWithChildren } from "react";

interface SubsectionProps {
  title: string
}

export default function Subsection({
  title,
  children
} : PropsWithChildren<SubsectionProps>) {
  return (
    <div className="mb-6 text-secondary gap-1 flex flex-col">
      <p className='text-xs tracking-wide'>{title}</p>
      {children}
    </div>
  )
}
