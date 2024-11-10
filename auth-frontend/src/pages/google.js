import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../components/YorkU_logo.png';
import authImage from '../components/toilet.png'; // Placeholder image
import speakeasy from 'speakeasy';
import biden from '../components/biden.png';
import './pages.css';

function verify(tokenInput) {
  return speakeasy.totp.verify({
    secret: '>HKwB[[1PJP0[f(Nr]dV',
    encoding: 'ascii',
    token: tokenInput
  });
}

function GoogleAuth() {
  const [tokenInput, setTokenInput] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const navigate = useNavigate();

  // Handle token verification
  const handleVerifyCode = () => {
    setMessage('');
    setError('');

    const isValid = verify(tokenInput);
    if (isValid) {
      setIsVerified(true);
      setMessage('Code verified successfully!');
    } else {
      setError('Invalid code. Please try again.');
    }
  };

  return (
    <div className="GoogleAuth">
      <header className="Banner_Logo">
        <img src={logo} className="org-logo" alt="York University Logo" />
      </header>

      <div className="header-banner">
        <h1 className="passport-text">YUSoSecure</h1>
      </div>

      <div className="math-container">
        <h2>Google Authenticator Verification</h2>
        <img src={biden} className="biden-image" alt="Joe Biden" />
        <p>Joe biden welcomes you to the Lassonde Engineering community, hence the L. Now he wants to authenticate via google so he can be sure to give you free money!</p>

        {/* Code Verification Section */}
        <div className="input-section">
          <input
            type="text"
            className="input-box"
            placeholder="Enter verification code"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
          />
          <p></p>
          <button className="submit-button" onClick={handleVerifyCode}>Verify Code</button>
        </div>

        {/* Messages */}
        {message && <p className="message">{message}</p>}
        {error && <p className="error">{error}</p>}

        {/* Navigation Button to Next Step after Verification */}
        {isVerified && (
          <button className="submit-button" onClick={() => navigate('/touchid')}>
            Proceed to next step
          </button>
        )}
      </div>
    </div>
  );
}

export default GoogleAuth;
