import { CircleX, Image, Link } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ColorChangeHandler } from 'react-color';
import { ImgFilter } from '@/util/enums';
import { swatchCSS } from '@/util/gradientCSS';
import { useCardContext } from '@/contexts/CardContext';
import { useBackgroundContext } from '@/contexts/BackgroundContext';

import GradientSwatch, { GRADIENTS, GradientKey } from './GradientSwatch';
import SolidColor from "./SolidColor";
import PhotoUpload from './PhotoUpload';
import UnsplashIcon from "./unsplashIcon.js";
import Radio from './Radio';

function BackgroundPicker() {
  const { card, setCard } = useCardContext();
  const { background, setBackground } = useBackgroundContext();

  const fileName = background.selectedFile?.name;
  
  const onClickTrash = () => {
    setBackground({
      ...background,
      bgImg: undefined,
      selectedFile: undefined,
      imgFilter: ImgFilter.Default,
      imgMethod: undefined
    });
    setCard({
      ...card,
      whiteBg: true
    });
  };

  let icon = null;
  if (fileName && background.imgMethod) {
    switch (background.imgMethod) {
      case "UPLOAD":
        icon = <Image size={16}/>
        break;
      case "URL":
        icon = <Link size={16}/> 
        break;
      case "UNSPLASH":
        icon = <UnsplashIcon /> 
        break;
      default:
        throw new Error("Unknown image background method.");
    }
  }

  return (
    <Tabs defaultValue={background.mode.toLowerCase()}>
      <TabsList>
        <TabsTrigger value="solid" onClick={() => {setCard({...card, whiteBg: true}); setBackground({...background, mode: "SOLID", imgMethod: undefined});}}>Solid</TabsTrigger>
        <TabsTrigger value="gradient" onClick={() => {setCard({...card, whiteBg: true}); setBackground({...background, mode: "GRADIENT", imgMethod: undefined});}}>Gradient</TabsTrigger>
        <TabsTrigger value="image" onClick={() => {setCard({...card, whiteBg: background.imgFilter === ImgFilter.Default, shadow: background.imgFilter === ImgFilter.Default}); setBackground({...background, mode: "IMAGE", imgFilter: background.imgFilter});}}>Image</TabsTrigger>
      </TabsList>
      <TabsContent value="solid">
        <SolidColor />
      </TabsContent>
      <TabsContent value="gradient">
        <div className='flex flex-wrap gap-2'>
          {Object.entries(GRADIENTS).map(
            ([key, value]) => (
              <GradientSwatch
                id={key as GradientKey}
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
            {/* <p className='text-xs tracking-wide mt-2'>Selected image</p> */}
            <div className="w-full flex items-center p-3 bg-muted rounded-md">
              <div>{icon}</div>
              <div className="text-sm overflow-ellipsis overflow-hidden whitespace-nowrap italic grow ml-2 mr-2">
                {fileName}
              </div>
              <button className="" onClick={() => onClickTrash()}>
                <CircleX size={16}/>
              </button>
            </div>
            <p className='text-xs tracking-wide mt-2'>Filters</p>
            <div className="flex flex-col ml-1">
              <Radio
                label="None"
                onClick={() => {setBackground({...background, imgFilter: ImgFilter.Default}); setCard({...card, whiteBg: true})}}
                defaultChecked={background.imgFilter === ImgFilter.Default}
              />
              <Radio
                label="Dark"
                onClick={() => {setBackground({...background, imgFilter: ImgFilter.Dark}); setCard({...card, whiteBg: false, shadow: false});}}
                defaultChecked={background.imgFilter === ImgFilter.Dark}
              />
              <Radio
                label="Light"
                onClick={() => {setBackground({...background, imgFilter: ImgFilter.Light}); setCard({...card, whiteBg: false, shadow: false});}}
                defaultChecked={background.imgFilter === ImgFilter.Light}
              />
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
