import { useState } from "react";

const useFileInput = (id, {replaceFile}) => {
  const [file, setFile] = useState();
  const [progress, setProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const isUploading = () => !isUploaded && file !== undefined;
  const upload = (file) => {
    const completeUpload = () => {
      setIsUploaded(true);
      setProgress(1);
    };  
    const reduceProgress = (progress) => setProgress((prevProgress) => progress > prevProgress ? progress : prevProgress);
    
    setIsUploaded(false);
    setProgress(0);
    setFile((prevFile) => {
      if (prevFile !== file) replaceFile(id, prevFile, file, reduceProgress, completeUpload);
      return file;
    });
  };

  return {
    file,
    progress,
    isUploaded,
    isUploading,
    upload,
  };
};

export {
  useFileInput
};