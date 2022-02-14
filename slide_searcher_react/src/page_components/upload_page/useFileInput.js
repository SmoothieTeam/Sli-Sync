const useFileInput = (id) => {
  const [file, setFile] = useState();
  const [progress, setProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const completeUploaed = () => {
    setIsUploaded(true);
  };
  const removeAndUpload = async (fileToRemove, fileToUpload) => {
    removeFile(id, fileToRemove)
      .catch(console.log)
      .finally(() =>
        uploadFile(id, fileToUpload, setProgress, completeUploaed)
      );
  };
  const upload = (file) => {
    setIsUploaded(false);
    setFile((prevFile) => {
      removeAndUpload(prevFile, file);
      return file;
    });
  };
  const isUploading = () => file !== undefined;

  return {
    file,
    progress,
    isUploaded,
    upload,
    isUploading,
  };
};

export {
  useFileInput
};