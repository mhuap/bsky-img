import React, { useState, useRef, useEffect, ChangeEvent }from "react";
// import { scroller } from 'react-scroll';
import * as htmlToImage from 'html-to-image';

import PostDTO from "@/app/api/bsky/PostDTO";
import { AspectRatio } from "./ui/aspect-ratio";
import Providers from "./Providers";
import { BgMode, ImgFilter } from "@/util/enums";
import { luminosity } from "@/util/luminosity";
import Tweet from './Tweet';
import BackgroundPicker from './BackgroundPicker';
import Sidebar from './Sidebar';
import { GRADIENTS } from "./GradientSwatch";
import { bgCSS } from "@/util/gradientCSS";

export interface CardSettings {
  rounded: boolean,
  border: boolean,
	whiteBg: boolean,
	shadow: boolean
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

function Result({
  post
} : {
  post: PostDTO;
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
  
  // can stay for now:
  const [genLoading, setGenLoading] = useState(false);
  const [resultImg, setResultImg] = useState<string | null>(null);

  const onGenerate =(e: any) => {
    e.preventDefault();
    setGenLoading(true)
    const node: HTMLElement = document.getElementById("preview")!;
    // const node = document.getElementByID('form-input');
    const exportSize = 2;

    const width = node.offsetWidth * exportSize
    const height = node.offsetHeight * exportSize

    const config = {
      style: {
        transform: `scale(${exportSize})`,
        transformOrigin: 'top-left',
        width: 512 + "px",
        height: 512 + "px"
      },
      width,
      height,
    }

    htmlToImage.toPng(node)
    .then((dataUrl) => {
      setResultImg(dataUrl);
    })
    .catch(function (error) {
        console.error('dom-to-image: oops, something went wrong!', error);
    });
  }

  // const unsplashPhotoClick = (e, downloadLocation) => {
  //   e.preventDefault()

  //   const src = e.target.src;
  //   // setSelectedFile({name: 'Unsplash image'});
  //   setBgImg(src);
  //   setModalShow(false);
  //   axios.post('/api/unsplash', {
  //     downloadLocation
  //   })
  //   .catch(error => console.log(error))
  // }

  // const onClickGradient = (a, b) => {
  //   // setSelectedFile(null);
  //   setBgImg("");
  // }

  // console.log(tweet);

  let bgSection;
  let bgStyle = {background: background.solidColor};
  let textColor = '#000';

  if (background.mode === BgMode.Solid && !card.whiteBg){
    // solid
    const l = luminosity(background.solidColor);
    if (l >= 135){
      textColor = '#000';
    } else {
      textColor = '#fff';
    }
  } else if (background.bgImg && background.mode === BgMode.Image) {
    // image
    const defString = `center/cover url(${background.bgImg}) ${background.solidColor}`
    // if (imgFilter == 'default'){
    if (background.imgFilter == ImgFilter.Default){
      bgStyle.background = defString;
    } else if (background.imgFilter === ImgFilter.Dark){
      bgStyle.background = ImgFilter.Dark + defString;
      textColor = '#fff';
    } else {
      // light
      bgStyle.background = ImgFilter.Light + defString;
      textColor = '#000';
    }
  } else if (background.mode === BgMode.Gradient) {
    // gradient
    const gradient = GRADIENTS[background.gradientId as keyof typeof GRADIENTS];
    bgStyle.background = bgCSS(gradient);
  }

  let content;

  if (resultImg){
    content =<div className="mx-w-[530px] mx-auto">

    <img
      className="w-full"
      src={resultImg}
      alt={`Bluesky post that says: ${post.text}`}
    />

      <small className="text-secondary text-xs my-2"><a href={resultImg} download={`Bluesky post by ${post.author.handle}`}>download here</a></small>
    </div>
  } else {
    content = <Providers card={{card, setCard}} background={{background, setBackground}}>
      <div className="w-full md:w-2/3">
        <label className='section-label'>Preview</label>
        <div id="preview"className='mb-3 w-full'>
          <AspectRatio ratio={1}
            className="flex items-center shadow-[inset_rgba(0,0,0,.11)_0_0_0_1px] bg-center bg-cover"
            style={bgStyle}
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
        solid={background.mode != BgMode.Gradient}
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
  }

  return <>{content}</>;
}



export default Result;
