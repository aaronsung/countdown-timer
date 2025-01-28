import React, { useState, useRef, useCallback } from 'react';

const CountdownTimer = ({ autoStart = false, initialSeconds = 0, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  
  const startTimeRef = useRef(0);
  const animationFrameRef = useRef(null);
  const totalTimeRef = useRef(initialSeconds);

  const startDateTime = useRef(null);

  const stopTimer = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsRunning(false);
    console.log('Stopping timer : ', Date.now());
    if (onComplete) {
      onComplete();
    }
  }, [onComplete]);

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
    console.log('Starting timer : ', Date.now());
    setIsRunning(true);
    startTimeRef.current = 0;
    totalTimeRef.current = initialSeconds;
    setTimeLeft(initialSeconds);
    animationFrameRef.current = requestAnimationFrame(updateTimer);
  }, [initialSeconds, updateTimer]);

  // Add useEffect to auto-start the timer
  React.useEffect(() => {
    if (autoStart) {
      startTimer();
    }
  }, [autoStart, startTimer]);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">Timer</h2>
        </div>

        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800">
            {timeLeft.toFixed(0)}s
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={isRunning ? stopTimer : startTimer}
            className={`px-3 py-1 rounded font-semibold text-white ${
              isRunning 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;