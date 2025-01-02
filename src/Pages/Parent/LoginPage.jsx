import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllStudents } from "../../Services/Parent/studentService";

const LoginPage = () => {
  const [penNo, setPenNo] = useState("");
  const [parentNo, setParentNo] = useState("");
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await fetchAllStudents();
        setStudents(data);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };
    fetchStudents();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const matchedStudent = students.find(
      (student) =>
        student.PENNumber === penNo && student.ParentNumber === parentNo
    );

    setTimeout(() => {
      setIsLoading(false);
      if (matchedStudent) {
        navigate(`/studentprofile/${penNo}`);
      } else {
        setError("Invalid Pen Number or Parent Phone Number.");
      }
    }, 800); // Added slight delay for loading effect
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-light" style={{height:"100vh"}}>
      <div className="container px-4">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            {/* Logo/Icon Section */}
            <div className="text-center mb-4">
              <i
                className="bi bi-mortarboard-fill text-primary"
                style={{ fontSize: "3rem" }}
              ></i>
              <h4 className="mt-3 mb-4 fw-bold">Parent Portal</h4>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-person-badge"></i>
                  </span>
                  <input
                    type="text"
                    id="penNo"
                    className="form-control border-start-0 ps-0"
                    placeholder="Enter PEN Number"
                    value={penNo}
                    onChange={(e) => setPenNo(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-phone"></i>
                  </span>
                  <input
                    type="tel"
                    id="parentNo"
                    className="form-control border-start-0 ps-0"
                    placeholder="Enter Parent Phone Number"
                    value={parentNo}
                    onChange={(e) => setParentNo(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2 mb-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>

              {error && (
                <div
                  className="alert alert-danger d-flex align-items-center"
                  role="alert"
                >
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <div>{error}</div>
                </div>
              )}
            </form>

            <div className="text-center mt-4">
              <small className="text-muted">
                Need help? Contact your school administrator
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function LoginPage() {
//   const [penNo, setPenNo] = useState("");
//   const [parentNo, setParentNo] = useState("");
//   const [students, setStudents] = useState([]);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch all students
//     axios
//       .get("http://127.0.0.1:1321/student")
//       .then((response) => setStudents(response.data))
//       .catch((err) => console.error("Error fetching students:", err));
//   }, []);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setError("");

//     const matchedStudent = students.find(
//       (student) => student.PENNumber === penNo && student.ParentNumber === parentNo
//     );

//     if (matchedStudent) {
//       console.log(students);
//       navigate(`/studentprofile/${penNo}`);
//     } else {
//       setError("Invalid Pen Number or Parent Phone Number.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card mx-auto" style={{ maxWidth: "400px" }}>
//         <div className="card-body">
//           <h2 className="card-title text-center">Parent Login</h2>
//           <form onSubmit={handleLogin}>
//             <div className="mb-3">
//               <label htmlFor="penNo" className="form-label">
//                 Pen Number
//               </label>
//               <input
//                 type="text"
//                 id="penNo"
//                 className="form-control"
//                 value={penNo}
//                 onChange={(e) => setPenNo(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="parentNo" className="form-label">
//                 Parent Phone Number
//               </label>
//               <input
//                 type="text"
//                 id="parentNo"
//                 className="form-control"
//                 value={parentNo}
//                 onChange={(e) => setParentNo(e.target.value)}
//                 required
//               />
//             </div>
//             <button type="submit" className="btn btn-primary w-100">
//               Login
//             </button>
//           </form>
//           {error && <div className="alert alert-danger mt-3">{error}</div>}
//         </div>
//       </div>
//     </div>
//   );
// }
// export default LoginPage;
