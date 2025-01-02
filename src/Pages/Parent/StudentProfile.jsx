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
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <div
        className="start-0 w-100 bg-dark text-white "
        style={{ zIndex: 1030 }}
      >
        <div className="d-flex align-items-center">
          <button
            className="btn btn-link text-white p-0 me-3"
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-arrow-left fs-4"></i>
          </button>
          <h6 className="mb-0">Student Profile</h6>
        </div>
      </div>

      {/* Content with padding for fixed header */}
      <div className="pb-5">
        {/* Profile Section */}
        <div className="text-center p-4 bg-primary bg-opacity-10">
          <div className="position-relative d-inline-block mb-3">
            <img
              src={student.ImageURL || "/default-avatar.png"}
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

        {/* Info Cards */}
        <div className="p-3">
          {/* Quick Stats */}
          <div className="row g-2 mb-4">
            <div className="col-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-2 text-center">
                  <i className="bi bi-mortarboard-fill text-primary fs-4"></i>
                  <div className="small mt-1">Class</div>
                  <div className="fw-bold small">10th</div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-2 text-center">
                  <i className="bi bi-calendar-check text-primary fs-4"></i>
                  <div className="small mt-1">Attendance</div>
                  <div className="fw-bold small">95%</div>
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

          {/* Address */}
          <div className="card border-0 shadow-sm mb-5">
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
      </div>

      {/* Fixed Bottom Action Button */}
      <div
        className="position-fixed bottom-0 start-0 w-100 p-3 bg-white shadow-lg"
        style={{ zIndex: 1030 }}
      >
        <button
          className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
          onClick={() => navigate(`/studentmarks/${student.StudentID}`)}
        >
          <i className="bi bi-graph-up"></i>
          View Academic Performance
        </button>
      </div>
    </div>
  );
};

export default StudentProfile;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// function StudentProfile() {
//   const { penNo } = useParams();
//   const [student, setStudent] = useState(null);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       if (!penNo) {
//         setError("Pen Number is missing in the URL.");
//         return;
//       }

//       try {
//         const response = await axios.get(
//           `http://127.0.0.1:1321/student/penno/${penNo}`
//         );
//         console.log("Student data:", response.data);

//         if (response.data && response.data.length > 0) {
//           // Take the first student from the array
//           setStudent(response.data[0]);

//         } else {
//           setError("No data found for this Pen Number.");
//         }
//       } catch (err) {
//         console.error("Error fetching student details:", err);
//         setError("Failed to fetch student details.");
//       }
//     };

//     fetchStudentData();
//   }, [penNo]);

//   if (error) {
//     return <div className="text-danger text-center mt-5">{error}</div>;
//   }

//   if (!student) {
//     return <div className="text-center mt-5">Loading...</div>;
//   }

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Student Details</h2>
//       <div className="card">
//         <div className="card-body">
//           <p>
//             <strong>Name:</strong> {student.StudentName}
//           </p>
//           <p>
//             <strong>Pen Number:</strong> {student.PENNumber}
//           </p>
//           <p>
//             <strong>Parent Phone Number:</strong> {student.ParentNumber}
//           </p>
//           <p>
//             <strong>Father's Name:</strong> {student.FatherName}
//           </p>
//           <p>
//             <strong>Mother's Name:</strong> {student.MotherName}
//           </p>
//           <p>
//             <strong>Gender:</strong> {student.Gender}
//           </p>
//           <p>
//             <strong>Date of Birth:</strong> {student.DOB}
//           </p>
//           <p>
//             <strong>Admission Number:</strong> {student.AdmissionNumber}
//           </p>
//           <p>
//             <strong>Address:</strong> {student.Address}
//           </p>
//           <button
//             className="btn btn-primary"
//             onClick={() => {
//               if (student.StudentID) {
//                 navigate(`/studentmarks/${student.StudentID}`);
//               } else {
//                 alert("Unable to fetch Student ID. Please check the details.");
//               }
//             }}
//           >
//             View Marks
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default StudentProfile;
