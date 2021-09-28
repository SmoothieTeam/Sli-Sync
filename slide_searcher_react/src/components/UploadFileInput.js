import React from "react";
import './UploadFileInput.css';

function UploadFileInput({ className, id, text, onChangeFile, accept }) {
    const handleFile = (e) => {
        onChangeFile(e.target.files[0]);
    };
    
    return (
        <div className={className}>
            <label className='file_input_label' htmlFor={id}>{text}</label>
            <input className='file_input' id={id} type="file" accept={accept} onChange = {handleFile}/>
        </div>
    );
}

export default UploadFileInput;