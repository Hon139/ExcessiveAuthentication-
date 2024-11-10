import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../components/YorkU_logo.png';
import sunshine from '../components/sunshine.png'; // Assuming you have an image of Joe Biden saved in this path
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './pages.css';

function Vibe() {
  const [Q1res, setQ1Res] = useState("");
  const [Q2res, setQ2Res] = useState("");
  const [Q3res, setQ3Res] = useState("");
  const navigate = useNavigate();

  const handleQ1res = (e) => setQ1Res(e.target.value);
  const handleQ2res = (e) => setQ2Res(e.target.value);
  const handleQ3res = (e) => setQ3Res(e.target.value);

  const handleSubmit = () => {
    navigate('/access-denied');
  };

  return (
    <div className="vibe-check">
      <header className="Banner_Logo">
        <img src={logo} className="org-logo" alt="York University Logo" />
      </header>

      <div className="header-banner">
        <h1 className="passport-text">YUSoSecure</h1>
      </div>

      <h2 className="vibe-title">Vibe Check</h2>

      <div className="joe-biden-section">
        <img src={sunshine} className="joe-biden-image" alt="Joe Biden" />
        <p className="joe-biden-text">
          "LAST TEST! Are you ready for the ultimate vibe check?"
        </p>
      </div>

      <h3>Question 1: Define Rizz</h3>
      <div className="prompt-box">
        <TextField
          fullWidth
          multiline
          required
          onChange={handleQ1res}
          placeholder="Enter your response here"
        />
      </div>

      <h3>Question 2: Thoughts on CTRL HACK DEL being the better than Hack the North?</h3>
      <div className="prompt-box">
        <TextField
          fullWidth
          multiline
          required
          onChange={handleQ2res}
          placeholder="Enter your response here"
        />
      </div>

      <h3>Question 3: How much can you yap?</h3>
      <div className="prompt-box">
        <TextField
          fullWidth
          multiline
          required
          onChange={handleQ3res}
          placeholder="Enter your response here"
        />
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        className="submit-button"
        style={{ marginTop: '20px' }}
      >
        Submit
      </Button>
    </div>
  );
}

export default Vibe;
