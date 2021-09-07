import React from 'react';
import './UploadedPage.css';

function UploadedPage() {
    return (<div>
        <div className='header'></div>
        <img src='cloud_done_b.svg' className='done_image'/>
        <h2>DONE</h2>
        Please check the results through the link below and get sharable link : ) <br/>
        <button>URL</button> <button>Email</button> <br/>
        <input /> <button>Share</button>
    </div>);
}

export default UploadedPage;