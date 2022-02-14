import React from "react";
import HeaderBuilder from "../components/HeaderBuilder";
import UploadPageComponents from "../page_components/upload_page";
import "./UploadPage.css";

function UploadPage() {
  const builder = new HeaderBuilder();

  return (
    <div className="upload-page">
      {builder.build()}
      <div className="upload-page__main">
        <UploadPageComponents.TitleContainer />
        <UploadPageComponents.PostInput />
        <UploadPageComponents.PostTitleInput />
        <UploadPageComponents.PostSubmit />
      </div>
    </div>
  );
}

export default UploadPage;
