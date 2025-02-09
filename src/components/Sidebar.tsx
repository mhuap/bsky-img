// import Spinner from 'react-bootstrap/Spinner';
import CustomSwitch from "./CustomSwitch";
import Subsection from './Subsection';
import { PropsWithChildren } from 'react';
import { CardProperty } from '@/util/enums';
import { useCardContext } from '@/contexts/CardContext';

interface SidebarProps {
  onGenerate: (e: any) => void,
  // TODO: ^ e = HTML event prevent default
  // onSwitchImageCrop: () => void,
  solid: boolean,
  genLoading: boolean
};

function Sidebar({
  onGenerate,
  solid,
  genLoading,
  children
} : PropsWithChildren<SidebarProps>) {
  const { card, setCard } = useCardContext();
  
  const toggleCardSetting = (property: CardProperty) => {
    switch (property) {
      case CardProperty.Rounded:
        setCard({
          ...card,
          rounded: !card.rounded
        })
        break;
      case CardProperty.Border:
        setCard({
          ...card,
          border: !card.border
        })
        break;
      case CardProperty.WhiteBg:
        setCard({
          ...card,
          whiteBg: !card.whiteBg
        })
        break;
      case CardProperty.Shadow:
        setCard({
          ...card,
          shadow: !card.shadow
        })
        break;
      default:
        throw Error("Unknown card setting toggled: ", property);
    }
  }

  return (
    <div className="w-full md:w-1/3">
      <label className='section-label text-foreground'>Customization</label>
      <Subsection title='Tweet card'>
        <CustomSwitch
          label="Rounded corners"
          switchId='corner-switch'
          onChange={() => toggleCardSetting(CardProperty.Rounded)}
          defaultChecked
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
        Generate
        {genLoading && <p>Loading...</p>}
      </button>

    </div>
  )
}

export default Sidebar;
