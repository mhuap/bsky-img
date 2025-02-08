import Form from 'react-bootstrap/Form';
// import Spinner from 'react-bootstrap/Spinner';
import CustomSwitch from "./CustomSwitch";
import Subsection from './Subsection';
import { PropsWithChildren } from 'react';

interface SidebarProps {
  onGenerate: (e: any) => void,
  // TODO: ^ e = HTML event prevent default
  onSwitchRounded: () => void,
  onSwitchBorder: () => void,
  onSwitchBoxBackground: () => void,
  onSwitchShadow: () => void,
  // onSwitchImageCrop: () => void,
  solid: boolean,
  boxBackground: boolean,
  genLoading: boolean
};

function Sidebar({
  onGenerate,
  onSwitchRounded,
  onSwitchBorder,
  onSwitchBoxBackground,
  onSwitchShadow,
  solid,
  boxBackground,
  genLoading,
  children
} : PropsWithChildren<SidebarProps>) {
  return (
    <div className="w-full md:w-1/3">
      <label className='section-label text-foreground'>Customization</label>
      <Subsection title='Tweet card'>
        <CustomSwitch
          label="Rounded corners"
          switchId='corner-switch'
          onChange={onSwitchRounded}
          defaultChecked
        />

        <CustomSwitch
          label="Border"
          switchId='border-switch'
          onChange={onSwitchBorder}
        />

        <CustomSwitch
          label="White background"
          switchId='background-switch'
          onChange={onSwitchBoxBackground}
          checked={solid ? boxBackground : true}
          disabled={!solid}
        />

        <CustomSwitch
          label="Shadow"
          switchId='shadow-switch'
          onChange={onSwitchShadow}
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
