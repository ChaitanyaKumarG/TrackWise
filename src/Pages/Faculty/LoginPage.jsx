import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FLoginPage() {
  const [penNo, setPenNo] = useState("");
  const [parentNo, setParentNo] = useState("");
  const [faculty, setFaculty] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all students
    axios
      .get("http://127.0.0.1:1321/faculty")
      .then((response) => setFaculty(response.data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const matchedfaculty = faculty.find(
      (faculty) =>
        faculty.FacultyKey === penNo && faculty.Password === parentNo
    );

    if (matchedfaculty) {
      console.log(faculty);
      navigate(`/postmarks`);
    } else {
      setError("Invalid Pen Number or Parent Phone Number.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <h2 className="card-title text-center">Faculty Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="penNo" className="form-label">
                Pen Number
              </label>
              <input
                type="text"
                id="penNo"
                className="form-control"
                value={penNo}
                onChange={(e) => setPenNo(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="parentNo" className="form-label">
                Parent Phone Number
              </label>
              <input
                type="text"
                id="parentNo"
                className="form-control"
                value={parentNo}
                onChange={(e) => setParentNo(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </div>
    </div>
  );
}
export default FLoginPage;
