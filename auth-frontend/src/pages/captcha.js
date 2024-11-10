import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../components/YorkU_logo.png';
import './pages.css';
import ReCAPTCHA from 'react-google-recaptcha';
import ELF from '../components/elf.jpg';

function Captcha() {
  const [capVal, setCapVal] = useState(null);
  const navigate = useNavigate();

  // Handle CAPTCHA completion
  const handleCaptchaChange = (value) => {
    setCapVal(value); // Set CAPTCHA value
  };

  return (
    <div className="MathAuth">
      <header className="Banner_Logo">
        <img src={logo} className="org-logo" alt="York University Logo" />
      </header>

      <div className="header-banner">
        <h1 className="passport-text">Passport York Login</h1>
      </div>

      <div className="math-container">
        <h2 className="captcha-title">CAPTCHA</h2>
        <img src={ELF} className="elf-image" alt="Elf Character" />
        <p className="captcha-description">
          Elf (totally not ai generated) has been monitoring your activity and is suspicious of you being a bot. He uses his special attack: CAPTCHA! Complete the CAPTCHA to prove Elf wrong.
        </p>

        {/* CAPTCHA box */}
        <ReCAPTCHA
          sitekey="6Ldtb3oqAAAAAAQI2IySLzcTZuA9QxA6-tNUrRbF"
          onChange={handleCaptchaChange}
        />

        {/* Conditional "Next" button */}
        {capVal && (
          <button className="next-button" onClick={() => navigate('/mathauth')}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Captcha;
