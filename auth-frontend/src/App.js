import logo from './components/YorkU_logo.png';
import LoginButton from '../src/components/Login_Button'
import LoginEntry from '../src/components/Login_Entry'
import Checkbox from '../src/components/Checkbox'
import mainContent from '../src/components/Main_Content'

import React, { useState } from 'react'

import './App.css';

function App() {

  const [userInputVal, setUserInputVal] = useState("");
  const [passInputVal, setPassInputVal] = useState("");

  const handleUserInputChange = (e) => {
    setUserInputVal(e.target.value);
  }

  const handlePassInputChange = (e) => {
    setPassInputVal(e.target.value);
  }

  return (
    <div className="Login_Page">
      <header className="Banner_Logo">
        <img src={logo} className= "org-logo" alt="logo" />
        <p> Login Below: </p>
      </header>

      {/* Username Input*/}
      <LoginEntry
        type="text"
        label="Enter username:"
        placeholder="username"
        onChange = {handleUserInputChange}
        value = {userInputVal}
      /> 
      


      {/* Password Input  */}
      <LoginEntry
        type="password"
        label="Enter password:"
        placeholder="password"
        onChange = {handlePassInputChange}
        value = {passInputVal}
      /> 
    

      
      {/* Submit button */}
      <LoginButton/>
    </div>
  );
}

export default App;
