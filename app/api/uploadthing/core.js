import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => {
      console.log("Middleware running. Token status:", !!process.env.UPLOADTHING_TOKEN);
      return { status: "ok" };
    })
    .onUploadError((error) => {
      console.error("Uploadthing Server Error:", error);
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete! File URL:", file.url);
      console.log("Upload Metadata:", metadata);
    }),
};
