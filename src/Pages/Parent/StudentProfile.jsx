import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchStudentDetails } from "../../Services/Parent/studentService";

const StudentProfile = () => {
  const { penNo } = useParams();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchStudentDetails(penNo);
        setStudent(data);
      } catch (err) {
        setError("Failed to fetch student details.");
      }
    };
    fetchDetails();
  }, [penNo]);

  if (error) {
    return (
      <div className="alert alert-danger m-3 text-center" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {error}
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-0 homepage-wrapper">
      <div className="row g-0">
        {/* Desktop Layout with Sidebar */}
        <div
          className="col-12 col-md-4 col-lg-3 bg-light d-none d-md-block"
          style={{ minHeight: "100vh" }}
        >
          {/* Profile Section for Desktop Sidebar */}
          <div className="text-center p-4 bg-primary bg-opacity-10 sticky-top">
            <div className="position-relative d-inline-block mb-3">
              <img
                src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid"
                alt={student.StudentName}
                className="rounded-circle border border-4 border-white shadow-sm"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <span className="position-absolute bottom-0 end-0 bg-success rounded-circle p-2 border border-3 border-white">
                <i className="bi bi-check-lg text-white"></i>
              </span>
            </div>
            <h4 className="mb-1 fw-bold">{student.StudentName}</h4>
            <div className="d-flex align-items-center justify-content-center">
              <i className="bi bi-fingerprint text-primary me-2"></i>
              <span className="text-muted">{student.PENNumber}</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="col-12 col-md-8 col-lg-9">
          {/* Mobile Profile Section (Hidden on Desktop) */}
          <div className="text-center p-4 bg-primary bg-opacity-10 d-md-none">
            <div className="position-relative d-inline-block mb-3">
              <img
                src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid"
                alt={student.StudentName}
                className="rounded-circle border border-4 border-white shadow-sm"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <span className="position-absolute bottom-0 end-0 bg-success rounded-circle p-2 border border-3 border-white">
                <i className="bi bi-check-lg text-white"></i>
              </span>
            </div>
            <h5 className="mb-1 fw-bold">{student.StudentName}</h5>
            <div className="d-flex align-items-center justify-content-center">
              <i className="bi bi-fingerprint text-primary me-2"></i>
              <span className="text-muted small">{student.PENNumber}</span>
            </div>
          </div>

          <div className="container-fluid p-md-4 p-3">
            {/* Quick Stats */}
            <div className="row g-3 mb-4">
              <div className="col-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-2 text-center">
                    <i className="bi bi-mortarboard-fill text-primary fs-4"></i>
                    <div className="small mt-1">Class</div>
                    <div className="fw-bold small">{student.ClassID}</div>
                  </div>
                </div>
              </div>
              <div
                className="col-4"
                role="button"
                onClick={() => navigate(`/attendance/${student.StudentID}`)}
              >
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-2 text-center">
                    <i className="bi bi-calendar-check text-primary fs-4"></i>
                    <div className="small mt-1">Attendance</div>
                    <div className="fw-bold small">View</div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-2 text-center">
                    <i className="bi bi-graph-up-arrow text-primary fs-4"></i>
                    <div className="small mt-1">Rank</div>
                    <div className="fw-bold small">#5</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="row g-3">
              <div className="col-12 col-lg-6">
                {/* Personal Details */}
                <div className="card border-0 shadow-sm mb-3">
                  <div className="card-header bg-white border-0">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-person-badge fs-5 text-primary me-2"></i>
                      <h6 className="mb-0">Personal Details</h6>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="list-group list-group-flush">
                      <div className="list-group-item px-0 d-flex justify-content-between">
                        <small className="text-muted">Gender</small>
                        <small>{student.Gender}</small>
                      </div>
                      <div className="list-group-item px-0 d-flex justify-content-between">
                        <small className="text-muted">Date of Birth</small>
                        <small>{student.DOB}</small>
                      </div>
                      <div className="list-group-item px-0 d-flex justify-content-between">
                        <small className="text-muted">Admission No</small>
                        <small>{student.AdmissionNumber}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                {/* Family Details */}
                <div className="card border-0 shadow-sm mb-3">
                  <div className="card-header bg-white border-0">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-people fs-5 text-primary me-2"></i>
                      <h6 className="mb-0">Family Details</h6>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="list-group list-group-flush">
                      <div className="list-group-item px-0">
                        <small className="text-muted d-block mb-1">
                          Father's Name
                        </small>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-person text-primary me-2"></i>
                          {student.FatherName}
                        </div>
                      </div>
                      <div className="list-group-item px-0">
                        <small className="text-muted d-block mb-1">
                          Mother's Name
                        </small>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-person-heart text-primary me-2"></i>
                          {student.MotherName}
                        </div>
                      </div>
                      <div className="list-group-item px-0">
                        <small className="text-muted d-block mb-1">
                          Contact Number
                        </small>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-telephone text-primary me-2"></i>
                          {student.ParentNumber}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="card border-0 shadow-sm mb-2">
              <div className="card-header bg-white border-0">
                <div className="d-flex align-items-center">
                  <i className="bi bi-geo-alt fs-5 text-primary me-2"></i>
                  <h6 className="mb-0">Address</h6>
                </div>
              </div>
              <div className="card-body">
                <p className="mb-0 small">{student.Address}</p>
              </div>
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div
            className="position-sticky bottom-0 w-100 p-3 bg-white shadow-lg"
            style={{ zIndex: 1030 }}
          >
            <div className="d-grid gap-2">
              <button
                className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
                onClick={() => navigate(`/studentmarks/${student.StudentID}`)}
              >
                <i className="bi bi-graph-up"></i>
                View Academic Performance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
