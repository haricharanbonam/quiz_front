import React, { useState } from "react";
import './css/Create.css';
import axios from "axios";
import Api from "./Api";
function Create() {
 
  const [quizId, setQuizId] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSaveQuestion = () => {
    if (!quizId || !question || options.includes("") || answer === "") {
      alert("Please fill all fields!");
      return;
    }

    const newQuestion = {
      quizId,
      question,
      options,
      answer: parseInt(answer),
    };

    setQuestions([newQuestion, ...questions]); 
    setQuestion(""); // Clear the question input
    setOptions(["", "", "", ""]); // Reset options
    setAnswer(""); // Clear the answer
  };

  const handleSubmitQuiz = async () => {
    if (questions.length === 0) {
      alert("Add at least one question before submitting!");
      return;
    }







    try{
const response = await axios.post(Api + "/create", {
  quizId,
  questions,
});

      if(response.status===200)
        {
          alert("Quiz submitted successfully!");
          setQuizId("");
      setQuestions([]);
    }
    else{
      alert("Error submitting quiz");
    }
  }

  catch (error) {
    console.error(error);
    alert("Failed to submit quiz");
  }

    }


  return (
    <div id ="create">
      <h1>Create Quiz</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveQuestion();
        }}
      >
        <div>
          <label>Quiz ID:</label>
          <input
            type="text"
            value={quizId}
            onChange={(e) => setQuizId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Options:</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              required
            />
          ))}
        </div>
        <div>
          <label>Correct Option Index:</label>
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            min="0"
            max="3"
            required
          />
        </div>
        <button type="button" onClick={handleSaveQuestion}>
          Save Question
        </button>
      </form>

      <div>
        <h2>Saved Questions</h2>
        {questions.map((q, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
            }}
          >
            <p>
              <strong>Question:</strong> {q.question}
            </p>
            <ul>
              {q.options.map((option, i) => (
                <li key={i}>
                  {i === q.answer ? (
                    <strong>{option} (Correct)</strong>
                  ) : (
                    option
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <button type="button" onClick={handleSubmitQuiz}>
        Submit Quiz
      </button>
    </div>
  );
};

export default Create;
