'use client'
import React, { useEffect, useState } from "react";
import regexifyString from "regexify-string";

import Poll from './poll.js';
import axios from "axios";
import PostDTO from "@/app/api/bsky/PostDTO.js";

function Tweet({
  post,
  boxRounded,
  boxBorder,
  boxBackground,
  boxShadow,
  // imageCrop,
  textColor
} : {
  post: PostDTO,
  boxRounded: boolean,
  boxBorder: boolean,
  boxBackground: boolean,
  boxShadow: boolean,
  textColor: string,
}){
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>();
  // TODO: deal with media
  // .tweet-media
  // <div className="mt-4 flex">
  //   <img src="" alt="" className="w-full"/>
  // </div>
  
  // TODO: is this still necessary?
  // ?? unencode html entities
  // const doc = new DOMParser().parseFromString(post.text, "text/html");
  // const postText = doc.documentElement.textContent;

  // TODO: deal with urls and mentions
  // blueArr = array of text to highlight
  // if blueArr && boxBackground is on:
  // regexifyString
  // <span className='text-primary' key={"blue " + index}>{content}</span>

  let boxStyle = {
    borderRadius: boxRounded ? '0.75rem' : '0',
    borderStyle: boxBorder ? 'solid': 'none',
    background: boxBackground ? 'white' : 'none',
    color: textColor,
    borderColor: textColor ?? '#14171a',
    boxShadow: boxShadow ? 'rgba(0,0,0,0.1) 0px 8px 24px 0px' : 'none',
  }

  // TODO: deal with quoted post

  return (
    <div className="min-w-3/4 m-4 bg-white p-6 relative border-none border-2" style={boxStyle}>
      {/* id='post' */}
      <div className="flex">
        <img className='rounded-full w-10 h-10 mr-2' crossOrigin="anonymous" src={post.author.avatarUrl} />
        <div className='text-sm'>
          {/* account-group */}
          <p className="font-bold">{post.author.displayName}</p>
          <p className="text-secondary">@{post.author.handle}</p>
        </div>
      </div>
      <div className='my-4 leading-[1.3] whitespace-pre-wrap'>{post.text}</div>
      <div className='text-secondary text-right text-sm'>{post.date.toString()}</div>
    </div>
  )
};

export default Tweet;
