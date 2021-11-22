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
        <p className='share_panel'>
        <SharePanel 
                link={'http://localhost:3000/#/loading/1'}
                title={title}
                events={{sendEmail, copyLink}}/>
        </p>
    </div>);
}

export default UploadedPage;