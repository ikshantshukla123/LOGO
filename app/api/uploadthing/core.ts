import { createUploadthing, type FileRouter } from "uploadthing/server";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  productImage: f({ image: { maxFileSize: "4MB" } })
    .onUploadError(() => {
      throw new UploadThingError("Upload failed");
    })
    .onUploadComplete(async ({ file }) => {
      console.log("UPLOAD COMPLETE:", file.url);
      return { uploadedUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
