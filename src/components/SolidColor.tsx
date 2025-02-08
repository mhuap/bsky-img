import React, { useState } from 'react';

import { CustomPicker, CirclePicker, ColorChangeHandler } from 'react-color';
import { HexColorPicker, HexColorInput } from "react-colorful";
import { Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
// import { IoColorPaletteSharp } from "react-icons/io5";

function SolidColor({
  onChange,
  onChangeHex,
  hex
} : {
  onChange: ColorChangeHandler,
  onChangeHex: (color: string) => void,
  hex: string
}) {
  const [show, setShow] = useState(false);

  return (
    <>
      <CirclePicker
        width='100%'
        circleSpacing={6}
        colors={['#EB144C', '#FF7C00', '#FCD600', '#50D175', '#71C7FE', '#7871FE', '#FEA5DD']}
        onChange={onChange}
      />

      <div className="mt-2 w-full rounded-md bg-muted">
        {/* id="custom-color" */}
        <div className="flex justify-between items-center p-2">
          {/* id='top-button' */}
          <div className="relative text-secondary w-23 h-full">
            {/* id='inputgroup' */}
            <HexColorInput
              className="p-1 pl-6 border-none w-full rounded-sm bg-white focus:outline-none"
              color={hex}
              onChange={onChangeHex}
            />
            <i className="absolute left-2 top-1">#</i>
          </div>
          <button className="rounded-md w-8 h-8" onClick={() => setShow(!show)}>
            <Palette className="mx-auto text-primary"/>
          </button>
        </div>

        <div id="hex-color-picker" className={cn(
          "h-0 overflow-hidden px-2",
          {"h-auto pb-2": show}
        )}>
          {/* popover */}
          <HexColorPicker color={hex}
          onChange={(color) => {
            console.log("changing input")
            onChangeHex(color);
          }}/>
        </div>
      </div>
    </>
  )
}

export default CustomPicker(SolidColor);
