import React, { useState } from 'react';
import Select from 'react-select';

const muscleOptions = [
  { value: 'chest', label: 'Chest' },
  { value: 'back', label: 'Back' },
  { value: 'legs', label: 'Legs' },
  { value: 'arms', label: 'Arms' },
  { value: 'shoulders', label: 'Shoulders' },
  { value: 'abs', label: 'Abs' },
];

const HomePage = () => {
  const [time, setTime] = useState('');
  const [muscles, setMuscles] = useState<{ value: string; label: string }[]>([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const muscleValues = muscles.map((muscle) => muscle.value).join(',');
      const res = await fetch(`/api/route?time=${time}&muscles=${muscleValues}`, {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container mx-auto p-4 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Welcome to EarlyBird Routine</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Time (minutes):
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-full"
              />
            </label>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Muscles:
              <Select
                isMulti
                options={muscleOptions}
                value={muscles}
                onChange={(selectedOptions) => setMuscles(selectedOptions as { value: string; label: string }[])}
                className="mt-1 block w-full border rounded-full"
              />
            </label>
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md w-full">
            Generate Routine
          </button>
        </form>
        {error && (
          <div className="text-red-500 mb-4 text-center">
            {error}
          </div>
        )}
        {response && (
          <div>
            <h2 className="text-xl font-bold mb-2 text-center">Response:</h2>
            {response.exercises && (
              <div className="mt-4">
                <h3 className="text-lg font-bold mb-2 text-center">Exercises:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {response.exercises.map((exercise: { image: string; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode>>; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode>>; }, index: React.Key) => (
                    <div key={index} className="p-4 border border-gray-300 rounded-md">
                      <img src={String(exercise.image)} alt={String(exercise.name)} className="w-full h-48 object-cover mb-2" />
                      <h4 className="text-md font-bold">{String(exercise.name)}</h4>
                      <p>{exercise.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;