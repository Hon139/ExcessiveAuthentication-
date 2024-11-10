import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../components/YorkU_logo.png';
import axios from 'axios';
import elfchad from '../components/elfchad.png';
import './pages.css';

function SSC() {
  const [restorePasswords, setRestorePasswords] = useState(['', '']);
  const [restoredMessage, setRestoredMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Set base URL for axios requests
  const API_BASE_URL = 'https://excessive-auth-48591cafe177.herokuapp.com';

  // Function to update passwords for restore operation
  const handleRestorePasswordChange = (index, value) => {
    const newPasswords = [...restorePasswords];
    newPasswords[index] = value;
    setRestorePasswords(newPasswords);
  };

  // Function to call /restore endpoint and retrieve the secret
  const handleRestoreSecret = async () => {
    try {
      setError('');
      const response = await axios.post(`${API_BASE_URL}/restore`, restorePasswords);
      const data = response.data;

      // Check if response data matches the expected secret "Hello World!"
      if (data === "Hello World!") {
        setRestoredMessage("Elfchad approves you!");
      } else {
        setRestoredMessage('');
        setError('Incorrect passwords. Please try again.');
      }
    } catch (error) {
      setError('Failed to restore the secret. Please check the passwords and try again.');
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
        <h2>Secret Sharing with Shamir's Scheme</h2>

        <div className="restore-section">
          <img src={elfchad} className="elfchad-image" alt="Elfchad Character" />
          <p>Elfchad is impressed with your performance for coming this far. Enter your secret passwords, and Elfchad will let you through.</p>
          
          {restorePasswords.map((password, index) => (
            <input
              key={index}
              type="password"
              placeholder={`Password ${index + 1}`}
              value={password}
              onChange={(e) => handleRestorePasswordChange(index, e.target.value)}
              className="password-input"
            />
          ))}

          <button onClick={handleRestoreSecret} className="restore-button">Restore Secret</button>

          {restoredMessage && <p className="success-message">{restoredMessage}</p>}

          {restoredMessage && (
            <button onClick={() => navigate('/vibe')} className="next-button">
              Next
            </button>
          )}
        </div>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default SSC;
