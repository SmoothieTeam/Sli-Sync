class FileProgressStatus {
  constructor(file, progress) {
    this.filename = file?.name;
    this.progress = progress;
    this.isProgressing = 0 < progress && progress < 1;
    this.isProgressed = progress === 1;
    this.isNotStarted = progress === 0;
  }
}

export default FileProgressStatus;