import { useState } from "react";
import * as htmlToImage from 'html-to-image';

import { ChevronLeft } from 'lucide-react';
import PostDTO from "@/app/api/bsky/PostDTO";
import Editor from "./Editor";
import Providers from "./Providers";

export default function ContentContainer({
  post
} : {
  post: PostDTO
}) {
  // can stay for now:
  const [genLoading, setGenLoading] = useState(false);
  const [resultImg, setResultImg] = useState<string | null>(null);

  const onGenerate = (e: any) => {
    e.preventDefault();
    setGenLoading(true);
    const node: HTMLElement = document.getElementById("preview")!;
    const exportSize = 2;
    const width = node.offsetWidth * exportSize;
    const height = node.offsetHeight * exportSize;
    const config = {
      style: {
        transform: `scale(${exportSize})`,
        transformOrigin: 'top left',
        width: width + "px",
        height: height + "px"
      },
      width,
      height,
    }

    htmlToImage
      // .toPng(node)
      .toJpeg(node, config)
      .then((dataUrl) => {
        setResultImg(dataUrl);
        setGenLoading(false);
      })
      .catch(function (error) {
        console.error('dom-to-image: oops, something went wrong!', error);
      });
  }

  // const onClickGradient = (a, b) => {
  //   // setSelectedFile(null);
  //   setBgImg("");F
  // }

  return (<Providers>{
    resultImg ? (
      <div className="max-w-wsm mx-auto mb-4">
        <button
          className="text-primary flex items-center mb-4"
          onClick={() => setResultImg(null)}
        >
          <ChevronLeft className="ml-[-4px]"/>
          Back to editing
        </button>
        <img
          className="w-full"
          src={resultImg}
          alt={`Bluesky post that says: ${post.text}`}
        />
        <small className="block text-center text-secondary mt-2"><a href={resultImg} download={`Bluesky post by ${post.author.handle}`}>download here</a></small>
      </div>
    ) : (
        <Editor
          post={post}
          onGenerate={onGenerate}
          genLoading={genLoading}
        />
    )}</Providers>);
}
