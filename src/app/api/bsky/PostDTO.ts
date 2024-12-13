// import { avatarUriToCid } from "./getPost";

export default class PostDTO {
  author: {
    handle: string,
    displayName: string,
    // avatarCid: string,
    avatarCid: string,
    did: string,
    avatarUrl?: string,
  };
  text: string;
  date: Date;

  constructor(post: any, did: string, avatarCid: string) {
    const { handle, displayName } = post.author;
    this.author = { handle, displayName, avatarCid, did };
    this.text = post.record.text;
    this.date = post.record.createdAt;
  }

  public set avatarUrl(url: string) {
    console.log("setting...");
    this.author.avatarUrl = url;
  }
  
}