import React from "react";

import { Link } from 'react-router-dom';
function Start() {
  return (
    <div className="startbox bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 h-screen w-full flex justify-center items-center">
      <div className="startmain bg-white w-full max-w-md p-8 rounded-xl shadow-xl flex flex-col items-center">
        <div className="startin mb-6 text-center">
          <p className="text-2xl font-semibold text-gray-800">Take the Quiz</p>
          <Link to="/code">
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:bg-blue-500 hover:scale-105 focus:outline-none">
              Start
            </button>
          </Link>
        </div>
        <div className="createin text-center">
          <p className="text-2xl font-semibold text-gray-800">Create a Quiz</p>
          <Link to="/create">
            <button className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:bg-green-500 hover:scale-105 focus:outline-none">
              Create
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Start;
