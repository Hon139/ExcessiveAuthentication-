import React, { useState } from 'react';
import axios from 'axios';
import logo from '../components/YorkU_logo.png';
import './pages.css';

function SMS() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Send SMS with verification code
  const sendSms = async () => {
    try {
      const response = await axios.put(
        `https://excessive-auth-48591cafe177.herokuapp.com/sms/send`, 
        "+16474934403", // Send phoneNumber directly as a string
        {
          headers: {
            'Content-Type': 'text/plain', // Change Content-Type to text/plain if sending raw string
          },
        }
      );
      setMessage(response.data);
      setIsCodeSent(true);
    } catch (error) {
      setMessage('Error sending SMS');
      console.error("SMS sending error:", error);
    }
  };

  // Verify the received code
  const verifyCode = () => {
    if (verificationCode === '123456') {
      setIsVerified(true);
      setMessage('Code verified successfully!');
    } else {
      setMessage('Invalid code. Please try again.');
    }
  };

  return (
    <div className="face-id">
      <header className="Banner_Logo">
        <img src={logo} className="org-logo" alt="York University Logo" />
      </header>

      <div className="header-banner">
        <h1 className="passport-text">YUSoSecure</h1>
      </div>

      <div className="sms-container">
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
          className="sms-input"
        />
        <button onClick={sendSms} className="sms-button">Send Verification Code</button>

        {isCodeSent && (
          <>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter verification code"
              className="sms-input"
            />
            <button onClick={verifyCode} className="sms-button">Verify Code</button>
          </>
        )}

        {isVerified && (
          <p className="success-message">You are verified!</p>
        )}

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default SMS;
