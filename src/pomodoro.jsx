import React, { useState, useEffect } from 'react';

const Pomodoro = () => {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5); 
  const [isWorking, setIsWorking] = useState(true); 
  const [timeLeft, setTimeLeft] = useState(workTime * 60); 
  const [isActive, setIsActive] = useState(false); 

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (isActive && timeLeft === 0) {
      setIsWorking(prev => !prev);
      setTimeLeft(isWorking ? breakTime * 60 : workTime * 60); 
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isWorking, workTime, breakTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => setIsActive(prev => !prev);
  const handleReset = () => {
    setIsActive(false);
    setIsWorking(true);
    setTimeLeft(workTime * 60);
  };
  const adjustTime = (type, adjustment) => {
    if (type === 'work') {
      const newWorkTime = Math.max(1, workTime + adjustment);
      setWorkTime(newWorkTime);
      if (isWorking) setTimeLeft(newWorkTime * 60);
    } else {
      const newBreakTime = Math.max(1, breakTime + adjustment);
      setBreakTime(newBreakTime);
      if (!isWorking) setTimeLeft(newBreakTime * 60);
    }
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h2>Pomodoro Timer</h2>
      <div style={{ fontSize: '3rem', margin: '20px 0' }}>{formatTime(timeLeft)}</div>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleStartPause} style={{ padding: '10px 20px', fontSize: '1rem', margin: '0 10px' }}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset} style={{ padding: '10px 20px', fontSize: '1rem', margin: '0 10px' }}>
          Reset
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <div>
          <label>
            Work Time (min):
            <button onClick={() => adjustTime('work', -1)} style={{ margin: '0 5px' }}>−</button>
            <input
              type="number"
              value={workTime}
              onChange={(e) => setWorkTime(Math.max(1, parseInt(e.target.value)))}
              style={{ width: '50px', marginLeft: '10px' }}
            />
            <button onClick={() => adjustTime('work', 1)} style={{ margin: '0 5px' }}>+</button>
          </label>
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>
            Break Time (min):
            <button onClick={() => adjustTime('break', -1)} style={{ margin: '0 5px' }}>−</button>
            <input
              type="number"
              value={breakTime}
              onChange={(e) => setBreakTime(Math.max(1, parseInt(e.target.value)))}
              style={{ width: '50px', marginLeft: '10px' }}
            />
            <button onClick={() => adjustTime('break', 1)} style={{ margin: '0 5px' }}>+</button>
          </label>
        </div>
      </div>
      <p>{isWorking ? 'Work Time - Stay Focused!' : 'Break Time - Relax a bit!'}</p>
    </div>
  );
};
export default Pomodoro;
