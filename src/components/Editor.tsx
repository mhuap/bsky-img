import React, { useState }from "react";
// import { scroller } from 'react-scroll';

import PostDTO from "@/app/api/bsky/PostDTO";
import { AspectRatio } from "./ui/aspect-ratio";
import { BgMode, ImgFilter } from "@/util/enums";
import { luminosity } from "@/util/luminosity";
import { bgCSS } from "@/util/gradientCSS";

import Providers from "./Providers";
import Tweet from './Tweet';
import BackgroundPicker from './BackgroundPicker';
import Sidebar from './Sidebar';
import { GRADIENTS } from "./GradientSwatch";

export interface CardSettings {
  rounded: boolean,
  border: boolean,
	whiteBg: boolean,
	shadow: boolean,
  singleTextColor?: string
}

export interface BackgroundSettings {
  mode: BgMode,
  solidColor: string,
  // gradientCSS: string,
  gradientId: string,
  bgImg: ArrayBuffer | string | null,
  selectedFile: File | null,
  imgFilter: ImgFilter,
}

function Editor({
  post,
  onGenerate,
  genLoading
} : {
  post: PostDTO,
  onGenerate: (e: any) => void,
  genLoading: boolean
}){
  // props.quoted existed

  const [card, setCard] = useState<CardSettings>({
    rounded: true,
    border: false,
    whiteBg: true,
    shadow: true
  })

  const [background, setBackground] = useState<BackgroundSettings>({
    mode: BgMode.Solid,
    solidColor: "#E1E8ED",
    gradientId: "g1",
    bgImg: null,
    selectedFile: null,
    imgFilter: ImgFilter.Default,
  })

  let bgStyle = background.solidColor;
  let textColor: string | undefined = undefined;

  if (background.mode === BgMode.Solid && !card.whiteBg){
    // solid mode, no card.whiteBg
    const l = luminosity(background.solidColor);
    if (l >= 135){
      textColor = "black";
    } else {
      textColor = "white";
    }
  } else if (background.mode === BgMode.Image && background.bgImg) {
    // image mode, image selected
    const defString = `center/cover url(${background.bgImg}) ${background.solidColor}`
    // set image filter
    if (background.imgFilter == ImgFilter.Default){
      bgStyle = defString;
    } else if (background.imgFilter === ImgFilter.Dark){
      bgStyle = ImgFilter.Dark + defString;
      textColor = "white";
    } else {
      // light
      bgStyle = ImgFilter.Light + defString;
      textColor = "black";
    }
  } else if (background.mode === BgMode.Gradient) {
    // gradient mode
    const gradient = GRADIENTS[background.gradientId as keyof typeof GRADIENTS];
    bgStyle = bgCSS(gradient);
  }

  return (
    <Providers card={{card, setCard}} background={{background, setBackground}}>
      <div className="w-full md:w-2/3">
        <label className='section-label'>Preview</label>
        <div id="preview"className='mb-3 w-full'>
          <AspectRatio ratio={1}
            className="flex items-center shadow-[inset_rgba(0,0,0,.11)_0_0_0_1px] bg-center bg-cover"
            style={{background: bgStyle}}
          >
            <Tweet
              post={post}
              textColor={textColor}
            />
          </AspectRatio>
        </div>
      </div>

      <Sidebar
        onGenerate={onGenerate}
        genLoading={genLoading}
        // imageCropDisabled={mainTweet.tweet.media && mainTweet.tweet.media.length == 1}
        // onSwitchImageCrop={() => setImageCrop(!imageCrop)}
      >
        <BackgroundPicker
          // onClickGradient={onClickGradient}
          // unsplashPhotoClick={unsplashPhotoClick}
        />

      </Sidebar>
    </Providers>
  );
}



export default Editor;
