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
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-sm w-100" style={{ maxWidth: "400px" }}>
        <div className="card-header bg-primary text-white text-center py-3">
          <i className="bi bi-person-plus-fill fs-1"></i>
          <h4 className="mb-0 mt-2">Welcome</h4>
        </div>

        <div className="card-body p-4">
          <div className="mb-4">
            <label htmlFor="userType" className="form-label fw-bold">
              <i className="bi bi-person-badge me-2"></i>
              Select User Type
            </label>
            <select
              id="userType"
              className="form-select form-select-lg"
              value={selection}
              onChange={(e) => setSelection(e.target.value)}
            >
              <option value="">Choose...</option>
              <option value="student">
                <i className="bi bi-mortarboard me-2"></i>Student
              </option>
              <option value="faculty">
                <i className="bi bi-person-workspace me-2"></i>Faculty
              </option>
            </select>
          </div>

          <button
            className="btn btn-primary w-100 py-3"
            onClick={handleNavigate}
            disabled={!selection}
          >
            <i className="bi bi-arrow-right-circle me-2"></i>
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateData;
