import React, { useState, useRef, ChangeEvent } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BackgroundSettings } from './Result';
import { BgMode } from '@/util/enums';
import { useBackgroundContext } from '@/contexts/BackgroundContext';

// import UnsplashTab from './unsplashTab.js';

function PhotoUpload({
  // unsplashPhotoClick
  // DELETE
  // onFileChange,
  // imageUrl,
  // setImageUrl,
  // useImageURL,
  // onClickAddImage,
} : {
  // unsplashPhotoClick
  // DELETE
  // onFileChange: (e: ChangeEvent<HTMLInputElement>) => void,
  // imageUrl: string | null,
  // setImageUrl: (i: string) => void,
  // useImageURL: (e: any) => void,
  // onClickAddImage: () => void
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
    })
    setShowModal(false);
  }

  const onClickAddImage = () => {
    setShowModal(true);
    setBackground({
      ...background,
      mode: BgMode.Image
    })
  }

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // const file = e.target?.files[0];
    const files = e.target?.files;
    if (files){
      const file = files[0];
      setBackground({
        ...background,
        selectedFile: file
      });
      console.log("file read:", file.name);
      let reader = new FileReader();
      reader.onload = () => setBackground({...background, bgImg: reader.result});
      reader.readAsDataURL(file);
      setShowModal(false);
    }
  }

  return (
    <Dialog open={showModal}>
      <DialogTrigger asChild onClick={onClickAddImage}>
        <button className='p-2 rounded-md bg-input-light whitespace-nowrap w-full text-foreground hover:bg-input'>
          Add background image
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set background image</DialogTitle>
          <Tabs defaultValue="upload">
            <TabsList>
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="url">URL</TabsTrigger>
              <TabsTrigger value="unsplash">Unsplash</TabsTrigger>
            </TabsList>
            <TabsContent value="upload">
              <label className="block text-center p-2 cursor-pointer rounded-md bg-input-light hover:bg-input w-full">
              {/* id='photo-upload' */}
                <input type="file" onChange={onFileChange} accept="image/jpeg, image/png"
                  className="h-0 w-0" />
                  Browse
              </label>
            </TabsContent>
            <TabsContent value="url">
              {/* id='image-url' */}
              <form action={void(0)} onSubmit={confirmImageURL} >
                <label htmlFor="image-url" hidden>Image URL</label>
                <input id="image-url" type="text" placeholder='https://' value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="border-solid border-2 border-input rounded-md w-full py-2 px-3 mb-2 focus:border-primary focus:shadow-[0_0_0_0.2rem_rgb(0,95,204,0.15)] focus:outline-0"
                />
                <button className="p-2 rounded-md bg-input-light hover:bg-input w-full">Add</button>
              </form>
            </TabsContent>
            <TabsContent value="unsplash">fdafdas</TabsContent>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </Dialog>

    // <Modal
    //   {...props}
    //   size="lg"
    //   aria-labelledby="contained-modal-title-vcenter"
    //   centered
    // >
    //   <Modal.Header closeButton>
    //     Select background image
    //   </Modal.Header>
    //   <Modal.Body>
    //     <Tabs fill defaultActiveKey="upload">
    //       <Tab eventKey="upload" title="Upload">
    //         <label id='photo-upload'>
    //           <input type="file" onChange={onFileChange} accept="image/jpeg, image/png"/>
    //             Browse
    //         </label>
    //       </Tab>
    //       <Tab eventKey="url" title="URL">
    //         <div id='image-url'>
    //           <form action={void(0)} onSubmit={useImageURL} >
    //             <input type="text" placeholder='https://' value={imageUrl} onChange={(e) => setImageURL(e.target.value)}/>
    //             <button>Add</button>
    //           </form>
    //         </div>
    //       </Tab>
    //       <Tab eventKey="unsplash" title="Unsplash">
    //         {/* <UnsplashTab
    //           handlePhotoClick={unsplashPhotoClick}
    //         /> */}
    //       </Tab>
    //     </Tabs>
    //   </Modal.Body>
    // </Modal>
  );
}

export default PhotoUpload;
