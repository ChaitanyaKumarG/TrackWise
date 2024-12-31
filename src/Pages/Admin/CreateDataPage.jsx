import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateData() {
  const [selection, setSelection] = useState("");
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (selection === "student") {
      navigate("/createstudent");
    } else if (selection === "faculty") {
      navigate("/createfaculty");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Welcome</h1>
      <div className="mb-3">
        <select
          className="form-select"
          value={selection}
          onChange={(e) => setSelection(e.target.value)}
        >
          <option value="">Select an Option</option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>
      </div>
      <button
        className="btn btn-primary"
        disabled={!selection}
        onClick={handleNavigate}
      >
        Proceed
      </button>
    </div>
  );
}

export default CreateData;
