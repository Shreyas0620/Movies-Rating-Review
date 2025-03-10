import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import Loader from "./Notifications/Loader";
import { uploadImageService } from "../Redux/APIs/ImageUploadService";

function Uploader({ setImageUrl, type = "image" }) {
    const [loading, setLoading] = useState(false);

    // Upload file
    const onDrop = useCallback(
        async (acceptedFiles) => {
            const file = new FormData();
            file.append("file", acceptedFiles[0]);
            // console.log("File to upload:", acceptedFiles[0]); // Debugging

            try {
                const data = await uploadImageService(file, setLoading);
                // console.log("Image URL set:", data.fileUrl); // Debugging: Log the fileUrl
                setImageUrl(data.fileUrl); // Pass only the fileUrl to setImageUrl
            } catch (error) {
                // console.error("Upload failed:", error);
            }
        },
        [setImageUrl]
    );

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        multiple: false,
        onDrop,
        accept: type === "image" ? "image/jpeg, image/png" : "video/mp4, video/mpeg, audio/mp3",
    });

    return (
        <div className="w-full text-center flex-col gap-6">
            {loading ? (
                <div className="px-6 w-full py-8 border-2 border-border border-dashed bg-dry rounded">
                    <Loader />
                </div>
            ) : (
                <div
                    {...getRootProps()}
                    className="px-6 w-full py-8 border-2 border-border border-dashed bg-main"
                >
                    <input {...getInputProps()} />
                    <span className="mx-auto flex-colo text-subMain text-3xl">
                        <FiUploadCloud />
                    </span>
                    <p className="text-sm mt-2">
                        {type === "image" ? "Drag Your Image Here" : "Drag Your Video Here"}
                    </p>
                    <em className="text-xs text-border">
                        {isDragActive
                            ? "Drop it like it's Amazing"
                            : isDragReject
                            ? "Unsupported file type..."
                            : type === "image"
                            ? "(Only .jpg and .png files will be accepted)"
                            : "(Only .mp4, .mpeg, and .mp3 files will be accepted)"}
                    </em>
                </div>
            )}
        </div>
    );
}

export default Uploader;