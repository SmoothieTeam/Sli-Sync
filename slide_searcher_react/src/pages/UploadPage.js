import React from "react";
import HeaderBuilder from "../components/common/HeaderBuilder";
import UploadPageComponents from "../components/upload_page";
import "./UploadPage.css";
import { useUploadPage } from "../hooks/upload_page/useUploadPage";
import postUploader from "../firebase_models/posts";

function UploadPage() {
  const builder = new HeaderBuilder();
  const { 
    postId, 
    video, 
    slide,
    handleTitle, 
    handleUploaded, 
    handleSubmit 
  } = useUploadPage(postUploader);

  return (
    <div className="upload-page">
      {builder.build()}
      <div className="upload-page__main">
        <UploadPageComponents.PageText />
        <UploadPageComponents.PostFileInput
          video={video}
          slide={slide}
          onUploaded={handleUploaded}
        />
        <UploadPageComponents.PostTitleInput onChange={handleTitle} />
        <UploadPageComponents.PostSubmit
          postId={postId}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default UploadPage;
