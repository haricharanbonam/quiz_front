import React, { useState, useEffect } from "react";
import "./css/Quiz.css";
import axios from "axios";
import Api from "./Api";
import { useParams } from "react-router-dom";

function Quiz() {
  // Get the `id` parameter from the URL
  const { id } = useParams();
  const [quizData, setQuizData] = useState([]);
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [option, setOption] = useState(null);

  // Fetch quiz data
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
  }, [id]); // Trigger effect when `id` changes

  const handleOption = (i) => {
    console.log(`Option ${i} clicked`);
    setOption(i);

    const updatedResponses = [...responses];
    updatedResponses[index] = i;
    setResponses(updatedResponses);
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

  // Update option only when responses[index] changes
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
    return <p>Loading quiz...</p>; // Render loading message until quizData is loaded
  }

  return (
    <div className="quizbox">
      <div className="quizmain">
        <div className="quizq">
          <p>{index + 1 + " " + quizData[index].question}</p>
        </div>
        <div className="quizoptions">
          {quizData[index].options.map((e, i) => (
            <div
              className="quiz-option"
              style={{
                backgroundColor: option === i ? "#2575fc" : "white",
                cursor: "pointer",
              }}
              key={i}
              onClick={() => handleOption(i)}
            >
              <p>{`${i + 1}. ${e}`}</p>
            </div>
          ))}
        </div>
        <div className="quizbuttons">
          <button onClick={handlePrev} disabled={index === 0}>
            Prev
          </button>
          <button onClick={handleNext} disabled={index === quizData.length - 1}>
            Next
          </button>
          <button
            style={{
              display: index === quizData.length - 1 ? "block" : "none",
            }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
