import React, { useState } from 'react';
import logo from '../components/YorkU_logo.png';
import './pages.css';

function AccessDenied() {
  const [showBox, setShowBox] = useState(true);

  const handleLinkClick = () => {
    setShowBox(false); // Hide the box and show "Hello World"
  };

  return (
    <div className="MathAuth">
      <header className="Banner_Logo">
        <a href="/" aria-label="Home">
          <img src={logo} className="org-logo" alt="York University Logo" />
        </a>
      </header>

      <div className="header-banner">
         <h1 className="passport-text">YUSoSecure</h1>
    </div>


      {showBox ? (
        <div>
          

          <div style={{
            backgroundColor: '#fdecea',
            border: '1px solid #f5c6cb',
            padding: '20px',
            margin: '20px',
            borderRadius: '4px',
            color: '#721c24',
            maxWidth: '800px',
            margin: '20px auto',
            textAlign: 'left'
          }}>
            <h2 style={{
              color: '#721c24',
              fontSize: '1.8rem',
              fontWeight: 'bold',
              marginBottom: '10px'
            }}>
              Access Denied
            </h2>
            <p>
              You are logged into Passport York with an account that is either:
            </p>
            <ul style={{ marginLeft: '20px', lineHeight: '1.6' }}>
              <li>not currently registered in any courses</li>
              <li>or not showing as <span style={{ fontWeight: 'bold' }}>active</span> in our employee database.</li>
            </ul>
            <p>
              If you are a former student, please go to <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" onClick={handleLinkClick} target="_blank" rel="noopener noreferrer">My Online Services</a> to access your student records.
            </p>
            <p>
              If you are a current employee, please have your department send an email to <a href="mailto:accounts@yorku.ca">accounts@yorku.ca</a> to request access.
            </p>
          </div>
        </div>
      ) : (
        <h1 style={{ textAlign: 'center', fontSize: '2rem', marginTop: '50px' }}>Hello World</h1>
      )}
    </div>
  );
}

export default AccessDenied;
