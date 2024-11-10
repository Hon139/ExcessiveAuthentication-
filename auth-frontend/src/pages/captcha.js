import React, { useState, useEffect } from 'react';
import logo from '../components/YorkU_logo.png';
import './pages.css';
import ReCAPTCHA from 'react-google-recaptcha';
function Captcha(){
  const [capVal, setCapVal] = useState(null);
  return (
    <div className="MathAuth">
      <header className="Banner_Logo">
        <img src={logo} className="org-logo" alt="York University Logo" />
      </header>

      <div className="header-banner">
        <h1 className="passport-text">Passport York Login</h1>
      </div>
        <div> TITLE</div>
        <ReCAPTCHA 
        sitekey="6Ldtb3oqAAAAAAQI2IySLzcTZuA9QxA6-tNUrRbF"
        onChange={(val) => setCapVal(val)}
        />

        <button > Submit</button>
    </div>
  );
}

export default Captcha;
