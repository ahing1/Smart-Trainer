import { useState, useEffect } from 'react'
import './App.css'
import { checkHealth } from './services/api'

function App() {
  const [healthStatus, setHealthStatus] = useState('')

  useEffect(() => {
    const fetchHealth = async () => {
      const status = await checkHealth();
      setHealthStatus(status ? status.status : 'Failed');
    }
    fetchHealth();
  }, [])

  return (
    <div className="App">
      <h1>Smart Personal Trainer</h1>
      <p>Backend Health: {healthStatus}</p>
    </div>
  );
}

export default App
