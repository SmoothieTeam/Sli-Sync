import { useEffect, useState } from "react";
import { useFileInput } from "./useFileInput";

const usePostFiles = (postId, postUploader) => {
  const video = useFileInput(postId, postUploader);
  const slide = useFileInput(postId, postUploader);
  return { video, slide };
};

const useUploadPage = (postUploader) => {
  const [postId, setPostId] = useState();
  const [title, setTitle] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const { video, slide } = usePostFiles(postId, postUploader);
  const handleSubmit = () => {
    const isValid = () => title.trim() !== "" && isUploaded;
    if (isValid()) postUploader.uploadPost(postId, { title });
  };
  const handleTitle = setTitle;
  const handleUploaded = setIsUploaded;
  useEffect(() => {
    setPostId(postUploader.newPostId());
  }, []);
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
