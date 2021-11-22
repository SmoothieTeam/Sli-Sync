import React, { useState } from 'react';
import { useParams } from 'react-router';
import HeaderBuilder from '../components/HeaderBuilder';
import LoadingAnimation from '../components/LoadingAnimation';
import './LoadingPage.css';

function LoadingPage({percentLoader}) {
    const { id } = useParams();
    const percentage = percentLoader.getPercentage(id);
    const [progress, setpercentage] = useState(percentage);

    const headerBuilder = new HeaderBuilder();

    return (<div className='loading-page'>
        { headerBuilder.build() }
        <div className='loading-page__main'>
            <LoadingAnimation className='load-page__animation'/>
            <progress max='100' value={progress}/>
            
            <h2>{progress}%</h2>
            <p>
                It's <strong>Okay</strong> to move to another screen or exit window <br/>
                while we set things up for you!
            </p>
        </div>
    </div>);
}

export default LoadingPage;