// import Spinner from 'react-bootstrap/Spinner';
import CustomSwitch from "./CustomSwitch";
import Subsection from './Subsection';
import { PropsWithChildren } from 'react';
import { BgMode, CardProperty } from '@/util/enums';
import { useCardContext } from '@/contexts/CardContext';
import { useBackgroundContext } from "@/contexts/BackgroundContext";

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

  const solid = background.mode != BgMode.Gradient;
  
  const toggleCardSetting = (property: CardProperty) => setCard({
    ...card,
    [property]: !card[property]
  });

  return (
    <div className="w-full md:w-1/3">
      <label className='section-label'>Customization</label>
      <Subsection title='Tweet card'>
        <CustomSwitch
          label="Rounded corners"
          switchId='corner-switch'
          onChange={() => toggleCardSetting(CardProperty.Rounded)}
          defaultChecked
          disabled={!card.whiteBg && !card.border && !card.shadow}
        />

        <CustomSwitch
          label="Border"
          switchId='border-switch'
          onChange={() => toggleCardSetting(CardProperty.Border)}
        />

        <CustomSwitch
          label="White background"
          switchId='background-switch'
          onChange={() => toggleCardSetting(CardProperty.WhiteBg)}
          checked={solid ? card.whiteBg : true}
          disabled={!solid}
        />

        <CustomSwitch
          label="Shadow"
          switchId='shadow-switch'
          onChange={() => toggleCardSetting(CardProperty.Shadow)}
          defaultChecked
        />

        {/* <CustomSwitch
          label="Image crop"
          switchId='crop-switch'
          onChange={onSwitchImageCrop}
          disabled={!props.imageCropDisabled}
        /> */}
      </Subsection>

      <Subsection title="Background">
        {children}
      </Subsection>
      
      <button className="w-full h-11 bg-primary rounded-md px-4 text-white tracking-wide hover:bg-primary-dark" onClick={onGenerate}>
        {genLoading ? <p>Loading...</p> : "Generate"}
      </button>

    </div>
  )
}

export default Sidebar;
