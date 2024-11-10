import React, { useState } from 'react';
import logo from '../components/YorkU_logo.png';
import axios from 'axios';
import './pages.css';

function SSC() {
  const [restorePasswords, setRestorePasswords] = useState(['', '']);
  const [restoredMessage, setRestoredMessage] = useState('');
  const [error, setError] = useState('');

  // Set base URL for axios requests
  const API_BASE_URL = 'http://localhost:8080'; // Change this to your backend URL if different

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
      const data = response.data; // Extract JSON data
      setRestoredMessage(data.message); // Display the message from the backend response
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
        <h1 className="passport-text">Passport York Login</h1>
      </div>

      <div className="math-container">
        <h2>Secret Sharing with Shamir's Scheme</h2>

        <div className="restore-section">
          <h3>Restore Secret</h3>
          <p>Enter passwords to restore the secret:</p>
          {restorePasswords.map((password, index) => (
            <input
              key={index}
              type="password"
              placeholder={`Password ${index + 1}`}
              value={password}
              onChange={(e) => handleRestorePasswordChange(index, e.target.value)}
            />
          ))}
          <button onClick={handleRestoreSecret}>Restore Secret</button>
          {restoredMessage && <p>{restoredMessage}</p>}
        </div>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default SSC;
