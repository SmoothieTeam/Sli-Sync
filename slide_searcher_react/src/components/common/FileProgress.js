import "./FileProgress.css";

function FileProgress({ className, file, progress }) {
  return (
    <div className={`file-progress ${className}`}>
      <img
        className="file-progress__icon"
        src={progress < 1.0 ? "cloud.svg" : "cloud_done.svg"}
        alt="cloud"
      />
      <div className="file-progress__progress-container">
        {Math.round(progress * 100)} %
        <br />
        <progress min={0} value={progress} />
        <br />
        {file.name}
      </div>
    </div>
  );
}

export default FileProgress;
