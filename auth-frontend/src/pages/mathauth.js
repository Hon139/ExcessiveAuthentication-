import React, { useState, useEffect } from 'react';
import logo from '../components/YorkU_logo.png';

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
        console.log("Fetched data:", data); // Log the fetched data
        setCounter(parseInt(data, 10)); // Convert to integer and set counter
        setIsCorrect(false); // Reset the correctness check
        setUserAnswer(''); // Clear previous answer
      } else {
        console.error("Failed to fetch counter");
      }
    } catch (error) {
      console.error("Error fetching counter:", error);
    }
  };

  // Initial fetch and periodic refresh
  useEffect(() => {
    fetchCounter(); // Fetch counter on initial load
    const intervalId = setInterval(fetchCounter, 5000); // Fetch every 5 seconds
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  // Function to handle answer input change
  const handleAnswerChange = (e) => {
    setUserAnswer(e.target.value);
  };

  // Function to check if the answer is correct
  const checkAnswer = () => {
    if (parseInt(userAnswer, 10) === (counter + 5)) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div>
      <header className="Banner_Logo">
        <img src={logo} className="org-logo" alt="York University Logo" />
      </header>

      <div className="header-banner">
        <h1 className="passport-text">Passport York Login</h1>
      </div>

      <p>X + 5 = ?</p>
      <input
        type="number"
        value={userAnswer}
        onChange={handleAnswerChange}
        placeholder="Your answer"
      />
      <button onClick={checkAnswer}>Submit Answer</button>

      {isCorrect && (
        <button>Access Granted</button> // Button appears if the answer is correct
      )}
    </div>
  );
}

export default MathAuth;
