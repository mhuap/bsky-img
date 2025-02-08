import { ChangeEvent, useState } from 'react';

// import { BiImageAdd, BiTrash, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Trash2 } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SolidColor from "./SolidColor";
import GradientColor from "./GradientColor";
import PhotoUpload from './PhotoUpload';
import { ColorChangeHandler } from 'react-color';
import { ImgFilter } from '@/util/enums';
import { useCardContext } from '@/contexts/CardContext';

function BackgroundPicker({
  onClickTrash,
  onClickAddImage,
  fileName,
  // colorMode,
  setColorMode,
  handleGradientChange,
  gradient,
  setImgFilter,
  imgFilter,
  onChange,
  setBgColor,
  hex,
  // PHOTOUPLOAD
  onFileChange,
  show,
  onHide,
  useImageURL,
  imageUrl,
  setImageUrl,
  // unsplashPhotoClick
} : {
  onClickTrash: () => void,
  onClickAddImage: () => void,
  fileName: string | undefined,
  // colorMode: number,
  setColorMode: (c: number) => void,
  handleGradientChange: (e: any) => void,
  // TODO: ^ e = HTML event prevent default
  gradient: string,
  setImgFilter: (f: ImgFilter) => void,
  imgFilter: string,
  onChange: ColorChangeHandler,
  setBgColor: (color: string) => void,
  hex: string,
  // PHOTO UPLOAD
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void,
  show: boolean,
  onHide: () => void,
  useImageURL: (e: any) => void,
  imageUrl: string,
  setImageUrl: (i: string) => void,
  // unsplashPhotoClick
}) {

  const { card, setCard } = useCardContext();
  
  let imageButton;

  if (fileName) {
    imageButton = <>
    <div className="w-full flex items-center justify-between h-11">
      <div className="rounded-l-md border-2 border-input border-r-0 p-2 overflow-ellipsis overflow-hidden whitespace-nowrap grow">{fileName}</div>
      <button className="text-white bg-danger w-11 p-2 rounded-r-md h-full" onClick={onClickTrash}>
        <Trash2 className="mx-auto"/>
      </button>
    </div>
    <div className="flex flex-col ml-1">
    {/* id='dark-light-radio' */}
      <label><input type='radio' name='dark-light' onClick={() => setImgFilter(ImgFilter.Default)} defaultChecked={imgFilter === ImgFilter.Default}/>Default</label>
      <label><input type='radio' name='dark-light' onClick={() => {setImgFilter(ImgFilter.Dark); setCard({...card, whiteBg: false}); setCard({...card, shadow: false});}} defaultChecked={imgFilter === ImgFilter.Dark}/>Dark</label>
      <label><input type='radio' name='dark-light' onClick={() => {setImgFilter(ImgFilter.Light); setCard({...card, whiteBg: false}); setCard({...card, shadow: false});}} defaultChecked={imgFilter === ImgFilter.Light}/>Light</label>
    </div>
    </>;
  } else {
    imageButton = <>
      <PhotoUpload
        show={show}
        onHide={onHide}
        onFileChange={onFileChange}
        useImageURL={useImageURL}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        onClickAddImage={onClickAddImage}
        // unsplashPhotoClick={unsplashPhotoClick}
      />
    </>
  }

  return (
    <Tabs defaultValue="solid">
      <TabsList>
        <TabsTrigger value="solid" onClick={() => {setCard({...card, whiteBg: true}); setColorMode(0);}}>Solid</TabsTrigger>
        <TabsTrigger value="gradient" onClick={() => {setCard({...card, whiteBg: true}); setColorMode(1);}}>Gradient</TabsTrigger>
        <TabsTrigger value="image" onClick={() => {setCard({...card, whiteBg: true}); setColorMode(2); setImgFilter(ImgFilter.Default);}}>Image</TabsTrigger>
      </TabsList>
      <TabsContent value="solid">
        <SolidColor hex={hex} onChange={onChange} onChangeHex={setBgColor}/>
      </TabsContent>
      <TabsContent value="gradient">
        <GradientColor handleGradientChange={handleGradientChange} gradient={gradient}/>
      </TabsContent>
      <TabsContent value="image">{imageButton}</TabsContent>
    </Tabs>
  )
}


export default BackgroundPicker;
