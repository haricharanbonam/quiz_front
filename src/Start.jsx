import React from "react";
import "./css/Start.css"; // Ensure this path is correct
import { Link } from 'react-router-dom';
function Start() {
  return (
    <div className="startbox">
      <div className="startmain">
        <div className="startin">
          <p>Take the Quiz</p>
          <Link to="/code">
            <button>Start</button>
          </Link>
        </div>
        <div className="createin">
          <p>Create a Quiz</p>
          <Link to="/create">
            <button>Create</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Start;
