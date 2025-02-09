import { CardSettings } from "@/components/Result";
import { createContext, useContext } from "react";

export interface CardContextType {
  card: CardSettings,
  setCard: (c: CardSettings) => void
}

export const CardContext = createContext<CardContextType | undefined>(undefined);

export function useCardContext() {
  const cardContext = useContext(CardContext);
  if (cardContext === undefined){
    throw new Error("No CardContext provider found");
  }
  return cardContext;
};