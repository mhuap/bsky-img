import axios from "axios";
import RequestError from "./requestError";

export function urlMatchGroups(url: string | null){
  if (url != null) {
    const regexGen =
    /(?:https:\/\/)?bsky\.app\/profile\/(?<handle>(?:[a-z]|[A-Z]|\d|-|\.)+)\/post\/(?<postId>(?:\d|[a-z])+)/;
    const found = url?.match(regexGen);
    if (found != null && found.groups !== undefined) {
      return found.groups;
    }
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