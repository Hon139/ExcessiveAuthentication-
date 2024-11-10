import React, { useState } from 'react';
import logo from '../components/YorkU_logo.png';
import axios from 'axios';
import './pages.css';

function EmailVerification() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  // Base URL for API
  const API_BASE_URL = 'http://localhost:8080'; // Update if needed

  // Send email with verification code
  const handleSendEmail = async () => {
    try {
      setError('');
      setMessage('');
      const response = await axios.put(`${API_BASE_URL}/sendEmail`, email, {
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
        `${API_BASE_URL}/verifyCode`, parseInt(code, 10), // Send the code as JSON
        { headers: { 'Content-Type': 'application/json' } } // Set Content-Type to JSON
      );
      setMessage(response.data); // Display "Code Verified!" or "Invalid Code!"
    } catch (error) {
      setError('Failed to verify the code. Please try again.');
    }
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
        <h2>Email Verification</h2>

        {/* Email Input Section */}
        <div className="email-section">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSendEmail}>Send Verification Code</button>
        </div>

        {/* Code Verification Section */}
        {isCodeSent && (
          <div className="code-section">
            <input
              type="text"
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={handleVerifyCode}>Verify Code</button>
          </div>
        )}

        {/* Messages */}
        {message && <p>{message}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default EmailVerification;
