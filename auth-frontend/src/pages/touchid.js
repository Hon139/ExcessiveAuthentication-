import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../components/YorkU_logo.png';
import drippy from '../components/drippy.png';
import './pages.css';

function TouchID() {
  const [authStatus, setAuthStatus] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to initiate Touch ID authentication
  const handleTouchID = async () => {
    try {
      const publicKeyCredentialCreationOptions = {
        challenge: new Uint8Array(32),
        rp: { name: "Gatekeeper" },
        user: {
          id: new Uint8Array(16),
          name: "tuczynskis@gmail.com",
          displayName: "Stefan Tuczynski"
        },
        pubKeyCredParams: [{ alg: -7, type: "public-key" }],
        authenticatorSelection: { authenticatorAttachment: "platform" },
        timeout: 60000,
        attestation: "none"
      };

      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions
      });

      if (credential) {
        setAuthStatus('Authentication successful!');
      } else {
        setAuthStatus('Authentication failed.');
      }
    } catch (err) {
      setError('Touch ID authentication failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="MathAuth">
      <header className="Banner_Logo">
        <img src={logo} className="org-logo" alt="York University Logo" />
      </header>

      <div className="header-banner">
        <h1 className="passport-text">YUSoSecure</h1>
      </div>

      <div className="math-container">
        <h2>Touch ID Authentication</h2>

        {/* Image and descriptive text */}
        <img src={drippy} className="drippy-image" alt="Drippy Character" />
        <p className="drippy-text">
          Yeo the Lion likes his cheese drippy bruh! He also likes his platforms secure, so he challenges you to authenticate using Touch ID.
        </p>

        <button onClick={handleTouchID} className="auth-button">
          Authenticate with Touch ID
        </button>
        
        {authStatus && <p className="auth-status">{authStatus}</p>}
        {error && <p className="error">{error}</p>}

        {/* New Button for Navigation to Captcha */}
        {authStatus === 'Authentication successful!' && (
          <button
            className="submit-button"
            onClick={() => navigate('/captcha')}
          >
            Proceed to next step
          </button>
        )}
      </div>
    </div>
  );
}

export default TouchID;
