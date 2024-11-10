import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../components/YorkU_logo.png';
import './pages.css';
import OTOP from 'otpauth'; // Add this line to import OTOP
import mongoFunk from './../Scripts/mongoFuncs.js';


function verify (tokenInput, secretInput) {
  return OTOP.totp.verify({
      secret: secretInput,
      encoding: 'ascii',
      token: tokenInput
  });    
}


function GoogleAuth() {

  tokenInput = "123";
  secretInput = mongoFunk.getSecret(1);
  const verifyStatus = verify(tokenInput, secretInput);

  return (
    <div className="MathAuth">
      <header className="Banner_Logo">
        <img src={logo} className="org-logo" alt="York University Logo" />
      </header>

      <div className="header-banner">
        <h1 className="passport-text">Passport York Login</h1>
      </div>


     
    </div>
  );
}

export default GoogleAuth;
