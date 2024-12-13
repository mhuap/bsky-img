import React, { useState, useRef, useEffect, ChangeEvent }from "react";
import axios from 'axios';
// import { scroller } from 'react-scroll';
import * as htmlToImage from 'html-to-image';

import Tweet from './tweet';
import BackgroundPicker from './backgroundPicker';
import SideBar from './sideBar';
import PhotoUpload from './PhotoUpload';
import { GRADIENTS } from './GradientColor';
import PostDTO from "@/app/api/bsky/PostDTO";

const serverErrorMsg = 'Bluesky server error';

const blackFilter = `linear-gradient(
          rgba(0, 0, 0, 0.7),
          rgba(0, 0, 0, 0.7)
        ), `
const whiteFilter = `linear-gradient(
          rgba(255, 255, 255, 0.85),
          rgba(255, 255, 255, 0.85)
        ), `

function luminosity(color: string) {
  const colorRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color)!;
  const r = parseInt(colorRegex[1], 16)
  const g = parseInt(colorRegex[2], 16)
  const b = parseInt(colorRegex[3], 16)

  return Math.round(r*0.299 + g*0.587 + b*0.114);
}

interface ResultProps {
  post: PostDTO;
};

function Result({ post }: ResultProps){
  // props.quoted existed

  const [colorMode, setColorMode] = useState(0);
  // 0 = solid, 1 = gradient, 2 = image

  const [bgGradient, setBgGradient] = useState(`linear-gradient(to bottom right, #00FF8F, #60EFFF)`);
  const [bgColor, setBgColor] = useState('#E1E8ED');
  const [gradientId, setGradient] = useState('g1');

  const [bgImg, setBgImg] = useState<ArrayBuffer | string | null>(null);
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [genLoading, setGenLoading] = useState(false);
  const [resultImg, setResultImg] = useState<string | null>(null);
  const [imgFilter, setImgFilter] = useState('default');

  const [boxRounded, setBoxRounded] = useState(true);
  const [boxBorder, setBoxBorder] = useState(false);
  const [boxBackground, setBoxBackground] = useState(true);
  const [boxShadow, setBoxShadow] = useState(true);
  const [imageCrop, setImageCrop] = useState(false);
  const [boxText, setBoxText] = useState(null);

  const [modalShow, setModalShow] = React.useState(false);

  // const imageUrlRef = useRef(); // PhotoUpload: imgRef
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleColorChange = (color: any, event: any) => setBgColor(color.hex);

  // const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   // const file = e.target?.files[0];
  //   const files = e.target?.files;
  //   if (files){
  //     const file = files[0];
  //     setSelectedFile(file);
  //     let reader = new FileReader();
  //     reader.onload = () => {setBgImg(reader.result)};

  //     reader.readAsDataURL(file);
  //     setModalShow(false);
  //   }
  // }

  const onClickAddImage = () => {
    setModalShow(true);
    setColorMode(2);
  }

  const onClickTrash = () => {
    // setSolidColorMode(true);
    // setSelectedFile(null);
    setBgImg(null);
    setImgFilter('default');
  }

  const onGenerate =(e: any) => {
    e.preventDefault();
    setGenLoading(true)
    const node: HTMLElement = document.querySelector("#preview .sq-container")!;
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

    setGradient(gradient);
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

  if (colorMode == 0 && !boxBackground){
    const l = luminosity(bgColor);
    if (l >= 135){
      textColor = '#000';
    } else {
      textColor = '#fff';
    }
  } else if (bgImg && colorMode == 2) {
    const defString = `url(${bgImg}) ${bgColor}`
    if (imgFilter == 'default'){
      bgStyle.background = defString;
    } else if (imgFilter == 'dark'){
      bgStyle.background = blackFilter + defString;
      textColor = '#fff';
    } else {
      // light
      bgStyle.background = whiteFilter + defString;
      textColor = '#000';
    }
  } else if (colorMode == 1) {
    bgStyle.background = bgGradient;
  }


  let content;

  if (resultImg){
    content =<div style={{maxWidth: '530px', margin: '0 auto'}}>

    <img
      id='bsky-img'
      src={resultImg}
      alt={`Bluesky post that says: ${post.text}`}
    />

      <small id='backup-link'><a href={resultImg} download={`Bluesky post by ${post.author.handle}`}>download here</a></small>
    </div>
  } else {
    content = <>
      <div id='preview'>
        <label className='section'>Preview</label>
        <div className='sq-container-container'>
          <div className='sq-container' style={bgStyle}>
            <div className='before'></div>
            <Tweet
              post={post}
              boxRounded={boxRounded}
              boxBorder={boxBorder}
              boxBackground={boxBackground}
              boxShadow={boxShadow}
              imageCrop={imageCrop}
              textColor={textColor}
            />
          </div>
        </div>
      </div>

      <SideBar
        onGenerate={onGenerate}
        onSwitchRounded={() => setBoxRounded(!boxRounded)}
        onSwitchBorder={() => setBoxBorder(!boxBorder)}
        onSwitchBoxBackground={() => setBoxBackground(!boxBackground)}
        onSwitchShadow={() => setBoxShadow(!boxShadow)}
        // imageCropDisabled={mainTweet.tweet.media && mainTweet.tweet.media.length == 1}
        onSwitchImageCrop={() => setImageCrop(!imageCrop)}
        solid={colorMode != 1}
        boxBackground={boxBackground}
        genLoading={genLoading}
      >
        <BackgroundPicker
          onChange={handleColorChange}
          color={bgColor}
          onClickAddImage={onClickAddImage}
          onClickTrash={onClickTrash}
          // fileName={selectedFile?.name}
          colorMode={colorMode}
          setColorMode={setColorMode}
          setBoxBackground={setBoxBackground}
          setBoxShadow={setBoxShadow}
          // onClickGradient={onClickGradient}
          handleGradientChange={handleGradientChange}
          gradient={gradientId}
          imgFilter={imgFilter}
          setImgFilter={setImgFilter}
        />

        <PhotoUpload
          show={modalShow}
          onHide={() => setModalShow(false)}
          // onFileChange={onFileChange}
          useImageURL={useImageURL}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          // unsplashPhotoClick={unsplashPhotoClick}
        />

      </SideBar>
    </>
  }

  return <>{content}</>;
}



export default Result;
