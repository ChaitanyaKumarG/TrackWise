import React, { useState } from "react";
import axios from "axios";

function CreateFaculty() {
  const [formData, setFormData] = useState({
    Name: "",
    PhNo: "",
    Email: "",
    FacultyKey: "",
    Password: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:1321/faculty", formData);
      setSuccess("Faculty created successfully!");
      setFormData({
        Name: "",
        PhNo: "",
        Email: "",
        FacultyKey: "",
        Password: "",
      });
    } catch (err) {
      setError("Failed to create faculty.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Faculty</h2>
      {success && <p className="alert alert-success">{success}</p>}
      {error && <p className="alert alert-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div className="mb-3" key={key}>
            <label className="form-label">{key}</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              className="form-control"
              onChange={handleInputChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateFaculty;
