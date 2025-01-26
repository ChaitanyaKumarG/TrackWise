import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import postMarksService from "../../Services/Faculty/postingMarksServices";

function StudentData() {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await postMarksService.getClasses();
        setClasses(response.data);
      } catch (err) {
        setError("Failed to fetch classes. Please try again later.");
      }
    };
    fetchClasses();
  }, []);

  const fetchStudents = async (classId) => {
    setLoading(true);
    try {
      const response = await postMarksService.getStudentsByClass(classId);
      setStudents(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch students. Please try again later.");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClassChange = (event) => {
    const classId = event.target.value;
    setSelectedClass(classId);
    setSearchTerm("");
    if (classId) {
      fetchStudents(classId);
    } else {
      setStudents([]);
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.StudentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.PENNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-5 mb-5 min-vh-100 homepage-wrapper px-3 px-md-4 px-lg-5 py-4">
      {/* Header Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h2 className="h4 mb-4">
            <i className="bi bi-mortarboard-fill me-2"></i>
            Student Management
          </h2>

          {/* Class Selection */}
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Select Class</label>
              <select
                className="form-select"
                value={selectedClass}
                onChange={handleClassChange}
              >
                <option value="">Choose a class...</option>
                {classes.map((cls) => (
                  <option key={cls.ClassID} value={cls.ClassID}>
                    {cls.ClassStandard}
                  </option>
                ))}
              </select>
            </div>

            {selectedClass && (
              <div className="col-md-6">
                <label className="form-label">Search Students</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0 ps-0"
                    placeholder="Search by name or PEN number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div
          className="alert alert-danger d-flex align-items-center"
          role="alert"
        >
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          <div>{error}</div>
        </div>
      )}

      {/* Students List */}
      {selectedClass && !loading && !error && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredStudents.map((student) => (
            <div key={student.PENNumber} className="col">
              <div className="card h-100 border-0 shadow-sm hover-shadow">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                      {student.Photo ? (
                        <img
                          src={student.Photo}
                          alt={student.StudentName}
                          className="rounded-circle"
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <i className="bi bi-person-fill text-primary fs-4"></i>
                      )}
                    </div>
                    <div>
                      <h5 className="card-title mb-1">{student.StudentName}</h5>
                      <small className="text-muted">
                        PEN: {student.PENNumber}
                      </small>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-calendar3 me-2 text-muted"></i>
                      <small>
                        {new Date(student.DOB).toLocaleDateString()}
                      </small>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-people me-2 text-muted"></i>
                      <small>
                        {student.FatherName} & {student.MotherName}
                      </small>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-telephone me-2 text-muted"></i>
                      <small>{student.ParentNumber}</small>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary w-100"
                    onClick={() =>
                      navigate(`/studentmarks/${student.StudentID}`)
                    }
                  >
                    <i className="bi bi-graph-up me-2"></i>
                    View Academic Records
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {selectedClass && !loading && !error && filteredStudents.length === 0 && (
        <div className="text-center py-5">
          <i className="bi bi-search display-1 text-muted"></i>
          <p className="mt-3 text-muted">
            No students found matching your search criteria.
          </p>
        </div>
      )}

      <style>
        {`
          .hover-shadow {
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          }
          .hover-shadow:hover {
            transform: translateY(-3px);
            box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
          }
        `}
      </style>
    </div>
  );
}

export default StudentData;
