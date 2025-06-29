'use client';
import { useState } from "react";
// import axios from "axios";
// import { scroller } from "react-scroll";
import Image from 'next/image';
import axios from "axios";

import { cn } from "@/lib/utils";
import PostDTO from "./api/bsky/PostDTO";
import { validate } from "@/util/handlingURL";

import ContentContainer from "@/components/ContentContainer";
import Hero from "@/components/Hero";
import Arrow from "@/components/arrow.js";

import diagram from "../../public/diagram.png";

const serverErrorMsg = 'Bluesky server error';

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
      console.log("FETCHING BLUESKY POST")
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
    res = <div className="relative grow md:mx-auto md:w-wsm">
      <Image
      className="object-contain"
      src={diagram} alt="usage diagram"
      fill
      priority
    />
    </div>;
    // res = <p>image</p>
  } else if (loading) {
    res = <p className="text-center">Loading...</p> //Spinner
  } else if (serverError) {
    res = <span className="error-text">{serverError}</span>;
  } else if (post) {
    // res = <Result blank={blank} mainTweet={mainTweet} quoted={quoted} />;
    res = <ContentContainer post={post} />
    // res = <div>{JSON.stringify(post)}</div>
  } else if (!post){
    res = <p>{serverErrorMsg}</p>
  }

  return (
    <>
      <div className="mx-auto w-full flex flex-col p-4 justify-between min-h-lvh sm:max-w-wsm md:max-w-wmd">
        <div className="mt-16 mb-8 sm:mt-38">
          <Hero />
          <form onSubmit={handleSubmit} className="w-full mx-auto md:w-wsm">
            <label htmlFor="url-input" hidden>Post URL</label>
            <div className="relative w-full bg-white z-[1]">
              <input
                id="url-input"
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                name="url"
                placeholder="bsky.app/profile/something.bsky.social/post/fjdk4fjdksaf"
              // defaultValue={router.query.tweet ? router.query.tweet : ""}
                className={cn(
                  "border-solid border-2 border-input rounded-md w-full py-2 pl-3 pr-10 focus:border-primary focus:shadow-[0_0_0_0.2rem_rgb(0,95,204,0.15)] focus:outline-0",
                  {"border-danger focus:border-danger focus:shadow-[0_0_0_0.2rem_rgba(220,53,69,0.25)] focus:outline-0": inputError}
                )}
              />
              <button className="h-full absolute right-0 top-0 px-3 focus:shadow-[inset_0_0_0_0.2rem_rgb(0,95,204,0.25)]">
                <Arrow />
              </button>
            </div>
            {inputError && <p className="text-danger text-sm">Not a valid bluesky URL</p>}
          </form>
        </div>

        <section className={cn(
          "flex flex-col justify-between w-full md:mx-auto md:flex-row gap-3",
          {"justify-center": loading}
        )}>
        {/* <section className={loading ? "loading" : ""}> */}
        {/* id="result-wrapper" */}
          {res}
        </section>
        <footer className="mx-4 text-center text-secondary mt-8 md:mt-4">
          Created by{" "}
          <a href="https://mhuap.github.io" className=" hover:underline">Matias Huapaya</a>.
        </footer>
      </div>
    </>
  );
}
