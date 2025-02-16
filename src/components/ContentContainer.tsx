import { useState } from "react";
import * as htmlToImage from 'html-to-image';
import PostDTO from "@/app/api/bsky/PostDTO";
import Editor from "./Editor";

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
    // const width = node.offsetWidth;
    // const height = node.offsetHeight;

    console.log(width); // 1008

    // const size = "200px" // 512
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
  //   setBgImg("");F
  // }

  return (<>{
    resultImg ? (
      <div className="max-w-wsm mx-auto mb-4">
        <img
          className="w-full"
          src={resultImg}
          alt={`Bluesky post that says: ${post.text}`}
          width={500}
          height={500}
        />
        <small className="block text-center text-secondary mt-2"><a href={resultImg} download={`Bluesky post by ${post.author.handle}`}>download here</a></small>
      </div>
    ) : (
      <Editor
        post={post}
        onGenerate={onGenerate}
        genLoading={genLoading}
      />
    )}</>);
}
