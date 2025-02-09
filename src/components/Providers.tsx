import { PropsWithChildren } from 'react';

import { BackgroundContext, BackgroundContextType } from '@/contexts/BackgroundContext';
import { CardContext, CardContextType } from '@/contexts/CardContext';

interface ProvidersProps {
  card: CardContextType,
  background: BackgroundContextType
}

export default function Providers({
  card, background, children
} : PropsWithChildren<ProvidersProps>) {
  return (
    <CardContext.Provider value={card}>
      <BackgroundContext.Provider value={background}>
        {children}
      </BackgroundContext.Provider>
    </CardContext.Provider>
  )
}
