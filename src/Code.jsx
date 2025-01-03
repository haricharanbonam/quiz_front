import React, { useState } from "react";
import axios from "axios";
import Api from "./Api";
import "./css/Code.css";
import { useNavigate } from "react-router-dom";

function Code() {
  const [code, setCode] = useState("");
  const [isValidCode, setIsValidCode] = useState(null);
  const navigate = useNavigate(); // Use the navigate hook

  const handleInp = (e) => {
    setCode(e.target.value);
  };

  const checkId = async () => {
    try {
      console.log("Sending code:", code); // Log the code to make sure it's correct
      const result = await axios.post(Api + "/code", { code });
      console.log("Backend response:", result); // Verify the structure of the response

      if (result.data.message === "successful") {
        console.log("Code is valid"); // Log if the code is valid
        setIsValidCode(true);
        navigate(`/quiz/${code}`); // Use navigate to redirect to quiz page
      } else {
        console.log("Code is invalid"); // Log if the code is invalid
        setIsValidCode(false); // Code is invalid
      }
    } catch (error) {
      console.error("Error validating code:", error);
      setIsValidCode(false); // Handle request failure
    }
  };

  const handleSubmit = async () => {
    if (!code) {
      setIsValidCode(false);
      alert("The code is required");
    } else {
      await checkId();
    }
  };

  return (
    <>
      <div className="codemain">
        <p>Enter Quiz ID</p>
        <input
          type="text"
          id="codeinput"
          value={code}
          onChange={handleInp}
          required
        />
        <button onClick={handleSubmit}>Submit</button>
        {isValidCode === false && (
          <p style={{ color: "red" }}>The code is invalid</p>
        )}
      </div>
    </>
  );
}

export default Code;
