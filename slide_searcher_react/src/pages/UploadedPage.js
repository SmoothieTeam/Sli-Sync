import React, { Component, useState } from 'react';
import './UploadedPage.css';

function UploadedPage() {
    const [text, setText] = useState('Copy link to share');
    // onclick event에 넣어줄 인자를 을 어디서 처리할지를 명시. 인자를 받던 선언을 하던.
    // 빼는걸 추천함.
    return (<div>
        <div className='header'></div>
        <img src='cloud_done_b.svg' className='done_image'/>
        <h2 className='done_ment'>DONE</h2>
        <div className='announce_ment'>
            Please check the results through the link below and get sharable link : )
        </div>
            <button className='url' onClick={() => setText('Copy link to share')}>url</button>
            <button className='email' onClick={() => setText('Send Email')}>email</button>
        <div className='title'>Operating System</div>
        <hr/>
        <input className='share_email' value="http://localhost:3000/#/loading/1"/> <button className='share'> {text} <img src='share.svg' className='button_share_image'></img></button>
    </div>);
}

export default UploadedPage;