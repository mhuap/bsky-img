export default class PostDTO {
  author: {
    handle: string,
    displayName: string,
    avatar: string
  };
  text: string;
  date: Date;

  constructor(post: any) {
    const { handle, displayName, avatar } = post.author;
    this.author = { handle, displayName, avatar }
    this.text = post.record.text;
    this.date = post.record.createdAt;
  }
}