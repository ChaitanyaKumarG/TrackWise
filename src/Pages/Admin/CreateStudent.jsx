import React, { useState } from "react";
import axios from "axios";
import { createStudent } from "../../Services/Parent/studentService";


function CreateStudent() {
  const [formData, setFormData] = useState({
    StudentName: "",
    FatherName: "",
    MotherName: "",
    ParentNumber: "",
    FatherOccupation: "",
    PENNumber: "",
    AdmissionNumber: "",
    ClassID: "",
    Address: "",
    DOB: "",
    Gender: "",
    Photo: "",
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
      await createStudent(formData);
      setSuccess("Student created successfully!");
      setFormData({
        StudentName: "",
        FatherName: "",
        MotherName: "",
        ParentNumber: "",
        FatherOccupation: "",
        PENNumber: "",
        AdmissionNumber: "",
        ClassID: "",
        Address: "",
        DOB: "",
        Gender: "",
        Photo: "",
      });
    } catch (err) {
      setError("Failed to create student.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Student</h2>
      {success && <p className="alert alert-success">{success}</p>}
      {error && <p className="alert alert-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div className="mb-3" key={key}>
            <label className="form-label">{key}</label>
            <input
              type={key === "DOB" ? "date" : "text"}
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

export default CreateStudent;
