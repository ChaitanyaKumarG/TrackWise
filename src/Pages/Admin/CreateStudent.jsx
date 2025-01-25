import React, { useState } from "react";
import { createStudent } from "../../Services/Parent/studentService";

function CreateStudent() {
  const initialFormData = {
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
  };

  const [formData, setFormData] = useState(initialFormData);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setSuccess("");
    setError("");
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.StudentName.trim())
      errors.StudentName = "Student name is required";
    if (!formData.FatherName.trim())
      errors.FatherName = "Father's name is required";
    if (!formData.MotherName.trim())
      errors.MotherName = "Mother's name is required";
    if (!/^\d{10}$/.test(formData.ParentNumber))
      errors.ParentNumber = "Enter valid 10-digit number";
    if (!formData.PENNumber.trim()) errors.PENNumber = "PEN number is required";
    if (!formData.DOB) errors.DOB = "Date of birth is required";
    if (!formData.Gender) errors.Gender = "Gender is required";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setError("Please fill all required fields correctly");
      return;
    }

    setLoading(true);
    try {
      await createStudent(formData);
      setSuccess("Student registered successfully!");
      setFormData(initialFormData);
      setStep(1);
    } catch (err) {
      setError("Failed to register student. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formSections = [
    {
      title: "Basic Information",
      fields: [
        {
          name: "StudentName",
          label: "Student Name",
          type: "text",
          icon: "bi-person-fill",
          placeholder: "Enter student's full name",
        },
        {
          name: "DOB",
          label: "Date of Birth",
          type: "date",
          icon: "bi-calendar-fill",
        },
        {
          name: "Gender",
          label: "Gender",
          type: "select",
          icon: "bi-gender-ambiguous",
          options: ["Male", "Female", "Other"],
        },
        {
          name: "AdmissionNumber",
          label: "Admission Number",
          type: "text",
          icon: "bi-hash",
          placeholder: "Enter admission number",
        },
      ],
    },
    {
      title: "Parent Information",
      fields: [
        {
          name: "FatherName",
          label: "Father's Name",
          type: "text",
          icon: "bi-person-fill",
          placeholder: "Enter father's name",
        },
        {
          name: "MotherName",
          label: "Mother's Name",
          type: "text",
          icon: "bi-person-fill",
          placeholder: "Enter mother's name",
        },
        {
          name: "ParentNumber",
          label: "Parent's Contact",
          type: "tel",
          icon: "bi-telephone-fill",
          placeholder: "Enter 10-digit number",
        },
        {
          name: "FatherOccupation",
          label: "Father's Occupation",
          type: "text",
          icon: "bi-briefcase-fill",
          placeholder: "Enter occupation",
        },
      ],
    },
    {
      title: "Academic Information",
      fields: [
        {
          name: "PENNumber",
          label: "PEN Number",
          type: "text",
          icon: "bi-key-fill",
          placeholder: "Enter PEN number",
        },
        {
          name: "ClassID",
          label: "Class",
          type: "text",
          icon: "bi-mortarboard-fill",
          placeholder: "Enter class ID",
        },
        {
          name: "Address",
          label: "Address",
          type: "textarea",
          icon: "bi-geo-alt-fill",
          placeholder: "Enter full address",
        },
      ],
    },
  ];

  return (
    <div className="container-fluid py-4 px-lg-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 col-xl-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              {/* Progress Bar */}
              <div className="progress mb-4" style={{ height: "4px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${(step / formSections.length) * 100}%` }}
                />
              </div>

              {/* Header */}
              <div className="text-center mb-4">
                <i className="bi bi-person-plus-fill text-primary fs-1"></i>
                <h4 className="mt-2 mb-1">{formSections[step - 1].title}</h4>
                <small className="text-muted">
                  Step {step} of {formSections.length}
                </small>
              </div>

              {/* Alerts */}
              {success && (
                <div className="alert alert-success d-flex align-items-center mb-4">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  <div>{success}</div>
                </div>
              )}
              {error && (
                <div className="alert alert-danger d-flex align-items-center mb-4">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <div>{error}</div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  {formSections[step - 1].fields.map((field) => (
                    <div className="col-12 col-md-6" key={field.name}>
                      <div className="mb-3">
                        <label className="form-label small fw-bold">
                          {field.label}
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0">
                            <i className={`bi ${field.icon}`}></i>
                          </span>
                          {field.type === "select" ? (
                            <select
                              name={field.name}
                              className="form-select border-start-0"
                              value={formData[field.name]}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Select {field.label}</option>
                              {field.options.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          ) : field.type === "textarea" ? (
                            <textarea
                              name={field.name}
                              className="form-control border-start-0"
                              placeholder={field.placeholder}
                              value={formData[field.name]}
                              onChange={handleInputChange}
                              rows="3"
                            />
                          ) : (
                            <input
                              type={field.type}
                              name={field.name}
                              className="form-control border-start-0"
                              placeholder={field.placeholder}
                              value={formData[field.name]}
                              onChange={handleInputChange}
                              required
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <div className="d-flex gap-3 mt-4">
                  {step > 1 && (
                    <button
                      type="button"
                      className="btn btn-outline-primary flex-grow-1"
                      onClick={() => setStep(step - 1)}
                    >
                      <i className="bi bi-arrow-left me-2"></i>
                      Previous
                    </button>
                  )}
                  {step < formSections.length && (
                    <button
                      type="button"
                      className="btn btn-primary flex-grow-1"
                      onClick={() => setStep(step + 1)}
                    >
                      Next
                      <i className="bi bi-arrow-right ms-2"></i>
                    </button>
                  )}
                  {step === formSections.length && (
                    <button
                      type="submit"
                      className="btn btn-success flex-grow-1"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Registering...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check-circle me-2"></i>
                          Register Student
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateStudent;
