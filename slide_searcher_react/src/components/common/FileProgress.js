import "./FileProgress.css";

function FileProgress({ className, progressStatus }) {
  const progress = progressStatus.progress;
  if (progressStatus.isNotStarted) return "";
  return (
    <div className={`file-progress ${className}`}>
      <img
        className="file-progress__icon"
        src={progressStatus.isProgressing ? "/cloud.svg" : "/cloud_done.svg"}
        alt="cloud"
      />
      <div className="file-progress__progress-container">
        {Math.round(progress * 100)} %
        <br />
        <progress min={0} value={progress} />
        <br />
        {progressStatus.filename}
      </div>
    </div>
  );
}

export default FileProgress;
