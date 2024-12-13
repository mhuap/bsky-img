import axios from 'axios';
import { resolveHandle, getPosts, avatarUriToCid } from './getPost';
import { NextRequest } from 'next/server';
import PostDTO from './PostDTO';

// TODO: rewrite so regex is handled by client
export async function GET(request: NextRequest) {
  // https://bsky.app/profile/jessiegender.bsky.social/post/3lbtqamikfs2d
  const searchParams = request.nextUrl.searchParams;
  const handle = searchParams.get("handle");
  const postId = searchParams.get("postId");
  try {
    const didResponse = await resolveHandle(handle);
    const did = didResponse.did;
    const postsResponse = await getPosts(did, postId);
    const post = postsResponse.posts[0];
    const avatarCid = avatarUriToCid(post.author.avatar)!;
    const postDTO = new PostDTO(post, did, avatarCid);
    return Response.json(postDTO);
  } catch (e) {
    console.error(e);
    return Response.error();
  }
}