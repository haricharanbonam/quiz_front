import React, { useState } from "react";
// import './css/Create.css';
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

    try {
      const response = await axios.post(Api + "/create", {
        quizId,
        questions,
      });

      if (response.status === 200) {
        alert("Quiz submitted successfully!");
        setQuizId("");
        setQuestions([]);
      } else {
        alert("Error submitting quiz");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit quiz");
    }
  };

  return (
    <div id="create" className="bg-gray-50 p-8 min-h-screen">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Create Quiz
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveQuestion();
        }}
        className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quiz ID:
          </label>
          <input
            type="text"
            value={quizId}
            onChange={(e) => setQuizId(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question:
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Options:
          </label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              required
              className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Correct Option Index:
          </label>
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            min="0"
            max="3"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="button"
          onClick={handleSaveQuestion}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-500 transition-all duration-300"
        >
          Save Question
        </button>
      </form>

      <div className="mt-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Saved Questions
        </h2>
        {questions.length > 0 ? (
          <div className="space-y-6">
            {questions.map((q, index) => (
              <div
                key={index}
                className="p-6 bg-white border border-gray-200 rounded-lg shadow-md"
              >
                <p className="text-lg font-medium text-gray-800">
                  <strong>Question:</strong> {q.question}
                </p>
                <ul className="list-disc pl-5 mt-4">
                  {q.options.map((option, i) => (
                    <li key={i} className="text-sm text-gray-600">
                      {i === q.answer ? (
                        <strong className="text-green-600">
                          {option} (Correct)
                        </strong>
                      ) : (
                        option
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No questions saved yet.</p>
        )}
      </div>

      <button
        type="button"
        onClick={handleSubmitQuiz}
        className="w-full mt-6 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-500 transition-all duration-300"
      >
        Submit Quiz
      </button>
    </div>
  );
}

export default Create;
