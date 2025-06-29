import React, { useState } from 'react';

import { CustomPicker, CirclePicker, ColorChangeHandler } from 'react-color';
import { HexColorPicker, HexColorInput } from "react-colorful";
import { Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBackgroundContext } from '@/contexts/BackgroundContext';

function SolidColor() {
  const { background, setBackground } = useBackgroundContext();
  const [show, setShow] = useState(false);
  
  const onChangePicker: ColorChangeHandler = (color: any, event: any) => setBackground({...background, solidColor: color.hex});
  const onChangeHex = (solidColor: string) => setBackground({...background, solidColor});

  return (
    <>
      <CirclePicker
        width='100%'
        circleSpacing={6}
        colors={['#EB144C', '#FF7C00', '#FCD600', '#50D175', '#71C7FE', '#7871FE', '#FEA5DD']}
        onChange={onChangePicker}
      />

      <div className="mt-2 w-full rounded-md bg-muted">
        <div className="flex justify-between items-center p-2">
          <div className="relative text-secondary w-23 h-full">
            <i className="absolute left-2 top-1">#</i>
            <HexColorInput
              className="p-1 pl-6 border-none w-full rounded-sm bg-white focus:outline-none"
              color={background.solidColor}
              onChange={onChangeHex}
            />
          </div>
          <button className="rounded-md w-8 h-8" onClick={() => setShow(!show)}>
            <Palette className="mx-auto text-primary"/>
          </button>
        </div>

        <div id="hex-color-picker" className={cn(
          "h-0 overflow-hidden px-2",
          {"h-auto pb-2": show}
        )}>
          <HexColorPicker
            color={background.solidColor}
            onChange={(color) => onChangeHex(color)}
          />
        </div>
      </div>
    </>
  )
}

export default CustomPicker(SolidColor);
