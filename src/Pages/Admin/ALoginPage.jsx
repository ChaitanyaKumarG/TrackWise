import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ALoginPage() {
  const [penNo, setPenNo] = useState("");
  const [parentNo, setParentNo] = useState("");
  const [admin, setAdmin] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all students
    axios
      .get("http://127.0.0.1:1321/admin")
      .then((response) => setAdmin(response.data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const matchedfaculty = admin.find(
      (admin) => admin.AdminKey === penNo && admin.Password === parentNo
    );

    if (matchedfaculty) {
      console.log(admin);
      navigate(`/adminhomepage`);
    } else {
      setError("Invalid Pen Number or Parent Phone Number.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <h2 className="card-title text-center">Admin Login</h2>
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
export default ALoginPage;
