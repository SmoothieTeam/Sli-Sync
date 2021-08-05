import React from 'react';
import { Link } from 'react-router-dom';

function MainPage({ slidedVideos }) {
    return (<div>
        <Link to='/upload'>Upload</Link>
        { slidedVideos.map(({video}, index) => <li key={index}><Link to={'/videoview/' + video}>{video}</Link></li>) }
    </div>);
}

export default MainPage;