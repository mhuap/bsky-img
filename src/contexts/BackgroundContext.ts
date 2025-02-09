import { BackgroundSettings } from "@/components/Result";
import { createContext, useContext } from "react";

export interface BackgroundContextType {
  background: BackgroundSettings,
  setBackground: (b: BackgroundSettings) => void
}

export const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export function useBackgroundContext() {
  const bgContext = useContext(BackgroundContext);
  if (bgContext === undefined) {
    throw new Error("No BackgroundContext provider found");
  }
  return bgContext;
}