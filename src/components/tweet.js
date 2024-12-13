'use client'
import React, { useEffect, useState } from "react";
import regexifyString from "regexify-string";

import Poll from './poll.js';
import axios from "axios";

function Tweet({
  post,
  boxRounded,
  boxBorder,
  boxBackground,
  boxShadow,
  imageCrop,
  textColor
}){
  const [avatarSrc, setAvatarSrc] = useState(null);
  // TODO: deal with media

  useEffect(() => {
    const endpoint = "https://bsky.social/xrpc/com.atproto.sync.getBlob"
    axios.get(endpoint, {
      params: {
        did: post.author.did,
        cid: post.author.avatarCid
      },
      responseType: 'blob'
    })
      .then(result => {
        // console.log(result);
        const uri = URL.createObjectURL(result.data);
        setAvatarSrc(uri);
      }).catch(e => {
        console.log("uhoh");
        console.error(e);
      })
  }, [post]);
  // TODO: is this still necessary?
  // ?? unencode html entities
  // const doc = new DOMParser().parseFromString(post.text, "text/html");
  // const postText = doc.documentElement.textContent;

  // TODO: deal with urls and mentions
  // blueArr = array of text to highlight
  // if blueArr && boxBackground is on:
  // regexifyString
  // <span className='blue' key={"blue " + index}>{content}</span>

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
    <div id='post' style={boxStyle}>
      <div>
        {/* <img className='avatar' crossOrigin="anonymous" src={post.author.avatar} /> */}
        <img className='avatar' crossOrigin="anonymous" src={avatarSrc} />
        <div className='account-group'>
          <div className='name'>
            <span><b>{post.author.displayName}</b></span>
          </div>
          <span className='username'>{post.author.handle}</span>
        </div>
      </div>
      <div className='tweet-text'>{post.text}</div>
      <div className='date'>{post.date}</div>
    </div>
  )
};

export default Tweet;
