import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import adminServices from "../../Services/Admin/adminService";

const ALoginPage = () => {
  const [penNo, setPenNo] = useState("");
  const [parentNo, setParentNo] = useState("");
  const [admin, setAdmin] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const adminData = await adminServices.getAll();
        setAdmin(adminData);
      } catch (err) {
        console.error("Error fetching admin data:", err);
        setError("Failed to fetch admin data. Please try again later.");
      }
    };

    fetchAdminData();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const matchedAdmin = admin.find(
      (admin) => admin.AdminKey === penNo && admin.Password === parentNo
    );

    setTimeout(() => {
      setIsLoading(false);
      if (matchedAdmin) {
        console.log("Admin matched:", matchedAdmin);
        navigate(`/adminhomepage`);
      } else {
        setError("Invalid Admin Key or Password.");
      }
    }, 800);
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-light"
      style={{ height: "100vh" }}
    >
      <div className="container px-4">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            {/* Logo/Icon Section */}
            <div className="text-center mb-4">
              <i
                className="bi bi-shield-lock-fill text-primary"
                style={{ fontSize: "3rem" }}
              ></i>
              <h4 className="mt-3 mb-4 fw-bold">Admin Portal</h4>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-person-badge-fill"></i>
                  </span>
                  <input
                    type="text"
                    id="penNo"
                    className="form-control border-start-0 ps-0"
                    placeholder="Enter Admin Key"
                    value={penNo}
                    onChange={(e) => setPenNo(e.target.value)}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-lock-fill"></i>
                  </span>
                  <input
                    type="password"
                    id="parentNo"
                    className="form-control border-start-0 ps-0"
                    placeholder="Enter Password"
                    value={parentNo}
                    onChange={(e) => setParentNo(e.target.value)}
                    autoComplete="off"
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
                    Authenticating...
                  </>
                ) : (
                  <>
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Login as Administrator
                  </>
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
                <i className="bi bi-info-circle me-1"></i>
                For security reasons, please contact IT support for password
                reset
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ALoginPage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function ALoginPage() {
//   const [penNo, setPenNo] = useState("");
//   const [parentNo, setParentNo] = useState("");
//   const [admin, setAdmin] = useState([]);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch all students
//     axios
//       .get("http://127.0.0.1:1321/admin")
//       .then((response) => setAdmin(response.data))
//       .catch((err) => console.error("Error fetching students:", err));
//   }, []);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setError("");

//     const matchedfaculty = admin.find(
//       (admin) => admin.AdminKey === penNo && admin.Password === parentNo
//     );

//     if (matchedfaculty) {
//       console.log(admin);
//       navigate(`/adminhomepage`);
//     } else {
//       setError("Invalid Pen Number or Parent Phone Number.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card mx-auto" style={{ maxWidth: "400px" }}>
//         <div className="card-body">
//           <h2 className="card-title text-center">Admin Login</h2>
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
// export default ALoginPage;
