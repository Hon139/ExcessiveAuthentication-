import React, { useState, useEffect } from 'react';
import logo from '../components/YorkU_logo.png';
import JohnYork from '../components/john_york.png'
import WebCam from 'react-webcam'
//import TextField from '@mui/material/TextField';
import './pages.css';

function FaceID() {
    const constraints = {
        width: 320,
        height: 480,
        facingMode: "user"
    }

    const [cameraOn, setCameraOn] = useState(false);
    
    const toggleCamera = () => {
        setCameraOn(prevState => !prevState);
    }

    return (
        <div className="face-id">
            <header className="Banner_Logo">
                <img src={logo} className="org-logo" alt="York University Logo" />
            </header>

            <div className="header-banner">
                <h1 className="passport-text">Passport York Login</h1>
            </div>


            <h3>John York Face ID time!</h3>
            <img src={JohnYork} className="john_york" alt="john york" />

            <button onClick={toggleCamera} className='camera-toggle'>{cameraOn ? "Turn camera off": "Turn camera on"}</button>

            {cameraOn && <WebCam
                audio={false}
                height={240}
                width={320}
                videoConstraints={constraints}
            />}


          



        </div>
      
  );
}

export default FaceID;