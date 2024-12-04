import axios from 'axios';
import { resolveHandle, getPosts, urlMatchGroups } from './getPost';
import { NextRequest } from 'next/server';
import PostDTO from './PostDTO';

// TODO: rewrite so regex is handled by client
export async function GET(request: NextRequest) {
  // https://bsky.app/profile/jessiegender.bsky.social/post/3lbtqamikfs2d
  const searchParams = request.nextUrl.searchParams;
  // const postURL = searchParams.get("postURL");
  // const groups = urlMatchGroups(postURL);
  const handle = searchParams.get("handle");
  const postId = searchParams.get("postId");
  try {
    const didResponse = await resolveHandle(handle);
    const postsResponse = await getPosts(didResponse.did, postId);
    const post = new PostDTO(postsResponse.posts[0]);
    return Response.json(post);
  } catch (e) {
    console.error(e);
    return Response.error();
  }
}