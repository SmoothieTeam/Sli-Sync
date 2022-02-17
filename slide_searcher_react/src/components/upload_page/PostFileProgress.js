import React from "react";

function PostFileProgress({ video, slide }) {
  return (
    <div className="upload-page__progress-container">
      {slide.isUploading() ? (
        <FileProgress className="progress-container__progress" {...slide} />
      ) : (
        ""
      )}
      {video.isUploading() ? (
        <FileProgress className="progress-container__progress" {...video} />
      ) : (
        ""
      )}
    </div>
  );
}

export default PostFileProgress;
