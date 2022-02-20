import React from "react";
import FileProgress from "../common/FileProgress";

function PostFileProgress({ video, slide }) {
  return (
    <div className="upload-page__progress-container">
      <FileProgress className="progress-container__progress" {...slide} />
      <FileProgress className="progress-container__progress" {...video} />
    </div>
  );
}

export default PostFileProgress;
