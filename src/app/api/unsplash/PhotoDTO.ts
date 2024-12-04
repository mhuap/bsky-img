import * as PhotoApi from "unsplash-js/dist/methods/photos/types";

export default class PhotoDTO {
  id: string;
  user: {
    username: string,
    name: string
  };
  url: string; // urls.regular
  downloadLocation: string; //links.download_location

  constructor(photo: PhotoApi.Basic) {
    this.id = photo.id;
    this.user = { 
      username: photo.user.username,
      name: photo.user.name
    }
    this.url = photo.urls.regular;
    this.downloadLocation = photo.links.download_location;
  }
}