const useUploadPostForm = (postCreateAPI, {postId, title, isUploaded}) => {
  const hasNonEmptyTitle = title.trim().length > 0;
  const isValid = hasNonEmptyTitle && isUploaded;
  const handleSubmit = () => {
    if(isValid) {
      postCreateAPI.createPost(postId, { title });
    }
  };

  return {
    handleSubmit,
  };
};

export { useUploadPostForm };
