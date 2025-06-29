import * as PhotoApi from "unsplash-js/dist/methods/photos/types";

export default class PhotoDTO {
  id: string;
  description: string | null;
  user: {
    username: string,
    name: string
  };
  urls: {
    regular: string,
    small: string,
  }; // urls.regular
  downloadLocation: string; //links.download_location

  constructor(photo: PhotoApi.Basic) {
    this.id = photo.id;
    this.description = photo.description;
    this.user = { 
      username: photo.user.username,
      name: photo.user.name
    };
    this.urls = {
      regular: photo.urls.regular,
      small: photo.urls.small
    };
    this.downloadLocation = photo.links.download_location;
  }
}