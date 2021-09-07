import React from 'react';
import './LoadingPage.css';

function UploadedPage() {
    return (<div>
        <div className='header'></div>
        <div className='Loaing_Animation'>
            <div className='circle'>
                <img src='Loaing_Animation.png' className='done_image' />
            </div>
        </div>
        
        <h2>DONE</h2>
        Please check the results through the link below and get sharable link : ) <br/>
        <button>URL</button> <button>Email</button> <br/>
        <input /> <button>Share</button>
    </div>);
}

export default UploadedPage;