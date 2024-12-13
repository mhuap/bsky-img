import axios from "axios";
import RequestError from "./requestError";

export function avatarUriToCid(uri: string){
  console.log("AVATAR CID")
  const reg = /https:\/\/cdn\.bsky\.app\/img\/avatar\/plain\/did:plc:(?:[a-z]|\d)+\/(?<cid>(?:[a-z]|\d)+)/;
  const found = uri.match(reg);
  if (found != null && found.groups !== undefined) {
    return found.groups.cid;
  }
  return null;
}

export async function resolveHandle(handle: string | null){
  const endpoint = "https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle";
  console.log("RESOLVE HANDLE");
  try {
    let response = await axios.get(endpoint, {
      params: {
        handle
      }
    }).catch(e => {
      throw new RequestError("Error resolving handle.");
    })
    let json = await response.data;
    return json;
  } catch(e) {
    console.error(e);
  }
}

export async function getPosts(did: string, postId: string | null){
  console.log("GET POSTS");
  const endpoint = "https://public.api.bsky.app/xrpc/app.bsky.feed.getPosts";
  const uri = "at://" + did + "/app.bsky.feed.post/" + postId;
  try {
    let response = await axios.get(endpoint, {
      params: {
        uris: [
          uri
        ]
      }
    }).catch(e => {
      console.error(e);
      throw new RequestError("Error getting post.");
    })
    let json = await response.data;
    return json;
  } catch(e) {
    console.error(e);
  }
}