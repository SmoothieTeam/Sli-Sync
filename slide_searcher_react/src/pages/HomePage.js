import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';


function HomePage() {
    return (<div>
        <div className='header'>
            <span className='title'>Sli-Sync</span>
            <Link className='upload_button' to="/upload/1" type="submit">Upload files</Link>

        </div>
        <div className='loaing_animation'>
            <img src='HomePage_Pic.png' className='done_image' />
        </div>
        <div className='inform_message'>
            <h2 className='inform'>Video + Slide</h2>
            <div className='inform_ment'>
                Find the moment of the video with the slide! <br/>
                When you watch the video, you can only find the parts you need.
            </div>
        </div>
        <div className='start_message'>
            <h2 className='start'>YOU CAN START NOW</h2>
            <div className='start_ment'>
                Click on the button
            </div>
            <Link className='browse_button' to="/upload" type="submit">Browse files</Link>

        </div>
        <div className='contact_message'>
            <span className='contact'>Contact us<br/></span>
            <span className='email'>
                서지원 | jwsuh0205@hanyang.ac.kr<br/>
                이평원 | nullist123@hanyang.ac.kr
            </span>
        </div>
    </div>);
}

export default HomePage;