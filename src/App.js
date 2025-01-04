import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Start from "./Start";
import Quiz from "./Quiz";
import Create from "./Create";
import Code from "./Code";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/quiz/:id" element={<Quiz />} />
      <Route path="/create" element={<Create />} />
      <Route path="/code" element={<Code />} />
    </Routes>
  );
}

export default App;
