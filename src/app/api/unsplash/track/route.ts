import { NextRequest } from "next/server";
import { createApi } from "unsplash-js";

const accessKey = process.env.UNSPLASH_ACCESS!;
const unsplash = createApi({
  accessKey
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const downloadLocation = searchParams.get("downloadLocation")!;
  const response = await unsplash.photos.trackDownload({
    downloadLocation
  });
  if (response?.status == 200){
    return Response.json(response);
  };
  return Response.error();
}