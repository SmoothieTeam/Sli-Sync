import React from 'react';
import SharePanel from '../components/SharePanel';
import './UploadedPage.css';

function UploadedPage({title=''}) {
    const sendEmail = () => {};
    const copyLink = () => {};

    return (<div>
        <div className='header'></div>
        <img src='cloud_done_b.svg' className='done_image'/>
        <h2 className='done'>DONE</h2>
        <div className='announcement'>
            Please check the results through the link below and get sharable link : )
        </div>

        <SharePanel 
                link={'http://localhost:3000/#/loading/1'}
                title={title}
                events={{sendEmail, copyLink}}/>

        {/* <button className='url' name='category' value='url' onClick={() => setCategory('url')} onChange={onCategoryChange} checked={isCheckedInCategory('url')}>Url</button>
        <button className='email' name='category' value='email' onClick={() => setCategory('email')} onChange={onCategoryChange} checked={isCheckedInCategory('email')}>Email</button>
        
        { showPopup ? <div className='share_panel_popup'>{popupTexts[category]}</div> : <div></div>}
        <button className='share' type='submit' onClick={onClick}>{submitTexts[category]} <img src='share.svg' className='button_share_image'></img></button>
        <div className='title'>Operating System</div>
        <hr/>
        <input className='share_email' value="http://localhost:3000/#/loading/1"/> */}
    </div>);
}

export default UploadedPage;