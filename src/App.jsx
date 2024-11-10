import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Pomodoro from './pomodoro'

function App() {
  return (
    <div className="App">
      <h1>Welcome to the Pomodoro Watch</h1>
      <Pomodoro />
    </div>
  );
}

export default App;
