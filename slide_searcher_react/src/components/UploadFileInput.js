import React, { useState } from "react";
import './UploadFileInput.css';

function UploadFileInput({ className, text, onChangeFile, accept }) {
    const handleFile = (e) => {
        onChangeFile(e.target.files[0]);
    };
    
    return (
        <div className={className}>
            <label className='file_input_label' htmlFor='file_input'>{text}</label>
            <input className='file_input' id='file_input' type="file" accept={accept} onChange = {handleFile}/>
        </div>
    );
}

export default UploadFileInput;