import React, { useState, useEffect } from "react";
import axios from "axios";
import attendanceService from "../../Services/Faculty/attendanceService";

const SuccessModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body text-center p-5">
            <div className="mb-4">
              <i
                className="bi bi-check-circle-fill text-success"
                style={{ fontSize: "4rem" }}
              ></i>
            </div>
            <h4 className="mb-3">Absent Records Submitted Successfully!</h4>
            <button className="btn btn-primary btn-lg w-100" onClick={onClose}>
              <i className="bi bi-box-arrow-right me-2"></i>
              Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Attendance = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [absentStudents, setAbsentStudents] = useState([]);
  const [showStudents, setShowStudents] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const classRes = await axios.get(
          "https://be-six-sandy.vercel.app/class"
        );
        setClasses(classRes.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      setLoading(true);
      attendanceService
        .getStudentsByClass(selectedClass)
        .then((res) => {
          setStudents(res.data);
          setAbsentStudents([]); // Reset absent students when class changes
        })
        .catch((error) => console.error("Error fetching students:", error))
        .finally(() => setLoading(false));
    }
  }, [selectedClass]);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleAttendanceChange = (studentID, isAbsent) => {
    if (isAbsent) {
      // Add student to absent list
      setAbsentStudents((prev) => [...prev, studentID]);
    } else {
      // Remove student from absent list
      setAbsentStudents((prev) => prev.filter((id) => id !== studentID));
    }
  };

  const handleProceed = () => {
    if (!selectedClass) {
      alert("Please select a class.");
      return;
    }
    setShowStudents(true);
  };

  const handleSubmit = async () => {
    // Create absent records for submission
    const absentRecords = absentStudents.map((studentID) => ({
      ClassID: parseInt(selectedClass),
      StudentID: studentID,
      Attendance: 0,
    }));

    try {
      setLoading(true);
      // Only submit if there are absent students
      if (absentRecords.length > 0) {
        for (const record of absentRecords) {
          await attendanceService.submitAttendance(record);
        }
      }
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Error submitting attendance");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    setShowStudents(false);
    setSelectedClass("");
    setAbsentStudents([]);
    window.location.reload();
  };

  if (loading) {
    return (
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-lg-5 min-vh-100 homepage-wrapper">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 col-xl-6">
          {!showStudents ? (
            <div className="card shadow-sm mt-5">
              <div className="card-header bg-primary text-white py-3">
                <h4 className="mb-0 text-center">
                  <i className="bi bi-check-circle me-2"></i>
                  Mark Absent Students
                </h4>
              </div>
              <div className="card-body p-4">
                <div className="mb-4">
                  <label className="form-label">
                    <i className="bi bi-mortarboard me-2"></i>Class
                  </label>
                  <select
                    className="form-select form-select-lg mb-3"
                    name="selectedClass"
                    value={selectedClass}
                    onChange={handleClassChange}
                  >
                    <option value="">Select Class</option>
                    {classes.map((cls) => (
                      <option key={cls.ClassID} value={cls.ClassID}>
                        {cls.ClassStandard}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className="btn btn-primary btn-lg w-100"
                  onClick={handleProceed}
                  disabled={!selectedClass}
                >
                  <i className="bi bi-arrow-right-circle me-2"></i>
                  Proceed to Mark Absent Students
                </button>
              </div>
            </div>
          ) : (
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center py-3">
                <button
                  className="btn btn-link text-white p-0"
                  onClick={() => setShowStudents(false)}
                >
                  <i className="bi bi-arrow-left-circle fs-4"></i>
                </button>
                <h4 className="mb-0">Mark Absent Students</h4>
                <div style={{ width: "24px" }}></div>
              </div>
              <div className="card-body p-0">
                <div className="alert alert-info m-3">
                  <i className="bi bi-info-circle me-2"></i>
                  Check the box to mark a student as absent. Only absent records
                  will be stored.
                </div>
                <div className="table-responsive">
                  <table className="table table-hover table-striped mb-0">
                    <thead className="table-light sticky-top">
                      <tr>
                        <th className="text-center">#</th>
                        <th>Name</th>
                        <th className="text-center">Absent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr key={student.StudentID}>
                          <td className="text-center">{index + 1}</td>
                          <td>{student.StudentName}</td>
                          <td className="text-center">
                            <div className="form-check d-flex justify-content-center">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={absentStudents.includes(
                                  student.StudentID
                                )}
                                onChange={(e) =>
                                  handleAttendanceChange(
                                    student.StudentID,
                                    e.target.checked
                                  )
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer p-3">
                <button
                  className="btn btn-primary btn-lg w-100"
                  onClick={handleSubmit}
                  disabled={absentStudents.length === 0}
                >
                  <i className="bi bi-save me-2"></i>
                  Submit Absent Records
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <SuccessModal show={showSuccessModal} onClose={handleModalClose} />
    </div>
  );
};

export default Attendance;
