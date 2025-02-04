import React, { useState } from "react";
import attendanceService from "../../Services/Faculty/attendanceService";
import * as studentService from "../../Services/Parent/studentService";

const Absentees = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [absenteeData, setAbsenteeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [groupedAbsentees, setGroupedAbsentees] = useState({});
  const [emailStatus, setEmailStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setError("");
    setEmailStatus({ loading: false, success: false, error: null });
  };

  const handleSendEmails = async () => {
    try {
      setEmailStatus({ loading: true, success: false, error: null });
      await attendanceService.sendAbsenteeEmails(selectedDate);
      setEmailStatus({ loading: false, success: true, error: null });

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setEmailStatus((prev) => ({ ...prev, success: false }));
      }, 5000);
    } catch (error) {
      console.error("Error sending emails:", error);
      setEmailStatus({
        loading: false,
        success: false,
        error: "Failed to send emails. Please try again.",
      });
    }
  };

  const fetchAbsentees = async () => {
    if (!selectedDate) {
      setError("Please select a date");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setEmailStatus({ loading: false, success: false, error: null });
      const response = await attendanceService.grtAttendanceByDate(
        selectedDate
      );

      // Fetch detailed student information for each absentee
      const enrichedData = await Promise.all(
        response.data.map(async (record) => {
          try {
            const studentDetails = await studentService.fetchStudentDetailsbyID(
              record.StudentID
            );
            return {
              ...record,
              ...studentDetails,
            };
          } catch (error) {
            console.error(
              `Error fetching details for student ${record.StudentID}:`,
              error
            );
            return record;
          }
        })
      );

      setAbsenteeData(enrichedData);

      // Group absentees by class with detailed information
      const grouped = enrichedData.reduce((acc, curr) => {
        const classKey = curr.ClassStandard || "Unassigned";
        if (!acc[classKey]) {
          acc[classKey] = [];
        }
        acc[classKey].push(curr);
        return acc;
      }, {});

      setGroupedAbsentees(grouped);
    } catch (error) {
      console.error("Error fetching absentee data:", error);
      setError("Failed to fetch absentee data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid px-lg-5 min-vh-100 homepage-wrapper">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="card shadow-sm mt-5">
            <div className="card-header bg-primary text-white py-3">
              <h4 className="mb-0 text-center">
                <i className="bi bi-calendar-check me-2"></i>
                Daily Absentee Report
              </h4>
            </div>

            <div className="card-body p-4">
              <div className="row g-3 align-items-end">
                <div className="col-md-8">
                  <label className="form-label">
                    <i className="bi bi-calendar3 me-2"></i>Select Date
                  </label>
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    value={selectedDate}
                    onChange={handleDateChange}
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="col-md-4">
                  <button
                    className="btn btn-primary btn-lg w-100"
                    onClick={fetchAbsentees}
                    disabled={loading || !selectedDate}
                  >
                    <i className="bi bi-search me-2"></i>
                    View Report
                  </button>
                </div>
              </div>

              {error && (
                <div className="alert alert-danger mt-3">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              {emailStatus.error && (
                <div className="alert alert-danger mt-3">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {emailStatus.error}
                </div>
              )}

              {emailStatus.success && (
                <div className="alert alert-success mt-3">
                  <i className="bi bi-check-circle me-2"></i>
                  Emails sent successfully to parents of absent students.
                </div>
              )}

              {loading && (
                <div className="text-center my-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Loading absentee data...</p>
                </div>
              )}

              {!loading && Object.keys(groupedAbsentees).length > 0 && (
                <div className="mt-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0">
                      <i className="bi bi-list-check me-2"></i>
                      Absentee List for{" "}
                      {new Date(selectedDate).toLocaleDateString()}
                    </h5>
                    <button
                      className="btn btn-success"
                      onClick={handleSendEmails}
                      disabled={emailStatus.loading || !absenteeData.length}
                    >
                      {emailStatus.loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-envelope me-2"></i>
                          Send Emails to Parents
                        </>
                      )}
                    </button>
                  </div>

                  <div className="accordion" id="absenteeAccordion">
                    {Object.entries(groupedAbsentees).map(
                      ([className, students], index) => (
                        <div className="accordion-item" key={index}>
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapse${index}`}
                            >
                              <strong>Class {className}</strong>
                              <span className="badge bg-primary ms-2">
                                {students.length} students
                              </span>
                            </button>
                          </h2>
                          <div
                            id={`collapse${index}`}
                            className="accordion-collapse collapse show"
                            data-bs-parent="#absenteeAccordion"
                          >
                            <div className="accordion-body p-0">
                              <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                  <thead className="table-light">
                                    <tr>
                                      <th className="ps-3">#</th>
                                      <th>Student Details</th>
                                      <th>Parent Contact</th>
                                      <th>Admission Info</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {students.map((student, idx) => (
                                      <tr key={student.StudentID}>
                                        <td className="ps-3">{idx + 1}</td>
                                        <td>
                                          <div className="d-flex align-items-center">
                                            <img
                                              src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid"
                                              alt={student.StudentName}
                                              className="rounded-circle me-2"
                                              style={{
                                                width: "40px",
                                                height: "40px",
                                              }}
                                            />
                                            <div>
                                              <div className="fw-bold">
                                                {student.StudentName}
                                              </div>
                                              <small className="text-muted">
                                                <i className="bi bi-fingerprint me-1"></i>
                                                {student.PENNumber}
                                              </small>
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div>
                                            <small className="text-muted d-block">
                                              <i className="bi bi-telephone me-1"></i>
                                              {student.ParentNumber}
                                            </small>
                                            <small className="text-muted d-block">
                                              <i className="bi bi-people me-1"></i>
                                              {student.FatherName}
                                            </small>
                                          </div>
                                        </td>
                                        <td>
                                          <div>
                                            <small className="text-muted d-block">
                                              <i className="bi bi-card-text me-1"></i>
                                              Adm: {student.AdmissionNumber}
                                            </small>
                                            <small className="text-muted d-block">
                                              <i className="bi bi-gender-ambiguous me-1"></i>
                                              {student.Gender}
                                            </small>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  <div className="alert alert-info mt-4">
                    <i className="bi bi-info-circle me-2"></i>
                    Total Absentees: {absenteeData.length} students across{" "}
                    {Object.keys(groupedAbsentees).length} classes
                  </div>
                </div>
              )}

              {!loading &&
                selectedDate &&
                Object.keys(groupedAbsentees).length === 0 && (
                  <div className="alert alert-success mt-4">
                    <i className="bi bi-check-circle me-2"></i>
                    No absentees recorded for this date.
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Absentees;
