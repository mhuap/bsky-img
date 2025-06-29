import { PropsWithChildren, useEffect, useState } from 'react';

import { ImgFilter } from "@/util/enums";
import { BackgroundContext } from '@/contexts/BackgroundContext';
import { CardContext } from '@/contexts/CardContext';
import { GradientKey } from './GradientSwatch';

export interface CardSettings {
  rounded: boolean,
  border: boolean,
	whiteBg: boolean,
	shadow: boolean,
  singleTextColor?: string
}

export interface BackgroundSettings {
  mode: "SOLID" | "GRADIENT" | "IMAGE",
  solidColor: string,
  gradientId: GradientKey,
  bgImg?: ArrayBuffer | string,
  selectedFile?: File | { name: string },
  imgFilter: ImgFilter,
  imgMethod?: "UPLOAD" | "UNSPLASH" | "URL"
}

export default function Providers({
  children
} : PropsWithChildren) {
  const [card, setCard] = useState<CardSettings>({
    rounded: true,
    border: false,
    whiteBg: true,
    shadow: true
  });

  const [background, setBackground] = useState<BackgroundSettings>({
    mode: "SOLID",
    solidColor: "#E1E8ED",
    gradientId: "g1",
    imgFilter: ImgFilter.Default,
  });

  useEffect(() => {
    console.log("Provider:", background.solidColor);
  },[background.solidColor])
  
  return (
    <CardContext.Provider value={{card, setCard}}>
      <BackgroundContext.Provider value={{background, setBackground}}>
        {children}
      </BackgroundContext.Provider>
    </CardContext.Provider>
  )
}
