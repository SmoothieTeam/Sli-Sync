import { useEffect } from "react";
import { useFileInput } from "./useFileInput";

const PostFileInput = ({ postId = "", onUploaded = (isUploaded) => isUploaded, uploader }) => {
  const video = useFileInput(postId, uploader);
  const slide = useFileInput(postId, uploader);
  useEffect(() => {
    onUploaded(video.isUploaded && slide.isUploaded);
  }, [video.isUploaded, slide.isUploaded]);

  return (
    <>
      <TwoColoredFileInput
        className="upload-page__file-input"
        id="videoInput"
        text="Select Video"
        accept="video/*"
        onChangeFile={video.upload}
      />
      <TwoColoredFileInput
        className="upload-page__file-input"
        id="pdfInput"
        text="Select PDF"
        accept=".pdf"
        onChangeFile={slide.upload}
      />
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
    </>
  );
};

export {
  PostFileInput
};