import React, { useState, useRef } from 'react';

import Modal from 'react-bootstrap/Modal';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import UnsplashTab from './unsplashTab.js';

function PhotoUpload(props) {
  const {
    onFileChange,
    useImageURL,
    imageUrl,
    setImageURL,
    // unsplashPhotoClick
  } = props;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        Select background image
      </Modal.Header>
      <Modal.Body>
        <Tabs fill defaultActiveKey="upload">
          <Tab eventKey="upload" title="Upload">
            <label id='photo-upload'>
              <input type="file" onChange={onFileChange} accept="image/jpeg, image/png"/>
                Browse
            </label>
          </Tab>
          <Tab eventKey="url" title="URL">
            <div id='image-url'>
              <form action={void(0)} onSubmit={useImageURL} >
                <input type="text" placeholder='https://' value={imageUrl} onChange={(e) => setImageURL(e.target.value)}/>
                <button>Add</button>
              </form>
            </div>
          </Tab>
          <Tab eventKey="unsplash" title="Unsplash">
            {/* <UnsplashTab
              handlePhotoClick={unsplashPhotoClick}
            /> */}
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}

export default PhotoUpload;
