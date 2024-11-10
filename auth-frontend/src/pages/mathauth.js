import logo from '../components/YorkU_logo.png';

import React, { useState } from 'react'

import '../App.css';

function App() {

  return (
    <div className="Login_Page">
      <header className="Banner_Logo">
        <img src={logo} className= "org-logo" alt="logo" />
      </header>

      <div className="header-banner">
        <h1 className="passport-text">Passport York Login</h1>
      </div>

      <p>hello test!!</p>
    
    </div>
  );
}

export default App;
