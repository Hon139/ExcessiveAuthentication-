import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../components/YorkU_logo.png';
import './pages.css';
import { TOTP } from 'otpauth'; // Import TOTP directly
import mongoFunk from './../Scripts/mongoFuncs.js';

function verify(tokenInput, secretInput) {
  const totp = new TOTP({
    secret: secretInput,
    encoding: 'ascii',
  });

  return totp.validate({ token: tokenInput });
}

function GoogleAuth() {
  const tokenInput = "123"; // Example token; replace with actual user input
  const secretInput = mongoFunk.getSecret(1); // Fetch the secret from your function
  const verifyStatus = verify(tokenInput, secretInput);

  return (
    <div className="MathAuth">
      <header className="Banner_Logo">
        <img src={logo} className="org-logo" alt="York University Logo" />
      </header>

      <div className="header-banner">
        <h1 className="passport-text">Passport York Login</h1>
      </div>

      <div>
        <p>Verification Status: {verifyStatus ? "Valid" : "Invalid"}</p>
      </div>
    </div>
  );
}

export default GoogleAuth;
