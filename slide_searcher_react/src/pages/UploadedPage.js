import React, { Component, useState } from 'react';
import './UploadedPage.css';

function UploadedPage() {
    const [text, settext] = useState('Copy link to share');

    return (<div>
        <div className='header'></div>
        <img src='cloud_done_b.svg' className='done_image'/>
        <h2 className='done_ment'>DONE</h2>
        <div className='announce_ment'>
            Please check the results through the link below and get sharable link : )
        </div>
            <button className='url' onClick={() => settext('Copy link to share')}>url</button>
            <button className='email' onClick={() => settext('Send Email')}>email</button>
        <div className='title'>Operating System</div>
        <hr/>
        <input className='share_email'/> <button className='share'> {text} <img src='share.svg' className='button_share_image'></img></button>
    </div>);
}

export default UploadedPage;