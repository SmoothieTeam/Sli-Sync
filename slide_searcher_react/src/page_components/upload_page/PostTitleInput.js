const PostTitleInput = ({ onChange = (f) => f }) => {
  const handleTitle = (e) => {
    onChange(e.target.value);
  };

  return (
    <input
      className="upload-page__title-input"
      type="text"
      onChange={handleTitle}
      name="Title"
      placeholder="Please enter a title for your video here!"
    />
  );
};

export {
  PostTitleInput
};