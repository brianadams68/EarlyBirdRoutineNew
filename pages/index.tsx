import React, { useState } from 'react';

const HomePage = () => {
  const [time, setTime] = useState('');
  const [muscles, setMuscles] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(`/api/route?time=${time}&muscles=${muscles}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Received non-JSON response');
      }
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data');
      setResponse(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to EarlyBirdRoutine</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Time (minutes):
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Muscles:
            <input
              type="text"
              value={muscles}
              onChange={(e) => setMuscles(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Generate Routine
        </button>
      </form>
      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}
      {response && (
        <div>
          <h2 className="text-xl font-bold mb-2">Response:</h2>
          <pre className="bg-gray-100 p-4 rounded-md">{JSON.stringify(response, null, 2)}</pre>
          {response.exercises && (
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Exercises:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {response.exercises.map((exercise, index) => (
                  <div key={index} className="p-4 border border-gray-300 rounded-md">
                    <img src={exercise.image} alt={exercise.name} className="w-full h-48 object-cover mb-2" />
                    <h4 className="text-md font-bold">{exercise.name}</h4>
                    <p>{exercise.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;