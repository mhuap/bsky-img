import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import PhotoDTO from "@/app/api/unsplash/PhotoDTO";

export default function UnsplashPhoto({
  photo,
  handlePhotoClick
} : {
  photo: PhotoDTO,
  handlePhotoClick: (e: any, url: string, credit: string, downloadLocation: string) => void
}) {
  const { description, user, urls, downloadLocation } = photo;
  const creditString = "Photo by " + user.name;
  
  return (
    <div className="relative mb-2">
      <img
        src={urls.small}
        onClick={(e) => handlePhotoClick(e, urls.regular, creditString, downloadLocation)}
        alt={description ?? "Unsplash photo (description not available)"}
        className="cursor-pointer"
      />

      <span className="text-tiny sm:text-xs text-left absolute bottom-0 left-0 py-1 px-2 text-white bg-[rgba(0,0,0,0.5)]">
        Photo by <a
          className="text-white underline"
          target="_blank"
          href={`https://unsplash.com/@${user.username}?utm_source=bsky-img&utm_medium=referral`}
        >
          {user.name}
        </a>
      </span>
    </div>
  )
}

{/* <img
        src={url}
        onClick={(e) => handlePhotoClick(e, urls.regular, creditString, downloadLocation)}
        className="w-full"
      /> */}