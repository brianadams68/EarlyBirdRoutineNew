import React from 'react';
import Navbar from '../components/Navbar';

const HomePage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {/* Hero Section */}
        <section className="w-full bg-cover bg-center h-screen" style={{ backgroundImage: "url('images/hero-bg.jpg')" }}>
          <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">Welcome to EarlyBird Routine</h1>
              <p className="text-xl mb-8">Your personalized workout routine starts here</p>
              <a href="/routine" className="px-6 py-3 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-300">Get Started</a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-16 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-4 border rounded-md shadow-md bg-gray-50 hover:bg-gray-100 transition duration-300">
                <h3 className="text-xl font-bold mb-4 text-teal-600">Personalized Routines</h3>
                <p className="text-gray-700">Create routines tailored to your goals and preferences.</p>
              </div>
              <div className="p-4 border rounded-md shadow-md bg-gray-50 hover:bg-gray-100 transition duration-300">
                <h3 className="text-xl font-bold mb-4 text-teal-600">Track Progress</h3>
                <p className="text-gray-700">Monitor your progress and stay motivated.</p>
              </div>
              <div className="p-4 border rounded-md shadow-md bg-gray-50 hover:bg-gray-100 transition duration-300">
                <h3 className="text-xl font-bold mb-4 text-teal-600">Expert Advice</h3>
                <p className="text-gray-700">Get tips and advice from fitness experts.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-16 bg-gray-100">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-4 border rounded-md shadow-md bg-white hover:bg-gray-50 transition duration-300">
                <p className="text-gray-700">"EarlyBird Routine has transformed my workouts. I feel stronger and more motivated than ever!"</p>
                <p className="mt-4 font-bold text-teal-600">- Alex</p>
              </div>
              <div className="p-4 border rounded-md shadow-md bg-white hover:bg-gray-50 transition duration-300">
                <p className="text-gray-700">"The personalized routines are fantastic. I love how easy it is to track my progress."</p>
                <p className="mt-4 font-bold text-teal-600">- Jamie</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full py-16 bg-teal-500">
          <div className="container mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
            <a href="/routine" className="px-6 py-3 bg-white text-teal-500 rounded-md hover:bg-gray-100 transition duration-300">Create Your Routine</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
