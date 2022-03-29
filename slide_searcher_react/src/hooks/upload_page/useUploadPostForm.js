const useUploadPostForm = (postAPI, {postId, title, isUploaded}) => {
  const hasNonEmptyTitle = title.trim().length > 0;
  const isValid = hasNonEmptyTitle && isUploaded;
  const handleSubmit = () => {
    if(isValid) {
      postAPI.createPost(postId, { title });
    }
  };

  return {
    handleSubmit,
  };
};

export { useUploadPostForm };
