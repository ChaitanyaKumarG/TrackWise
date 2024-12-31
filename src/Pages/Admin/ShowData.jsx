import React from "react";
import { useNavigate } from "react-router-dom";

function ShowData() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Welcome</h1>
      <div className="d-flex justify-content-center gap-3">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/facultydata")}
        >
          Faculty
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/studentdata")}
        >
          Students
        </button>
      </div>
    </div>
  );
}

export default ShowData;
