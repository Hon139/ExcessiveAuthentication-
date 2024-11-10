import React, { useState, useEffect } from 'react';
import logo from '../components/YorkU_logo.png';
import geda from '../components/geda.png';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import './pages.css';

function MathAuth() {
  const [counter, setCounter] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  // Function to fetch the counter from ESP8266
  const fetchCounter = async () => {
    try {
      const response = await fetch("http://172.20.10.9/getDigit");
      if (response.ok) {
        const data = await response.text();
        console.log("Fetched data:", data);
        setCounter(parseInt(data, 10));
        setIsCorrect(false);
        setUserAnswer('');
      } else {
        console.error("Failed to fetch counter");
      }
    } catch (error) {
      console.error("Error fetching counter:", error);
    }
  };

  // Initial fetch and periodic refresh
  useEffect(() => {
    fetchCounter();
    const intervalId = setInterval(fetchCounter, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // Function to handle answer input change
  const handleAnswerChange = (e) => {
    setUserAnswer(e.target.value);
  };

  // Function to check if the answer is correct
  const checkAnswer = () => {
    if (parseInt(userAnswer, 10) === ((counter + 5) * 4) - 1) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
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
        <img src={geda} className="geda" alt="gedagide" />
        <p className="center">
          Gedagedigedagedago. Yeo the nugget wants you to solve this math equation! Use the provided board to find the number and solve for the equation!
        </p>
        <BlockMath math="(x + 5) \times 4 - 1 = ?" />
        <input
          type="number"
          value={userAnswer}
          onChange={handleAnswerChange}
          placeholder="Your answer"
          className="math-input"
        />
        <button onClick={checkAnswer} className="math-button">Submit Answer</button>

        {isCorrect && (
          <button className="math-button success-button">Access Granted</button>
        )}
      </div>
    </div>
  );
}

export default MathAuth;
