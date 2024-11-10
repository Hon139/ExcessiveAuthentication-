import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../components/YorkU_logo.png';
import geda from '../components/geda.png';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import './pages.css';

function MathAuth() {
  const [counter, setCounter] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasAnsweredCorrectly, setHasAnsweredCorrectly] = useState(false);
  const navigate = useNavigate();

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
      setHasAnsweredCorrectly(true); // This ensures the button remains displayed
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
        <h1 className="passport-text">YUSoSecure</h1>
      </div>

      <div className="math-container">
        <h2>Math Authentication</h2>
        <img src={geda} className="geda" alt="gedagide" />
        <p className="center">
          Gedagedigedagedago. Yeo the nugget wants you to solve this math equation! Use the board that was magically summoned to you to find the number and solve for the equation!
        </p>
        <BlockMath math="(x + 5) \times 4 - 1 = ?" />
        <input
          value={userAnswer}
          onChange={handleAnswerChange}
          placeholder="Your answer"
          className="math-input"
        />
        <button onClick={checkAnswer} className="math-button">Submit Answer</button>

        {(isCorrect || hasAnsweredCorrectly) && (
          <>
            <p className="success-message">You solved the equation! You must be a university student!</p>
            <button
              className="next-button"
              onClick={() => navigate('/ssc')}
            >
              Proceed to next step
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MathAuth;
