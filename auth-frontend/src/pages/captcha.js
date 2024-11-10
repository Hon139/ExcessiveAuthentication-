import React, { useState, useEffect } from 'react';
import logo from '../components/YorkU_logo.png';
import './pages.css';

function Captcha() {
  
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

export default Captcha;
