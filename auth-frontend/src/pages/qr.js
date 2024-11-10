import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Secret, TOTP } from 'otpauth'; // Import classes directly
import logo from '../components/YorkU_logo.png';
import './pages.css';
import mongoFunk from './../Scripts/mongoFuncs.js';

function QR() {
  const [otpUrl, setOtpUrl] = useState('');

  useEffect(() => {
    // Generate TOTP secret
    const secret = new Secret({ size: 20 });
    // Create a new TOTP instance
    mongoFunk.updateEntries(1,secret);
    const totp = new TOTP({
      issuer: 'ExcessiveAuth',
      label: 'User@example.com', // Replace with actual user email or identifier
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: secret,
    });

    // Create the otpauth:// URL
    const otpauthUrl = totp.toString();
    setOtpUrl(otpauthUrl);
  }, []);

  return (
    <div className="MathAuth">
      <header className="Banner_Logo">
        <img src={logo} className="org-logo" alt="York University Logo" />
      </header>

      <div className="header-banner">
        <h1 className="passport-text">Passport York Login</h1>
      </div>

      {otpUrl ? (
        <>
          <QRCodeCanvas value={otpUrl} size={128} />
          <p className="secret-text">Scan this QR code to set up TOTP authentication.</p>
        </>
      ) : (
        <p>Loading QR Code...</p>
      )}
    </div>
  );
}

export default QR;
