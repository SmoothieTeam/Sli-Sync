import React from 'react';
import './UploadedPage.css';

function UploadedPage() {
    return (<div>
        <div className='header'></div>
        <img src='cloud_done_b.svg' className='done_image'/>
        <h2 className='done_ment'>DONE</h2>
        <div className='announce_ment'>
            Please check the results through the link below and get sharable link : )
        </div>
        <input className='url' type='button' value='url'></input><input className='email' type='button' value='email'></input>
        <div className='title'>Operating System</div>
        <hr/>
        <input className='share_url'/> <button className='share'>Copy link to share <img src='share.svg' className='button_share_image'></img></button>
    </div>);
}

export default UploadedPage;