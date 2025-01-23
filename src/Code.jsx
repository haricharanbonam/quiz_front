
import React, { useState } from "react";
import axios from "axios";
import Api from "./Api";
import { useNavigate } from "react-router-dom";
import {InvalidPopup} from "./InvalidPopup";

function Code() {
  const [code, setCode] = useState("");
  const [isValidCode, setIsValidCode] = useState(null);
  const navigate = useNavigate(); 
  const [load ,setLoad]=useState(false);
  const handleInp = (e) => {
    
    setCode(e.target.value);
  };

  const handleCancel=()=>
  { 
    setIsValidCode(null)
    setLoad(false)
    setCode("");
  }

  const checkId = async () => {
    try {
      setLoad(true);
      console.log("Sending code:", code); 
      const result = await axios.post(Api + "/code", { code });
      console.log("Backend response:", result); 

      if (result.data.message === "successful") {
        console.log("Code is valid"); 
        setLoad(false);
        setIsValidCode(true);
        
        navigate(`/quiz/${code}`); 
      } else {
        setIsValidCode(false); 
        console.log("Code is invalid");
      }
    } catch (error) {
      console.error("Error validating code:", error);
      setIsValidCode(false);
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
      <div className="codemain max-w-sm mx-auto mt-12 p-6 bg-white rounded-lg shadow-md text-center">
        <p className="text-xl font-semibold mb-4 text-gray-700">
          Enter Quiz ID
        </p>
        <input
          type="text"
          id="codeinput"
          value={code}
          onChange={handleInp}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-md text-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        

        {!load && (
          <button
            onClick={handleSubmit}
            className="w-full p-3 bg-blue-500 text-white rounded-md text-lg transition-colors duration-200 hover:bg-blue-600 active:scale-95"
          >
            Submit
          </button>
        )}

        {load && (
          <>
            <div className="w-full h-10 bg-blue-500 rounded-md flex justify-center align-middle duration-200 hover:bg-blue-600 active:scale-95">
              <div className="w-7 h-7  border-4 border-white  border-t-transparent bg-transparent animate-spin rounded-full "></div>
            </div>
          </>
        )}

        {/* <button
          onClick={handleSubmit}
          className="w-full p-3 bg-blue-500 text-white rounded-md text-lg transition-colors duration-200 hover:bg-blue-600 active:scale-95"
        >
          {load===false?
          "Submit":"Loading"
}
        </button> */}
        {isValidCode===false && <InvalidPopup onCancel={handleCancel} />}
        {/* {isValidCode === false && (
          <div className="h-12 w-12 flex align-middle justify-center absolute top-1/2 left-1/2">
          <p className="mt-3 text-sm text-red-500">The code is invalid</p>
            </div>
        )} */}
      </div>
    </>
  );
}

export default Code;
