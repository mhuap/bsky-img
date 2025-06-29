import { PropsWithChildren } from 'react';

import { useCardContext } from '@/contexts/CardContext';
import { useBackgroundContext } from "@/contexts/BackgroundContext";

// import Spinner from 'react-bootstrap/Spinner';
import CustomSwitch from "./CustomSwitch";
import Subsection from './Subsection';

type CardProperty = "rounded" | "border" | "whiteBg" | "shadow";

interface SidebarProps {
  onGenerate: (e: any) => void,
  // TODO: ^ e = HTML event prevent default
  // onSwitchImageCrop: () => void,
  genLoading: boolean
};

function Sidebar({
  onGenerate,
  genLoading,
  children
} : PropsWithChildren<SidebarProps>) {
  const { card, setCard } = useCardContext();
  const { background } = useBackgroundContext();

  const isGradient = background.mode === "GRADIENT";
  
  const toggleCardSetting = (property: CardProperty) => setCard({
    ...card,
    [property]: !card[property]
  });

  return (
    <div className="w-full md:w-1/3 flex flex-col mb-3">
      <label className='section-label'>Customization</label>
      <Subsection title='Post card'>
        <CustomSwitch
          label="Rounded corners"
          switchId='corner-switch'
          onChange={() => toggleCardSetting("rounded")}
          defaultChecked={card.rounded}
          disabled={!card.whiteBg && !card.border && !card.shadow}
        />

        <CustomSwitch
          label="Border"
          switchId='border-switch'
          onChange={() => toggleCardSetting("border")}
          defaultChecked={card.border}
        />

        <CustomSwitch
          label="White background"
          switchId='background-switch'
          onChange={() => toggleCardSetting("whiteBg")}
          defaultChecked={card.whiteBg}
          checked={isGradient ? true : card.whiteBg}
          disabled={isGradient}
        />

        <CustomSwitch
          label="Shadow"
          switchId='shadow-switch'
          onChange={() => toggleCardSetting("shadow")}
          checked={card.shadow}
          defaultChecked={card.shadow}
        />

        {/* <CustomSwitch
          label="Image crop"
          switchId='crop-switch'
          onChange={onSwitchImageCrop}
          disabled={!props.imageCropDisabled}
        /> */}
      </Subsection>

      <Subsection title="Background" grow>
        {children}
      </Subsection>
      
      <button className="w-full h-11 bg-primary rounded-md px-4 mt-6 text-white tracking-wide hover:bg-primary-dark" onClick={onGenerate}>
        {genLoading ? <p>Loading...</p> : "Generate"}
      </button>

    </div>
  )
}

export default Sidebar;
