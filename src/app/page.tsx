'use client';
import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { scroller } from "react-scroll";
import Image from 'next/image';

import Result from "@/components/Result";
import Arrow from "@/components/arrow.js";
import Hero from "@/components/Hero";
import { validate } from "@/util/handlingURL";
import axios from "axios";

import diagram from "../../public/diagram.png";
import PostDTO from "./api/bsky/PostDTO";
import { Spinner } from "react-bootstrap";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [blank, setBlank] = useState(true);
  const [inputError, setInputError] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [urlQuery, setUrlQuery] = useState(null);
  const [urlInput, setUrlInput] = useState("");
  const [post, setPost] = useState<PostDTO | null>(null);
  // const [mainTweet, setMainTweet] = useState(new TweetEntity());
  // const [quoted, setQuoted] = useState(new TweetEntity());

  // const result = useRef(null); // div result-wrapper
  // const urlInput = useRef(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // scroller.scrollTo("result-wrapper", {
    //   smooth: true,
    // });

    // validate url
    const groups = validate("https://bsky.app/profile/jessiegender.bsky.social/post/3lbtqamikfs2d");
    // const groups = validate(urlInput);
    if (groups != null) {
      setBlank(false);
      setInputError(false);
      setLoading(true);
      const postDTO: PostDTO = await axios.get("/api/bsky", {
          params: groups
        })
        .then(res => res.data)
        .catch(err => console.log(err));

      const endpoint = "https://bsky.social/xrpc/com.atproto.sync.getBlob"
      const blobUrl = await axios.get(endpoint, {
        params: { did: postDTO.author.did, cid: postDTO.author.avatarCid },
        responseType: 'blob'
      })
      .then(result => {
        const url = URL.createObjectURL(result.data);
        return url;
      })
      postDTO.author.avatarUrl = blobUrl;
      setPost(postDTO);
      setLoading(false);
    } else {
      setInputError(true);
    }
    // setBlank, setInputError, createTweet
    console.log("handling submission");
  };

  let res;
  if (blank) {
    res = <Image
      id="diagram"
      src={diagram} alt="usage diagram"
      fill
      priority
    />;
  } else if (loading) {
    res = (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else if (serverError) {
    res = <span className="error-text">{serverError}</span>;
  } else if (post) {
    // res = <Result blank={blank} mainTweet={mainTweet} quoted={quoted} />;
    res = <Result post={post} />
    // res = <div>{JSON.stringify(post)}</div>
  }

  return (
    <>
      <div id="container">
        <div id="top-wrapper">
          <Hero />
          <form id="top-form" onSubmit={handleSubmit}>
            <label className="section">post URL</label>
            <div id="form-input-group" className={inputError ? "error" : ""}>
              <input
                id="url-input"
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                name="url"
                placeholder="bsky.app/profile/something.bsky.social/post/fjdk4fjdksaf"
              // defaultValue={router.query.tweet ? router.query.tweet : ""}
              />
              <button className="input-overlay">
                <Arrow />
              </button>
            </div>
            {inputError && <p className="error-text">Not a valid bluesky URL</p>}
          </form>
        </div>

        <section id="result-wrapper" className={loading ? "loading" : ""}>
          {res}
        </section>
        <footer>
          Created by{" "}
          <a href="https://mhuap.github.io">Matias Huapaya</a>.
        </footer>
      </div>
    </>
  );
}
