import React, { Component, useState } from 'react';
import './UploadedPage.css';

function UploadedPage({events: {sendEmail, copyLink}}) {
    const [showPopup, setShowPopup] = useState(false);
    const [category, setCategory] = useState('url');

    const submitTexts = {
        url: 'Copy link to share',
        email: 'Send Email'
    };

    const popupTexts = {
        url: 'Link Copyed!',
        email: 'Email Sended!'
    };

    const onCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const submitEvents = {
        url: copyLink,
        email: sendEmail
    };

    const showPopupEvent = () => {
        setShowPopup(true);
        setTimeout(() => {setShowPopup(false)}, 500);
    };

    const onClick = () => {
        showPopupEvent();
        submitEvents[category]();
    };

    const isCheckedInCategory = (v) => {
        return category == v;
    }
    return (<div>
        <div className='header'></div>
        <img src='cloud_done_b.svg' className='done_image'/>
        <h2 className='done_ment'>DONE</h2>
        <div className='announce_ment'>
            Please check the results through the link below and get sharable link : )
        </div>
            <button className='url' name='category' value='url' onClick={() => setCategory('url')} onChange={onCategoryChange} checked={isCheckedInCategory('url')}>Url</button>
            <button className='email' name='category' value='email' onClick={() => setCategory('email')} onChange={onCategoryChange} checked={isCheckedInCategory('email')}>Email</button>
            
            { showPopup ? <div className='share_panel_popup'>{popupTexts[category]}</div> : <div></div>}
            <button className='share' type='submit' onClick={onClick}>{submitTexts[category]} <img src='share.svg' className='button_share_image'></img></button>
        <div className='title'>Operating System</div>
        <hr/>
        <input className='share_email' value="http://localhost:3000/#/loading/1"/>
    </div>);
}

export default UploadedPage;