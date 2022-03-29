import React from "react";
import HeaderBuilder from "../components/common/HeaderBuilder";
import "./UploadPage.css";
import PostFilesInput from "../components/upload_page/PostFilesInput";
import PostTitleInput from "../components/upload_page/PostTitleInput";
import PostSubmit from "../components/upload_page/PostSubmit";
import { usePostId } from "../hooks/upload_page/usePostId";
import { usePostTitle } from "../hooks/upload_page/usePostTitle";
import { usePostFilesInput } from "../hooks/upload_page/usePostFilesInput";
import { useUploadPostForm } from "../hooks/upload_page/useUploadPostForm";

function UploadPage({ postCreateAPI }) {
  const header = new HeaderBuilder().build();
  const { postId } = usePostId(postCreateAPI);
  const { title, handleTitleChanged } = usePostTitle();
  const {
    filenames,
    videoProgressStatus,
    slideProgressStatus,
    handleVideoFileChanged,
    handleSlideFileChanged,
    isUploaded
  } = usePostFilesInput(postId, postCreateAPI);
  const { 
    handleSubmit
  } = useUploadPostForm(postCreateAPI, {postId, title, filenames, isUploaded});

  return (
    <div className="upload-page">
      {header}
      <div className="upload-page__main">
        <h2>UPLOAD FILES</h2>
        <p>MP4, PDF are supported</p>
        <PostFilesInput
          videoProgressStatus={videoProgressStatus}
          slideProgressStatus={slideProgressStatus}
          onVideoFileChanged={handleVideoFileChanged}
          onSlideFileChanged={handleSlideFileChanged}
        />
        <PostTitleInput onChange={handleTitleChanged} />
        <PostSubmit
          postId={postId}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default UploadPage;
