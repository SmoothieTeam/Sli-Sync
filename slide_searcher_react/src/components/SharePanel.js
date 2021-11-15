import React, { useState } from "react";
import './SharePanel.css';

function SharePanel({className, title, link, events: {sendEmail, copyLink}}) {
    const [category, setCategory] = useState('url');
    const [showPopup, setShowPopup] = useState(false);

    const submitTexts = {
        url: 'Copy link to share',
        email: 'Send Email'
    };

    const popupTexts = {
        url: 'Link Copyed!',
        email: 'Email Sended!'
    }

    const submitEvents = {
        url: copyLink,
        email: sendEmail
    };

    const showPopupEvent = () => {
        setShowPopup(true);
        setTimeout(() => {setShowPopup(false)}, 500);
    }

    const onCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const onClick = () => {
        showPopupEvent();
        submitEvents[category]();
    };

    const isCheckedInCategory = (v) => {
        return category === v;
    };

    return (
        <div className={className}>
            <input id='urlRadio' type='radio' className='share_panel_button url' name='category' value='url' onChange={onCategoryChange} checked={isCheckedInCategory('url')}/>
            <label htmlFor='urlRadio'>URL</label>
            <input id='emailRadio' type='radio' className='share_panel_button email' name='category' value='email' onChange={onCategoryChange} checked={isCheckedInCategory('email')}/>
            <label htmlFor='emailRadio'>Email</label>

            <div id='sharePanelTitle'>{title}</div>

            <hr id='sharePanelDivider'></hr>

            <div className='share-panel-container'>
                <input className='share_panel_text' type='text' value={category === 'url' ? link : undefined}/>
                <div className='share_panel_submit_container'>
                    { showPopup ? <div className='share_panel_popup'>{popupTexts[category]}</div> : <div></div>}
                    <button className={`share_panel_submit submit_${category}`} type='submit' onClick={onClick}>{submitTexts[category]}</button>
                </div>
            </div>
        </div>
    );
}

export default SharePanel;