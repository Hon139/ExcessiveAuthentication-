import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../components/YorkU_logo.png';
import './pages.css';

function GoogleAuth() {

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
