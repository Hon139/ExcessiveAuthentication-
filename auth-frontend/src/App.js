import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import logo from './components/YorkU_logo.png';
import JohnYork from './components/john_york.png';
import MathAuth from './pages/mathauth';
import TouchID from './pages/touchid';  // Import TouchID component
import SSC from './pages/ssc';  // Import SSC component
import EmailVerification from './pages/email';  // Import EmailVerification component
import Captcha from './pages/captcha';  // Import Captcha component
import './App.css';

const CORRECT_USR = "johnyork";
const CORRECT_PWD = "12345";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Main login page */}
      <Route path="/mathauth" element={<MathAuth />} /> {/* MathAuth page */}
      <Route path="/touchid" element={<TouchID />} /> {/* TouchID page */}
      <Route path="/ssc" element={<SSC />} /> {/* TouchID page */}
      <Route path="/email" element={<EmailVerification />} /> {/* TouchID page */}
      <Route path="/captcha" element={<Captcha />} /> {/* Captcha page */}
    </Routes>
  );
}

// Home component: Main login page
function Home() {
  const [userInputVal, setUserInputVal] = useState("");
  const [passInputVal, setPassInputVal] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const navigate = useNavigate();
  const handleUserInputChange = (e) => {
    setUserInputVal(e.target.value);
  };

  const handlePassInputChange = (e) => {
    setPassInputVal(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrMessage("");
    if (userInputVal === CORRECT_USR && passInputVal === CORRECT_PWD) {
      navigate('/mathauth');
    } else {
      setErrMessage("Incorrect username or password bozo 😂");
    }
  };

  return (
    <div className="Login_Page">
      <header className="Banner_Logo">
        <img src={logo} className="org-logo" alt="York University Logo" />
      </header>

      <div className="header-banner">
        <h1 className="passport-text">Passport York Login</h1>
      </div>

      <div className="centered-box-container">
        <div className="left-box">
          <div className="passport-info">
            <h1 className="passport-title">
              <span style={{ color: 'black' }}>Passport</span>{' '}
              <span style={{ color: '#d50000' }}>YORK</span>
            </h1>
            <p>
              <strong>Passport York</strong> authenticates you as a member of
              the York community and gives you access to a wide range of
              computing resources and services.
            </p>
            <hr style={{ margin: '20px 0' }} />
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <label className="login-label">
              <strong>Username:</strong>
              <input
                type="text"
                value={userInputVal}
                onChange={handleUserInputChange}
                className="login-input"
                placeholder="Enter your username"
              />
            </label>
            <label className="login-label">
              <strong>Password:</strong>
              <input
                type="password"
                value={passInputVal}
                onChange={handlePassInputChange}
                className="login-input"
                placeholder="Enter your password"
              />
            </label>
            <button type="submit" className="login-button">Login</button>
          </form>

          <div className="checkbox-container">
            <input type="checkbox" id="change-password" />
            <label htmlFor="change-password" className="checkbox-label">
              Click this box before logging in to change your Passport York password.
            </label>
          </div>

          {errMessage && <div className="error-message">{errMessage}</div>}
        </div>

        <div className="right-box">
          <p>Welcome back, John York! Due to suspicious activity, we implemented new security protocols to keep your account secure.</p>
          <header className="brainrot">
            <img src={JohnYork} className="john-york" alt="John York" />
          </header>
        </div>
      </div>
    </div>
  );
}

export default App;
