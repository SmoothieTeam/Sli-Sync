import React from 'react';
import { Link } from 'react-router-dom';

function MainPage({ slidedVideos }) {
    return (<div>
        <Link to='/upload'>Upload</Link>
        { slidedVideos.map(({video}, index) => <li key={index}>{video}</li>) }
    </div>);
}

export default MainPage;