import React, { useState } from 'react';

const HomePage = () => {
  const [time, setTime] = useState('');
  const [muscles, setMuscles] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/route?time=${time}&muscles=${muscles}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponse({ error: 'Failed to fetch data' });
    }
  };

  return (
    <div>
      <h1>Welcome to EarlyBirdRoutine</h1>
      <p>This is the homepage.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Time (minutes):
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Muscles:
            <input
              type="text"
              value={muscles}
              onChange={(e) => setMuscles(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Generate Routine</button>
      </form>
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default HomePage;