import React, { useState }from "react";
// import { scroller } from 'react-scroll';

import PostDTO from "@/app/api/bsky/PostDTO";
import { AspectRatio } from "./ui/aspect-ratio";
import { ImgFilter } from "@/util/enums";
import { luminosity } from "@/util/luminosity";
import { bgCSS } from "@/util/gradientCSS";

import Tweet from './Tweet';
import BackgroundPicker from './BackgroundPicker';
import Sidebar from './Sidebar';
import { GRADIENTS } from "./GradientSwatch";
import { useCardContext } from "@/contexts/CardContext";
import { useBackgroundContext } from "@/contexts/BackgroundContext";
import { cn } from "@/lib/utils";

interface EditorProps {
  post: PostDTO,
  onGenerate: (e: any) => void,
  genLoading: boolean
}

function Editor({
  post,
  onGenerate,
  genLoading
} : EditorProps ){
  const { card } = useCardContext();
  const { background } = useBackgroundContext();

  let bgStyle = background.solidColor;
  let textColor: "black" | "white" | undefined;

  if (background.mode === "SOLID" && !card.whiteBg){
    // solid mode, no card.whiteBg
    const l = luminosity(background.solidColor);
    if (l >= 135){
      textColor = "black";
    } else {
      textColor = "white";
    }
  } else if (background.mode === "IMAGE" && background.bgImg) {
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
  } else if (background.mode === "GRADIENT") {
    // gradient mode
    const gradient = GRADIENTS[background.gradientId];
    bgStyle = bgCSS(gradient);
  }

  const ifStyle = (background.mode === "IMAGE" && !background.bgImg) ? undefined : {background: bgStyle};

  // shadow-[inset_rgba(0,0,0,.11)_0_0_0_1px]
  return (
    <>
      <div className="w-full md:w-2/3">
        <label className="section-label">Preview</label>
        <div id="preview" className="mb-3 w-full">
          <AspectRatio ratio={1}
            className={cn(
              "flex items-center bg-center",
              {"bg-cover": ifStyle},
              {"checkered": !ifStyle}
            )}
            style={ifStyle}
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
      >
        <BackgroundPicker />

      </Sidebar>
    </>
  );
}



export default Editor;
