import { Trash2 } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ColorChangeHandler } from 'react-color';
import { BgMode, ImgFilter } from '@/util/enums';
import { swatchCSS } from '@/util/gradientCSS';
import { useCardContext } from '@/contexts/CardContext';
import { useBackgroundContext } from '@/contexts/BackgroundContext';

import GradientSwatch, { GRADIENTS } from './GradientSwatch';
import SolidColor from "./SolidColor";
import PhotoUpload from './PhotoUpload';

function BackgroundPicker() {
  const { card, setCard } = useCardContext();
  const { background, setBackground } = useBackgroundContext();

  const onColorChange = (color: any, event: any) => setBackground({...background, solidColor: color.hex});
  const fileName = background.selectedFile?.name;
  
  const onClickTrash = () => setBackground({
    ...background,
    bgImg: null,
    selectedFile: null,
    imgFilter: ImgFilter.Default
  });

  return (
    <Tabs defaultValue="solid">
      <TabsList>
        <TabsTrigger value="solid" onClick={() => {setCard({...card, whiteBg: true}); setBackground({...background, mode: BgMode.Solid});}}>Solid</TabsTrigger>
        <TabsTrigger value="gradient" onClick={() => {setCard({...card, whiteBg: true}); setBackground({...background, mode: BgMode.Gradient});}}>Gradient</TabsTrigger>
        <TabsTrigger value="image" onClick={() => {setCard({...card, whiteBg: true}); setBackground({...background, mode: BgMode.Image, imgFilter: ImgFilter.Default});}}>Image</TabsTrigger>
      </TabsList>
      <TabsContent value="solid">
        <SolidColor hex={background.solidColor} onChange={onColorChange} onChangeHex={(solidColor) => setBackground({...background, solidColor})}/>
      </TabsContent>
      <TabsContent value="gradient">
        <div className='flex flex-wrap gap-2'>
          {Object.entries(GRADIENTS).map(
            ([key, value]) => (
              <GradientSwatch
                id={key}
                key={key}
                css={swatchCSS(value)}
              />
            )
          )}
        </div>
      </TabsContent>
      <TabsContent value="image">
        {fileName ? (
          // if file selected, show file name and image filter options
          <>
            <div className="w-full flex items-center justify-between h-11">
              <div className="rounded-l-md border-2 border-input border-r-0 p-2 overflow-ellipsis overflow-hidden whitespace-nowrap grow">{fileName}</div>
              <button className="text-white bg-danger w-11 p-2 rounded-r-md h-full" onClick={onClickTrash}>
                <Trash2 className="mx-auto"/>
              </button>
            </div>
            <div className="flex flex-col ml-1">
            {/* id='dark-light-radio' */}
              <label><input type='radio' name='dark-light' onClick={() => setBackground({...background, imgFilter: ImgFilter.Default})} defaultChecked={background.imgFilter === ImgFilter.Default}/>Default</label>
              <label><input type='radio' name='dark-light' onClick={() => {setBackground({...background, imgFilter: ImgFilter.Dark}); setCard({...card, whiteBg: false, shadow: false});}} defaultChecked={background.imgFilter === ImgFilter.Dark}/>Dark</label>
              <label><input type='radio' name='dark-light' onClick={() => {setBackground({...background, imgFilter: ImgFilter.Light}); setCard({...card, whiteBg: false, shadow: false});}} defaultChecked={background.imgFilter === ImgFilter.Light}/>Light</label>
            </div>
          </>
        ) : (
          <PhotoUpload />
          // unsplashPhotoClick={unsplashPhotoClick}/>
        )}
      </TabsContent>
    </Tabs>
  )
}


export default BackgroundPicker;
