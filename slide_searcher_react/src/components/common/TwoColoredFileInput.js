import React from "react";
import "./TwoColoredFileInput.css";

function TwoColoredFileInput({ className, id, text, onChangeFile, accept }) {
  const handleFile = (e) => {
    onChangeFile(e.target.files[0]);
  };

  return (
    <div className={`two-colored-file-input ${className}`}>
      <label htmlFor={id}>{text}</label>
      <input id={id} type="file" accept={accept} onChange={handleFile} />
    </div>
  );
}

export default TwoColoredFileInput;
