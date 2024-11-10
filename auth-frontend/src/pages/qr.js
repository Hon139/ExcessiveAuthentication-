import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../components/YorkU_logo.png';
import './pages.css';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

function QR() {

  // const speakeasy = require('speakeasy');
  // const QRCode = require('qrcode');
  let imageDataURL;
  
  var secret = speakeasy.generateSecret({
      length: 20,
      name: "ExcessiveAuth"
  });
  // console.log(secret);
  
  QRCode.toDataURL(secret.otpauth_url, function(err, data) {
      imageDataURL = data;
  });

  return (
    <div className="MathAuth">
      <header className="Banner_Logo">
        <img src={logo} className="org-logo" alt="York University Logo" />
      </header>

      <div className="header-banner">
        <h1 className="passport-text">Passport York Login</h1>
      </div>
      <img src={imageDataURL} alt="QR Code" />
     
    </div>
  );
}



export default QR;
