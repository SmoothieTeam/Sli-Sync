import React from "react";

function PostTitleInput({ onChange = (f) => f }) {
  const handleTitle = (e) => {
    onChange(e.target.value);
  };

  return (
    <input
      className="upload-page__title-input"
      data-testid="title-input"
      type="text"
      onChange={handleTitle}
      name="Title"
      placeholder="Please enter a title for your video here!"
    />
  );
}

export default PostTitleInput;
