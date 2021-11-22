import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import HeaderBuilder from '../components/HeaderBuilder';


function HomePage() {
    const headerBuilder = new HeaderBuilder();

    return (<div className='home-page'>
        { headerBuilder.addTextIcon().addUploadButton({to: '/upload/1'}).build() }
        <div className='home-page__main'>
            <img src='HomePage_Pic.png'/>

            <h2>Video + Slide</h2>
            <p>
                Find the moment of the video with the slide! <br/>
                When you watch the video, you can only find the parts you need.
            </p>

            <h3>YOU CAN START NOW</h3>
            <p>
                Click on the button
            </p>

            <Link
                className='home-page__browse-button' 
                to='/upload'>
                Browse files
            </Link>
            <footer className='footer'>
                <h1>Contact us</h1>
                <p>
                    서지원 | jwsuh0205@hanyang.ac.kr<br/>
                    이평원 | nullist123@hanyang.ac.kr
                </p>
            </footer>
        </div>
    </div>);
}

export default HomePage;