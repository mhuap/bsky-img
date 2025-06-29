import React, { useState, useRef, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import axios from 'axios';

import UnsplashPhoto from './UnsplashPhoto';
import PhotoDTO from '@/app/api/unsplash/PhotoDTO';
import { useBackgroundContext } from '@/contexts/BackgroundContext';


function UnsplashTab({
  setShowModal
} : {
  setShowModal: (s: boolean) => void
}) {
  const { background, setBackground } = useBackgroundContext();
  const [data, setData] = useState<PhotoDTO[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  // const queryInput = useRef(null);

  const handleSubmit = (e: any) => {
    e.preventDefault()

    setLoading(true);
    axios.get('/api/unsplash', {
      params: {
        query
      }
    })
    .then(res => {
      // console.log(res.data);
      setData(res.data.photos)
      setLoading(false);
    })
    .catch(error => console.log(error));
  }

  const handlePhotoClick = (e: any, url: string, credit: string, downloadLocation: string) => {
    e.preventDefault()

    setBackground({
      ...background,
      bgImg: url,
      selectedFile: {name: credit},
      imgMethod: "UNSPLASH"
    });
    setShowModal(false);
    // trigger tracking download
    axios.get("/api/unsplash/track", {
      params: { downloadLocation }
    })
    .catch(error => console.log(error));
  }

  let content;
  if (data == null && !loading){
    content = null
  } else if (data == null && loading) {
    content = <p className="mt-2">Loading...</p>
  } else {
    content = <div className="overflow-y-auto h-[400px] mt-2">
      {/* id="unsplash-results" */}
    <Masonry
      breakpointCols={2}
      // className="masonry-grid"
      className="flex gap-2 w-auto"
      columnClassName=""
    >
      {data != null && data.map((photo: PhotoDTO) => (
        <UnsplashPhoto
          key={photo.id}
          photo={photo}
          handlePhotoClick={handlePhotoClick}/>
      ))}
    </Masonry>

    </div>
  }

  return (
    <div id="unsplash-tab">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search Unsplash photos by topics or colors"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-solid border-2 border-input rounded-md w-full py-2 px-3 focus:border-primary focus:shadow-[0_0_0_0.2rem_rgb(0,95,204,0.15)] focus:outline-0"
          />
      </form>
      {content}
    </div>

    )
}

export default UnsplashTab;
