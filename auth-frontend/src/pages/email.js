import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../components/YorkU_logo.png';
import toilet from '../components/toilet.png';
import axios from 'axios';
import './pages.css';

function EmailVerification() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const navigate = useNavigate();
  
  // Base URL for API
  const API_BASE_URL = 'https://excessive-auth-48591cafe177.herokuapp.com';

  // Send email with verification code
  const handleSendEmail = async () => {
    try {
      setError('');
      setMessage('');
      const response = await axios.put(`${API_BASE_URL}/sendEmail`, "tuczynskis@gmail.com", {
        headers: { 'Content-Type': 'text/plain' },
      });
      setIsCodeSent(true);
      setMessage(response.data); // Display "Email Sent!" or any other message
    } catch (error) {
      setError('Failed to send email. Please try again.');
    }
  };

  // Verify the code entered by the user
  const handleVerifyCode = async () => {
    try {
      setError('');
      setMessage('');
      const response = await axios.post(
        `${API_BASE_URL}/verifyCode`, parseInt(code, 10), 
        { headers: { 'Content-Type': 'application/json' } }
      );
      setMessage(response.data);
      setIsVerified(true); // Mark as verified
    } catch (error) {
      setError('Failed to verify the code. Please try again.');
    }
  };

  return (
    <div className="EmailVerification">
      <header className="Banner_Logo">
        <img src={logo} className="org-logo" alt="York University Logo" />
      </header>

      <div className="header-banner">
        <h1 className="passport-text">YUSoSecure</h1>
      </div>

      <div className="math-container">
        <h2>Email Verification</h2>
        <img src={toilet} className="toilet" alt="Toilet" />
        <p>Hmm, Skibidi Elf doesn't think you are John York, please verify your school email to access your account!</p>

        {/* Email Input Section */}
        <div className="input-section">
          <input
            type="email"
            className="input-box"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p></p>
          <button className="submit-button" onClick={handleSendEmail}>Send Verification Code</button>
        </div>


        {/* Code Verification Section */}
        {isCodeSent && (
          <div className="input-section">
            <input
              type="text"
              className="input-box"
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <p></p>
            <button className="submit-button" onClick={handleVerifyCode}>Verify Code</button>
          </div>
        )}

        {/* Messages */}
        {message && <p className="message">{message}</p>}
        {error && <p className="error">{error}</p>}

        {/* Navigation Button to TouchID after Verification */}
        {isVerified && (
          <button className="submit-button" onClick={() => navigate('/google')}>
            Proceed to next step
          </button>
        )}
      </div>
    </div>
  );
}

export default EmailVerification;
