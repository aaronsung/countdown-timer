import React, { useState, useRef, useCallback } from 'react';

const CountdownTimer = () => {
  const [inputSeconds, setInputSeconds] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  const startTimeRef = useRef(0);
  const animationFrameRef = useRef(null);
  const totalTimeRef = useRef(0);

  const stopTimer = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsRunning(false);
    console.log('Stopping timer : ', Date.now());
  }, []);

  const updateTimer = useCallback((timestamp) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsedTime = (timestamp - startTimeRef.current) / 1000;
    const remainingTime = Math.max(0, totalTimeRef.current - elapsedTime);
    
    setTimeLeft(Math.ceil(remainingTime));

    if (remainingTime <= 0) {
      stopTimer();
      return;
    }

    animationFrameRef.current = requestAnimationFrame(updateTimer);
  }, [stopTimer]);

  const startTimer = useCallback(() => {
    const seconds = parseFloat(inputSeconds);
    if (isNaN(seconds) || seconds <= 0) {
      alert('Please enter a valid positive number of seconds');
      return;
    }

    console.log('Starting timer : ', Date.now());
    setIsRunning(true);
    startTimeRef.current = 0;
    totalTimeRef.current = seconds;
    setTimeLeft(seconds);
    animationFrameRef.current = requestAnimationFrame(updateTimer);
  }, [inputSeconds, updateTimer]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setInputSeconds(value);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Countdown Timer</h2>
        </div>
        
        <div className="flex gap-4 items-center">
          <input
            type="text"
            value={inputSeconds}
            onChange={handleInputChange}
            placeholder="Enter seconds"
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isRunning}
          />
          
          <button
            onClick={isRunning ? stopTimer : startTimer}
            className={`px-4 py-2 rounded font-semibold text-white ${
              isRunning 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
        </div>

        <div className="text-center">
          <div className="text-4xl font-bold text-gray-800">
            {timeLeft.toFixed(0)}s
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;