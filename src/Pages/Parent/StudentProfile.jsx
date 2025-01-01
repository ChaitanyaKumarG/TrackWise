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
    return <div className="text-danger text-center mt-5">{error}</div>;
  }

  if (!student) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Student Details</h2>
      <div className="card">
        <div className="card-body">
          <p>
            <strong>Name:</strong> {student.StudentName}
          </p>
          <p>
            <strong>PEN Number:</strong> {student.PENNumber}
          </p>

          <p>
            <strong>Parent Phone Number:</strong> {student.ParentNumber}
          </p>

          <p>
            <strong>Father's Name:</strong> {student.FatherName}
          </p>

          <p>
            <strong>Mother's Name:</strong> {student.MotherName}
          </p>

          <p>
            <strong>Gender:</strong> {student.Gender}
          </p>

          <p>
            <strong>Date of Birth:</strong> {student.DOB}
          </p>

          <p>
            <strong>Admission Number:</strong> {student.AdmissionNumber}
          </p>

          <p>
            <strong>Address:</strong> {student.Address}
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/studentmarks/${student.StudentID}`)}
          >
            View Marks
          </button>
        </div>
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
