import { ChangeEvent, useState } from 'react';

// import { BiImageAdd, BiTrash, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Trash2 } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SolidColor from "./SolidColor";
import GradientColor from "./GradientColor";
import PhotoUpload from './PhotoUpload';
import { ColorChangeHandler } from 'react-color';

function BackgroundPicker({
  onClickTrash,
  onClickAddImage,
  fileName,
  // colorMode,
  setColorMode,
  handleGradientChange,
  gradient,
  setBoxBackground,
  setBoxShadow,
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
  setBoxBackground: (b: boolean) => void,
  setBoxShadow: (b: boolean) => void,
  setImgFilter: (f: string) => void,
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
      <label><input type='radio' name='dark-light' onClick={() => setImgFilter('default')} defaultChecked={imgFilter === 'default'}/>Default</label>
      <label><input type='radio' name='dark-light' onClick={() => {setImgFilter('dark'); setBoxBackground(false); setBoxShadow(false);}} defaultChecked={imgFilter === 'dark'}/>Dark</label>
      <label><input type='radio' name='dark-light' onClick={() => {setImgFilter('light'); setBoxBackground(false); setBoxShadow(false);}} defaultChecked={imgFilter === 'light'}/>Light</label>
    </div>
    </>;
  } else {
    // onClick={onClickAddImage}
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
    <>
    <Tabs defaultValue="solid">
      <TabsList>
        <TabsTrigger value="solid" onClick={() => {setBoxBackground(true); setColorMode(0);}}>Solid</TabsTrigger>
        <TabsTrigger value="gradient" onClick={() => {setBoxBackground(true); setColorMode(1);}}>Gradient</TabsTrigger>
        <TabsTrigger value="image" onClick={() => {setBoxBackground(true); setColorMode(2); setImgFilter('default');}}>Image</TabsTrigger>
      </TabsList>
      <TabsContent value="solid">
        <SolidColor hex={hex} onChange={onChange} onChangeHex={setBgColor}/>
      </TabsContent>
      <TabsContent value="gradient">
        <GradientColor handleGradientChange={handleGradientChange} gradient={gradient}/>
      </TabsContent>
      <TabsContent value="image">{imageButton}</TabsContent>
    </Tabs>

    {/* <div className='segmented'>
      <input type='radio' name='color-mode' id='solid' defaultChecked={colorMode == 0}/><label
        tabIndex='0'
        className='custom-control-label'
        htmlFor='solid'
        onClick={() => {setBoxBackground(true); setColorMode(0);}}
        onKeyDown={(e) => checkEnter(e, 0)}
        >Solid</label>
      <input type='radio' name='color-mode' id='gradient' defaultChecked={colorMode == 1}/><label
        tabIndex='0'
        className='custom-control-label'
        htmlFor='gradient'
        onClick={() => {setBoxBackground(true); setColorMode(1);}}
        onKeyDown={(e) => checkEnter(e, 1)}
        >Gradient</label>
      <input type='radio' name='color-mode' id='radio-image' defaultChecked={colorMode == 2}/><label
        tabIndex='0'
        className='custom-control-label'
        htmlFor='radio-image'
        onClick={() => {setBoxBackground(true); setColorMode(2); setImgFilter('default');}}
        onKeyDown={(e) => checkEnter(e, 2)}
        >Image</label>
    </div> */}

    {/* {content} */}
    {/* {imageButton} */}

    </>
  )
}


export default BackgroundPicker;
