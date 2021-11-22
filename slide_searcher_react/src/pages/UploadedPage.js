import React from 'react';
import HeaderBuilder from '../components/HeaderBuilder';
import SharePanel from '../components/SharePanel';
import './UploadedPage.css';

function UploadedPage({title=''}) {
    const sendEmail = () => {};
    const copyLink = () => {};

    const headerBuilder = new HeaderBuilder();

    return (<div className='uploaded-page'>
        { headerBuilder.build() }
        <div className='uploaded-page__main'>
            <img src='cloud_done_b.svg'/>
            <h2>DONE</h2>
            <p>
                Please check the results through the link below and get sharable link : )
            </p>
            <SharePanel 
                className='uploaded-page__share-panel'
                link={'http://localhost:3000/#/loading/1'}
                title={title}
                events={{sendEmail, copyLink}}/>
        </div>
    </div>);
}

export default UploadedPage;