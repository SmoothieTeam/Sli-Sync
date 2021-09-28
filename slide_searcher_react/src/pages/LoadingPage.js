import React from 'react';
import './LoadingPage.css';

function LoadingPage() {
    return (<div>
        <div className='header'></div>
        <div className='loaing_animation'>
            <div className='circle'>
                <img src='Loaing_Animation.png' className='Loading_image1' />
                <img src='Loaing_Animation.png' className='Loading_image2' />
            </div>
        </div>
        <progress className='progress_bar' max="100" value="70"> 70% </progress>
        
        <div className='message'>
            <h2 className='loading_percent'>70%</h2>
            <div className='guide_ment'>
                It's <strong>Okay</strong> to move to another screen or exit window <br/>
                while we set things up for you!
            </div>
        </div>
        
    </div>);
}

export default LoadingPage;