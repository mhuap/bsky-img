import { avatarUriToCid } from "./getPost";

export default class PostDTO {
  author: {
    handle: string,
    displayName: string,
    avatarCid: string,
    did: string,
  };
  text: string;
  date: Date;

  constructor(post: any, did: string) {
    const { handle, displayName, avatar } = post.author;
    const avatarCid = avatarUriToCid(post.author.avatar)!;
    this.author = { handle, displayName, avatarCid, did };
    this.text = post.record.text;
    this.date = post.record.createdAt;
  }
  
}