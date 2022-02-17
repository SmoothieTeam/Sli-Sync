import { useState } from "react";
import { useFileInput } from "./useFileInput";

const usePostFiles = (postId, postUploader) => {
  const video = useFileInput(postId, postUploader);
  const slide = useFileInput(postId, postUploader);
  return { video, slide };
};

const useUploadPage = (postUploader) => {
  const postId = postUploader.newPostId();
  const [title, setTitle] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const { video, slide } = usePostFiles(postId, postUploader);
  const handleSubmit = () => {
    const valid = () => title.trim() !== "" && isUploaded;
    if (valid()) postUploader.uploadPost(postId, { title });
  };
  const handleTitle = setTitle;
  const handleUploaded = setIsUploaded;
  return {
    postId,
    video,
    slide,
    handleTitle,
    handleSubmit,
    handleUploaded,
  };
};

export { useUploadPage };
