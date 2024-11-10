import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Use Routes, Route, useNavigate without Router
import logo from './components/YorkU_logo.png';
import JohnYork from './components/john_york.png';
import LoginButton from '../src/components/Login_Button';
import LoginEntry from '../src/components/Login_Entry';
import LoginFail from '../src/components/Login_Failed';
import MathAuth from './pages/mathauth';
import './App.css';

const CORRECT_USR = "johnyork";
const CORRECT_PWD = "12345"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Main login page */}
      <Route path="/mathauth" element={<MathAuth />} /> {/* MathAuth page */}
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
    }
    else {
      console.log("error!!")
      setErrMessage("bozo u typed the wrong password");
    }
    console.log(errMessage)  
  };

  return (
    <div className="Login_Page">
      <header className="Banner_Logo">
        <img src={logo} className="org-logo" alt="York University Logo" />
      </header>

      <div className="header-banner">
        <h1 className="passport-text">Passport York Login</h1>
      </div>

      <header className="brainrot">
        <img src = {JohnYork} className="john-york" alt="johnyork"/>
      </header>

      <p>Login Below:</p>

      <LoginEntry
        type="text"
        label="Enter username:"
        placeholder="username"
        onChange = {handleUserInputChange}
        value = {userInputVal}
      /> 

      <LoginEntry
        type="password"
        label="Enter password:"
        placeholder="password"
        onChange={handlePassInputChange}
        value={passInputVal}
      /> 
    

      
      {/* Submit button */}
      <LoginButton eventListener={handleLogin} type="button"/>

      {/* Error message if attempt not successful: */}     
      <div>
        {errMessage && <LoginFail errMessage={errMessage} />}
      </div>
  
    </div>
    
  );
}


export default App;
