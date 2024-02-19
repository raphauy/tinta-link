"use client"

import { UploadButton } from "@/lib/uploadthing";
import { BookOpen, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UploadPicker() {
    const router= useRouter()

    return (
        <UploadButton
            className="ut-button:bg-background ut-button:text-black/50 ut-button:w-11 ut-button:"
            content={{
                button({ready}) {
                    if (ready) return <Upload size={26} />

                    return <div>...</div>
                },
            allowedContent({ ready, fileTypes, isUploading }) {
                return "4MB"
                },
            }}
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res)
                router.refresh()
            }}
            onUploadError={(error: Error) => {
                console.log("Error: ", error.message)            
            }}
        />
    )
}
