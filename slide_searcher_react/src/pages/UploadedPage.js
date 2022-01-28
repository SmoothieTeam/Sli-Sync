import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeaderBuilder from '../components/HeaderBuilder';
import SharePanel from '../components/SharePanel';
import './UploadedPage.css';

function UploadedPage({getPostTitle, sendEmail, copyLink}) {
    const { id } = useParams();
    const headerBuilder = new HeaderBuilder();
    const [title, setTitle] = useState('');

    useEffect(() => {
        getPostTitle(id).then(setTitle);
    });

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
                link={`http://${window.location.host}/#/loading/${id}/`}
                title={title}
                sendEmail={sendEmail}
                copyLink={copyLink}/>
        </div>
    </div>);
}

export default UploadedPage;