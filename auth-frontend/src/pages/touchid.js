// TouchID.js

import React from 'react';
import logo from '../components/YorkU_logo.png';
import './MathAuth.css';

function TouchID() {
  return (
    <div className="MathAuth">
      <header className="Banner_Logo">
        <img src={logo} className="org-logo" alt="York University Logo" />
      </header>

      <div className="header-banner">
        <h1 className="passport-text">Passport York Login</h1>
      </div>

      <div className="math-container">
        {/* Add any additional content for the TouchID page here */}
      </div>
    </div>
  );
}

export default TouchID;
