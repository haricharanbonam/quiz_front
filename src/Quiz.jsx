import React, { useState, useEffect } from "react";

import axios from "axios";
import Api from "./Api";
import { useParams } from "react-router-dom";
import SubmitPopup from "./SubmitPopup";

function Quiz() {
  const { id } = useParams();
  const [quizData, setQuizData] = useState([]);
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [option, setOption] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`${Api}/quiz/${id}`);
        console.log(response.data);
        setQuizData(response.data);
        setResponses(Array(response.data.length).fill(null)); // Initialize responses
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuizData();
  }, [id]);

  const handleOption = (i) => {
    console.log(`Option ${i} clicked`);
    setOption(i);

    const updatedResponses = [...responses];
    updatedResponses[index] = i;
    setResponses(updatedResponses);
  };
  const GotoQuestion = (i) => {
    setIndex(i);
  };
  const evaluate = () => {
    let ans = 0;
    for (let x = 0; x < quizData.length; x++) {
      if (quizData[x].answer === responses[x]) {
        ans += 1;
      }
    }
    return ans;
  };

  const handleConfirm = () => {
    console.log("Submit confirmed");

    setShowPopup(false);
    alert("The marks are " + evaluate());
    window.location.href = "/";
  };

  const handleCancel = () => {
    console.log("Submit canceled");
    setShowPopup(false);
  };

  const handleNext = () => {
    if (index < quizData.length - 1) {
      setIndex(index + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    if (responses[index] !== option) {
      setOption(responses[index]);
    }
  }, [index, responses, option]);

  const handleSubmit = () => {
    alert("The marks are " + evaluate());
    window.location.href = "/";
  };

  if (quizData.length === 0) {
    return <p>Loading quiz...</p>;
  }

  return (
    <div className="quizbox bg-gradient-to-br from-indigo-500 to-blue-500 h-screen w-full flex justify-center items-center">
      <div className="quizmain bg-white w-full max-w-lg p-6 rounded-lg shadow-lg text-center">
        <div className="quizq mb-6">
          <p className="text-2xl font-bold text-gray-800">
            {index + 1 + " " + quizData[index].question}
          </p>
        </div>
        <div className="quizoptions flex flex-col gap-4">
          {quizData[index].options.map((e, i) => (
            <div
              className="quiz-option p-4 mb-2 border border-gray-300 rounded-md cursor-pointer relative transition-all duration-300 transform hover:scale-105"
              style={{
                backgroundColor: option === i ? "#2575fc" : "white",
              }}
              key={i}
              onClick={() => handleOption(i)}
            >
              <p className="text-lg">{`${i + 1}. ${e}`}</p>
            </div>
          ))}
        </div>
        <div className="quizbuttons flex justify-between items-center mt-6">
          <button
            onClick={handlePrev}
            disabled={index === 0}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md disabled:bg-gray-400 transition-all duration-200 hover:bg-blue-500 active:scale-95"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={index === quizData.length - 1}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md disabled:bg-gray-400 transition-all duration-200 hover:bg-blue-500 active:scale-95"
          >
            Next
          </button>
          <button
            style={{
              display: index === quizData.length - 1 ? "block" : "none",
            }}
            onClick={() => setShowPopup(true)}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 hover:bg-blue-500 active:scale-95"
          >
            Submit
          </button>
          {showPopup && (
            <SubmitPopup onConfirm={handleConfirm} onCancel={handleCancel} />
          )}
        </div>
      </div>
      <div className="bg-white absolute top-2 right-5 h-auto  w-60 grid grid-cols-5 gap-2">
        {responses.map((e, i) => (
          <span
            key={i}
            onClick={() => GotoQuestion(i)}
            className={`h-10 w-10 ${
              e === null ? "bg-red-600" : "bg-green-600"
            } rounded-full flex items-center justify-center cursor-pointer`}
          >
            {i + 1}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
