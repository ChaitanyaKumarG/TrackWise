import React, { useState } from "react";
import { createFaculty } from "../../Services/Faculty/facultyService";

function CreateFaculty() {
  const initialFormData = {
    Name: "",
    PhNo: "",
    Email: "",
    FacultyKey: "",
    Password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear messages when user starts typing
    setSuccess("");
    setError("");
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.Name.trim()) errors.Name = "Name is required";
    if (!formData.PhNo.trim()) errors.PhNo = "Phone number is required";
    if (!/^\d{10}$/.test(formData.PhNo))
      errors.PhNo = "Enter a valid 10-digit phone number";

    if (!formData.Email.trim()) errors.Email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.Email))
      errors.Email = "Enter a valid email address";

    if (!formData.FacultyKey.trim())
      errors.FacultyKey = "Faculty Key is required";
    if (!formData.Password.trim()) errors.Password = "Password is required";
    if (formData.Password.length < 6)
      errors.Password = "Password must be at least 6 characters";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setError("Please correct the highlighted fields");
      return;
    }

    setLoading(true);
    try {
      await createFaculty(formData);
      setSuccess("Faculty member created successfully!");
      setFormData(initialFormData);
    } catch (err) {
      setError("Failed to create faculty. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    {
      name: "Name",
      type: "text",
      icon: "bi-person-fill",
      placeholder: "Enter faculty name",
    },
    {
      name: "PhNo",
      type: "tel",
      icon: "bi-telephone-fill",
      placeholder: "Enter 10-digit phone number",
    },
    {
      name: "Email",
      type: "email",
      icon: "bi-envelope-fill",
      placeholder: "Enter email address",
    },
    {
      name: "FacultyKey",
      type: "text",
      icon: "bi-key-fill",
      placeholder: "Enter unique faculty key",
    },
    {
      name: "Password",
      type: "password",
      icon: "bi-lock-fill",
      placeholder: "Enter password",
      showToggle: true,
    },
  ];

  return (
    <div className="container-fluid py-4 px-3">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              {/* Header */}
              <div className="text-center mb-4">
                <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                  <i className="bi bi-person-plus-fill text-primary fs-3"></i>
                </div>
                <h2 className="h4">Create New Faculty</h2>
                <p className="text-muted">Enter faculty member details below</p>
              </div>

              {/* Alert Messages */}
              {success && (
                <div
                  className="alert alert-success d-flex align-items-center"
                  role="alert"
                >
                  <i className="bi bi-check-circle-fill me-2"></i>
                  <div>{success}</div>
                </div>
              )}
              {error && (
                <div
                  className="alert alert-danger d-flex align-items-center"
                  role="alert"
                >
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <div>{error}</div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate>
                {inputFields.map((field) => (
                  <div className="mb-3" key={field.name}>
                    <label className="form-label">
                      {field.name.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className={`bi ${field.icon}`}></i>
                      </span>
                      <input
                        type={
                          field.showToggle
                            ? showPassword
                              ? "text"
                              : "password"
                            : field.type
                        }
                        name={field.name}
                        className="form-control border-start-0"
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        required
                      />
                      {field.showToggle && (
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i
                            className={`bi ${
                              showPassword ? "bi-eye-slash" : "bi-eye"
                            }`}
                          ></i>
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 mt-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Creating Faculty...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-plus-circle me-2"></i>
                      Create Faculty
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateFaculty;
