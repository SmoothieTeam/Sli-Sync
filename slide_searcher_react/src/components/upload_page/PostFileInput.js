import { useEffect } from "react";
import TwoColoredFileInput from "../common/TwoColoredFileInput";

const PostFileInput = ({
  video,
  slide,
  onUploaded = (isUploaded) => isUploaded,
}) => {
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
    </>
  );
};

export default PostFileInput;
