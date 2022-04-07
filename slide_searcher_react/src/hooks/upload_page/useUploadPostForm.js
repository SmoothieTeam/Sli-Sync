const useUploadPostForm = (postCreateAPI, {postId, filenames, title, isUploaded}) => {
  const hasNonEmptyTitle = title.trim().length > 0;
  const isValid = hasNonEmptyTitle && isUploaded;
  const handleSubmit = () => {
    if(isValid) {
      postCreateAPI.createPost(postId, { title, filenames });
    }
  };

  return {
    handleSubmit,
  };
};

export { useUploadPostForm };
