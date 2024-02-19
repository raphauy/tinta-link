import { getCurrentUser } from "@/lib/auth"
import { setUserImage } from "@/services/userService";
import { revalidatePath } from "next/cache";
import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"
 
const f = createUploadthing()
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await getCurrentUser()
 
      if (!user) throw new UploadThingError("Unauthorized");
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id, userEmail: user.email }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("userId:", metadata.userId)
      console.log("userEmail:", metadata.userEmail)
      console.log("file url", file.url);

      await setUserImage(metadata.userId, file.url)
      revalidatePath("/user")
 
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;