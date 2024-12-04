import { NextRequest } from "next/server";
import { sourceMapsEnabled } from "process";
import { createApi } from 'unsplash-js';
import PhotoDTO from "./PhotoDTO";

const accessKey = process.env.UNSPLASH_ACCESS!;
const unsplash = createApi({
  accessKey
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query")!;
  const response = await unsplash.search
    .getPhotos({
      query,
      perPage: 20,
      page: 1
    }).then(response => {
      const photos = response.response?.results.map(p => new PhotoDTO(p));
      return {
        status: response.status,
        total: photos?.length,
        photos
      };
    })
    .catch((e) => {
      console.error("Unsplash GET failed");
      console.error(e);
    });
  if (response?.status == 200){
    // return Response.json(response.response?.results);
    return Response.json(response);
  }
  return Response.error();
}