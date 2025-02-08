import React, { useState, useRef, useEffect, ChangeEvent }from "react";
import axios from 'axios';
// import { scroller } from 'react-scroll';
import * as htmlToImage from 'html-to-image';

import Tweet from './Tweet';
import BackgroundPicker from './BackgroundPicker';
import Sidebar from './Sidebar';
import PhotoUpload from './PhotoUpload';
import { GRADIENTS } from './GradientColor';
import PostDTO from "@/app/api/bsky/PostDTO";
import { AspectRatio } from "./ui/aspect-ratio";
import { BgMode, CardProperty, ImgFilter } from "@/util/enums";
import { luminosity } from "@/util/luminosity";
import { CardContext } from "@/contexts/CardContext";

const serverErrorMsg = 'Bluesky server error';

export interface CardSettings {
  rounded: boolean,
  border: boolean,
	whiteBg: boolean,
	shadow: boolean
}

export interface BackgroundSettings {
  mode: BgMode,
  solidColor: string,
  gradientCss: string,
  gradientId: string,
  bgImg: ArrayBuffer | string | undefined,
  selectedFile: File | undefined,
  imgFilter: ImgFilter,
  bgImgUrl: string
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

  const [colorMode, setColorMode] = useState(0);
  // 0 = solid, 1 = gradient, 2 = image

  const [bgGradient, setBgGradient] = useState(`linear-gradient(to bottom right, #00FF8F, #60EFFF)`);
  const [bgColor, setBgColor] = useState('#E1E8ED');
  const [gradientId, setGradientId] = useState('g1');

  const [bgImg, setBgImg] = useState<ArrayBuffer | string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [genLoading, setGenLoading] = useState(false);
  const [resultImg, setResultImg] = useState<string | null>(null);
  const [imgFilter, setImgFilter] = useState<ImgFilter>(ImgFilter.Default);
  // TODO:
  // const [imageCrop, setImageCrop] = useState(false);
  // const [boxText, setBoxText] = useState(null);

  const [modalShow, setModalShow] = React.useState(false);

  // const imageUrlRef = useRef(); // PhotoUpload: imgRef
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleColorChange = (color: any, event: any) => setBgColor(color.hex);

  useEffect(() => {
    console.log("changed color:", bgColor);
  }, [bgColor])

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // const file = e.target?.files[0];
    const files = e.target?.files;
    if (files){
      const file = files[0];
      setSelectedFile(file);
      console.log("file read:", file.name);
      let reader = new FileReader();
      reader.onload = () => {setBgImg(reader.result)};
      reader.readAsDataURL(file);
      setModalShow(false);
    }
  }

  const onClickAddImage = () => {
    setModalShow(true);
    setColorMode(2);
  }

  const onClickTrash = () => {
    // setSolidColorMode(true);
    setSelectedFile(null);
    setBgImg(null);
    setImgFilter(ImgFilter.Default);
  }

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

  const useImageURL = (e: any) => {
    e.preventDefault();

    const src = imageUrl;
    // setSelectedFile({name: 'Image from URL'});
    setBgImg(src);
    setModalShow(false);
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

  const handleGradientChange = (e: any) => {
    const gradient: string = e.target.value;

    setGradientId(gradient);
    const colorA = GRADIENTS.find(g => g.id === gradient)?.start;
    const colorB = GRADIENTS.find(g => g.id === gradient)?.end;
    setBgGradient(`linear-gradient(to bottom right, ${colorA}, ${colorB})`);
  }

  // console.log(tweet);
  if (!post){
    return <p>{serverErrorMsg}</p>
  }

  let bgSection;
  let bgStyle = {background: bgColor};
  let textColor = '#000';

  if (colorMode == 0 && !card.whiteBg){
    // solid
    const l = luminosity(bgColor);
    if (l >= 135){
      textColor = '#000';
    } else {
      textColor = '#fff';
    }
  } else if (bgImg && colorMode == 2) {
    // image
    const defString = `center/cover url(${bgImg}) ${bgColor}`
    // if (imgFilter == 'default'){
    if (imgFilter == ImgFilter.Default){
      bgStyle.background = defString;
    } else if (imgFilter === ImgFilter.Dark){
      bgStyle.background = ImgFilter.Dark + defString;
      textColor = '#fff';
    } else {
      // light
      bgStyle.background = ImgFilter.Light + defString;
      textColor = '#000';
    }
  } else if (colorMode == 1) {
    // gradient
    bgStyle.background = bgGradient;
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
    content = <CardContext.Provider value={{card, setCard}}>
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
        // imageCropDisabled={mainTweet.tweet.media && mainTweet.tweet.media.length == 1}
        // onSwitchImageCrop={() => setImageCrop(!imageCrop)}
        solid={colorMode != 1}
        genLoading={genLoading}
      >
        <BackgroundPicker
          onChange={handleColorChange}
          setBgColor={setBgColor}
          hex={bgColor}
          onClickAddImage={onClickAddImage}
          onClickTrash={onClickTrash}
          fileName={selectedFile?.name}
          // fileName={null}
          // colorMode={colorMode}
          setColorMode={setColorMode}
          // onClickGradient={onClickGradient}
          handleGradientChange={handleGradientChange}
          gradient={gradientId}
          imgFilter={imgFilter}
          setImgFilter={setImgFilter}
          show={modalShow}
          onHide={() => setModalShow(false)}
          onFileChange={onFileChange}
          useImageURL={useImageURL}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          // unsplashPhotoClick={unsplashPhotoClick}
        />

      </Sidebar>
    </CardContext.Provider>
  }

  return <>{content}</>;
}



export default Result;
