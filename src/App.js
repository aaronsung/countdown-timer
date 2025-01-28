import { useState, useCallback } from 'react';
import CountdownTimer from './CountdownTimer';

function App() {
  const [currentTimer, setCurrentTimer] = useState(0);
  const totalTimers = 3;

  const handleTimerComplete = useCallback(() => {
    setCurrentTimer(prev => {
      if (prev < totalTimers - 1) {
        return prev + 1;
      }
      return prev;
    });
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: totalTimers }, (_, index) => (
        <CountdownTimer
          key={index}
          autoStart={index === currentTimer}
          initialSeconds={8}
          onComplete={handleTimerComplete}
        />
      ))}
    </div>
  );
}

export default App;
