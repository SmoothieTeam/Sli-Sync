import FileProgress from "../common/FileProgress";
import TwoColoredFileInput from "../common/TwoColoredFileInput";

const PostFilesInput = ({
  onVideoFileChanged = (f) => f,
  onSlideFileChanged = (f) => f,
  videoProgressStatus,
  slideProgressStatus,
}) => {
  return (
    <>
      <TwoColoredFileInput
        className="upload-page__file-input"
        id="videoInput"
        text="Select Video"
        accept="video/*"
        onChangeFile={onVideoFileChanged}
      />
      <TwoColoredFileInput
        className="upload-page__file-input"
        id="pdfInput"
        text="Select PDF"
        accept=".pdf"
        onChangeFile={onSlideFileChanged}
      />
      <div className="upload-page__progress-container">
        <FileProgress className="progress-container__progress" progressStatus={slideProgressStatus}/>
        <FileProgress className="progress-container__progress" progressStatus={videoProgressStatus} />
      </div>
    </>
  );
};

export default PostFilesInput;
