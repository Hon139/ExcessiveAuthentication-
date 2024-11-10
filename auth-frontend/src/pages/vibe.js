import React, { useState, useEffect } from 'react';
import logo from '../components/YorkU_logo.png';
import TextField from '@mui/material/TextField';
import './pages.css';

function Vibe() {

  const [Q1res, setQ1Res] = useState("")
  const [Q2res, setQ2Res] = useState("")
  const [Q3res, setQ3Res] = useState("")

  const handleQ1res = (e) => {
    setQ1Res(e.target.value)
  } 
  const handleQ2res = (e) => {
    setQ2Res(e.target.value)
  } 

  const handleQ3res = (e) => {
    setQ3Res(e.target.value)
  } 
  
  return (
    <div className="vibe-check">
      <header className="Banner_Logo">
        <img src={logo} className="org-logo" alt="York University Logo" />
      </header>

      <div className="header-banner">
        <h1 className="passport-text">Passport York Login</h1>
      </div>

      <h3>Question 1</h3>
      <div className="prompt-box">
        <TextField
          fullWidth
          multiline
          required
          //label = {Q1res}
          onChange = {handleQ1res}
          placeholder = "Enter your response here"
         />
      </div>

      <h3>Question 2</h3>
      <div className="prompt-box">
        <TextField
          fullWidth
          multiline
          required
          //label = {Q2res}
          onChange = {handleQ2res}
          placeholder = "Enter your response here"
         />
      </div>

      <h3>Question 3</h3>
      <div className="prompt-box">
        <TextField
          fullWidth
          multiline
          required
          //label = {Q3res}
          onChange = {handleQ3res}
          placeholder = "Enter your response here"
         />
      </div>
      

    </div>
  );
}

export default Vibe;
