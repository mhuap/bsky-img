import React, { useState, ChangeEvent } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useBackgroundContext } from '@/contexts/BackgroundContext';
import UnsplashTab from './UnsplashTab';

// import UnsplashTab from './unsplashTab.js';

function PhotoUpload({
  // unsplashPhotoClick
} : {
  // unsplashPhotoClick
}) {
  const { background, setBackground } = useBackgroundContext();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [showModal, setShowModal] = React.useState(false);
  
  const confirmImageURL = (e: any) => {
    e.preventDefault();
    // setSelectedFile({name: 'Image from URL'});
    setBackground({
      ...background,
      bgImg: imageUrl,
      selectedFile: {name: imageUrl}
    })
    setShowModal(false);
  }

  const onClickAddImage = () => {
    setShowModal(true);
  }

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // const file = e.target?.files[0];
    const files = e.target?.files;
    if (files){
      const file = files[0];
      console.log("file read:", file.name);
      let reader = new FileReader();
      reader.onload = () => {
        if (reader.result != null){
          setBackground({
            ...background,
            bgImg: reader.result,
            selectedFile: file,
            imgMethod: "UPLOAD"
          });
        } else {
          throw new Error("Error reading file.");
        }
      };
      reader.readAsDataURL(file);
      setShowModal(false);
    }
  }

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild onClick={onClickAddImage}>
        <button className='p-2 rounded-md bg-input-light whitespace-nowrap w-full text-foreground hover:bg-input'>
          Add background image
        </button>
      </DialogTrigger>
      <DialogContent >
        <DialogHeader>
          <DialogTitle>Set background image</DialogTitle>
          <VisuallyHidden asChild>
            <DialogDescription>Choose between uploading an image, using an image URL, or searching for one from Unsplash.</DialogDescription>
          </VisuallyHidden>
          <Tabs defaultValue="upload">
            <TabsList>
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="unsplash">Unsplash</TabsTrigger>
              <TabsTrigger value="url">URL</TabsTrigger>
            </TabsList>
            <TabsContent value="upload">
              <label className="block text-center p-2 cursor-pointer rounded-md bg-input-light hover:bg-input w-full">
              {/* id='photo-upload' */}
                <input type="file"
                  onChange={onFileChange}
                  accept="image/jpeg, image/png"
                  className="h-0 w-0"
                />
                Browse
              </label>
            </TabsContent>
            <TabsContent value="url">
              {/* id='image-url' */}
              {/* <form action={void(0)} onSubmit={confirmImageURL} >
                <label htmlFor="image-url" hidden>Image URL</label>
                <input id="image-url" type="text" placeholder='https://' value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="border-solid border-2 border-input rounded-md w-full py-2 px-3 mb-2 focus:border-primary focus:shadow-[0_0_0_0.2rem_rgb(0,95,204,0.15)] focus:outline-0"
                />
                <button className="p-2 rounded-md bg-input-light hover:bg-input w-full">Add</button>
              </form> */}
              Coming soon... have to work out a CORS issue.
            </TabsContent>
            <TabsContent value="unsplash">
              {/* Unsplash coming soon */}
              <UnsplashTab setShowModal={setShowModal}/>
            </TabsContent>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PhotoUpload;
