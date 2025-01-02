// import React, { useState, useEffect } from "react";
// import approveMarksService from "../../Services/Admin/approveMarksService";
// import postMarksService from "../../Services/Faculty/postingMarksServices";

// const ReleaseMarks = () => {
//   const [testTypeID, setTestTypeID] = useState(""); // State for selected Test Type
//   const [testTypes, setTestTypes] = useState([]); // State to store test types from API
//   const [message, setMessage] = useState(""); // State for success/error messages

//   // Fetch Test Types from API
//   useEffect(() => {
//     const fetchTestTypes = async () => {
//       try {
//         const data = await postMarksService.getClasses();
//         console.log("API Response:", data);
//         setTestTypes(Array.isArray(data) ? data : []); 
//       } catch (error) {
//         console.error("Error fetching test types:", error);
//         setMessage("Failed to load test types. Please try again.");
//       }
//     };

//     fetchTestTypes();
//   }, []);

//   // Handle Test Type Selection
//   const handleTestTypeChange = (e) => {
//     setTestTypeID(e.target.value);
//   };

//   // Handle Release Marks
//   const handleReleaseMarks = async () => {
//     if (!testTypeID) {
//       setMessage("Please select a test type.");
//       return;
//     }

//     try {
//       await approveMarksService.releaseMarks(testTypeID);
//       setMessage("Marks released successfully for the selected test type!");
//     } catch (error) {
//       console.error("Error releasing marks:", error);
//       setMessage("Error releasing marks. Please try again.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-4">Admin: Release Marks</h1>
//       <div className="card p-4">
//         <div className="form-group">
//           <label htmlFor="testType" className="form-label">
//             Select Test Type:
//           </label>
//           <select
//             className="form-select"
//             id="testType"
//             value={testTypeID}
//             onChange={handleTestTypeChange}
//           >
//             <option value="">-- Select Test Type --</option>
//             {Array.isArray(testTypes) &&
//               testTypes.map((type) => (
//                 <option key={type.TestTypeID} value={type.TestTypeID}>
//                   {type.TestName}
//                 </option>
//               ))}
//           </select>
//         </div>

//         <button className="btn btn-primary mt-3" onClick={handleReleaseMarks}>
//           Release Marks
//         </button>

//         {message && (
//           <div
//             className={`alert mt-3 ${
//               message.includes("successfully")
//                 ? "alert-success"
//                 : "alert-danger"
//             }`}
//           >
//             {message}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ReleaseMarks;

// import React, { useState, useEffect } from "react";
// import approveMarksService from "../../Services/Admin/approveMarksService";
// import postMarksService from "../../Services/Faculty/postingMarksServices";

// const ReleaseMarks = () => {
//   const [testTypeID, setTestTypeID] = useState(""); // State for selected Test Type
//   const [testTypes, setTestTypes] = useState([]); // State to store test types from API
//   const [message, setMessage] = useState(""); // State for success/error messages

//   // Fetch Test Types from API
//   useEffect(() => {
//     const fetchTestTypes = async () => {
//       try {
//         const data = await postMarksService.getClasses();
//         setTestTypes(data);
//       } catch (error) {
//         console.error("Error fetching test types:", error);
//         setMessage("Failed to load test types. Please try again.");
//       }
//     };

//     fetchTestTypes();
//   }, []);

//   // Handle Test Type Selection
//   const handleTestTypeChange = (e) => {
//     setTestTypeID(e.target.value);
//   };

//   // Handle Release Marks
//   const handleReleaseMarks = async () => {
//     if (!testTypeID) {
//       setMessage("Please select a test type.");
//       return;
//     }

//     try {
//       await approveMarksService.releaseMarks(testTypeID);
//       setMessage("Marks released successfully for the selected test type!");
//     } catch (error) {
//       console.error("Error releasing marks:", error);
//       setMessage("Error releasing marks. Please try again.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-4">Admin: Release Marks</h1>
//       <div className="card p-4">
//         <div className="form-group">
//           <label htmlFor="testType" className="form-label">
//             Select Test Type:
//           </label>
//           <select
//             className="form-select"
//             id="testType"
//             value={testTypeID}
//             onChange={handleTestTypeChange}
//           >
//             <option value="">-- Select Test Type --</option>
//             {testTypes.map((type) => (
//               <option key={type.TestTypeID} value={type.TestTypeID}>
//                 {type.TestName} {/* Adjust key names based on API response */}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button className="btn btn-primary mt-3" onClick={handleReleaseMarks}>
//           Release Marks
//         </button>

//         {message && (
//           <div
//             className={`alert mt-3 ${
//               message.includes("successfully")
//                 ? "alert-success"
//                 : "alert-danger"
//             }`}
//           >
//             {message}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ReleaseMarks;
import React, { useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [testTypeID, setTestTypeID] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const testTypes = [
    { id: 1, name: "Weekly Test", icon: "bi-calendar-week" },
    { id: 2, name: "FA", icon: "bi-file-text" },
    { id: 3, name: "SA", icon: "bi-journal-check" },
  ];

  const handleTestTypeChange = (e) => {
    setTestTypeID(e.target.value);
    setMessage("");
  };

  const handleConfirmClick = () => {
    if (!testTypeID) {
      setMessage("Please select a test type.");
      return;
    }
    setShowConfirmModal(true);
  };

  const handleReleaseMarks = () => {
    setLoading(true);
    setShowConfirmModal(false);

    axios
      .post("http://127.0.0.1:1321/studentmarks/approve", { testTypeID })
      .then((response) => {
        setMessage("Marks released successfully! ✅");
        setTestTypeID("");
      })
      .catch((error) => {
        setMessage("Failed to release marks. Please try again. ❌");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const selectedTest = testTypes.find((t) => t.id === parseInt(testTypeID));

  return (
    <div className="min-vh-100 bg-light">
      <div className="container-fluid px-3 py-4">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-primary text-white border-0">
            <h1 className="h4 mb-0 py-2 text-center">
              <i className="bi bi-unlock-fill me-2"></i>
              Release Marks
            </h1>
          </div>

          <div className="card-body p-4">
            <div className="form-group mb-4">
              <label htmlFor="testType" className="form-label fw-bold mb-3">
                <i className="bi bi-list-check me-2"></i>
                Select Test Type
              </label>
              <select
                className="form-select form-select-lg shadow-sm"
                id="testType"
                value={testTypeID}
                onChange={handleTestTypeChange}
              >
                <option value="">-- Select Test Type --</option>
                {testTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-grid gap-2">
              <button
                className="btn btn-primary btn-lg"
                onClick={handleConfirmClick}
                disabled={loading || !testTypeID}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Releasing...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Release Marks
                  </>
                )}
              </button>
            </div>

            {message && (
              <div
                className={`alert ${
                  message.includes("successfully")
                    ? "alert-success"
                    : "alert-danger"
                } mt-4 animate-alert`}
                role="alert"
              >
                <i
                  className={`bi ${
                    message.includes("successfully")
                      ? "bi-check-circle"
                      : "bi-exclamation-circle"
                  } me-2`}
                ></i>
                {message}
              </div>
            )}
          </div>
        </div>

        {/* Fixed Confirmation Modal */}
        {showConfirmModal && (
          <>
            <div className="confirmation-modal">
              <div className="confirmation-content">
                <div className="text-center mb-4">
                  <i className="bi bi-exclamation-circle text-warning display-4"></i>
                  <h5 className="mt-3">Confirm Release</h5>
                  <p className="mb-4">
                    Are you sure you want to release marks for{" "}
                    <strong>{selectedTest?.name}</strong>?
                  </p>
                </div>
                <div className="d-flex gap-2 justify-content-center">
                  <button
                    className="btn btn-outline-secondary px-4"
                    onClick={() => setShowConfirmModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary px-4"
                    onClick={handleReleaseMarks}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
            <div
              className="modal-backdrop"
              onClick={() => setShowConfirmModal(false)}
            ></div>
          </>
        )}
      </div>

      <style jsx>{`
        /* Card Styles */
        .card {
          border-radius: 15px;
          transition: all 0.3s ease;
        }

        .card-header {
          border-radius: 15px 15px 0 0 !important;
        }

        /* Form Control Styles */
        .form-select {
          border: 1px solid #dee2e6;
          border-radius: 10px;
          padding: 0.75rem 1rem;
          transition: all 0.2s ease;
        }

        .form-select:focus {
          border-color: #80bdff;
          box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.15);
        }

        /* Button Styles */
        .btn {
          border-radius: 10px;
          padding: 0.75rem 1.5rem;
          transition: all 0.2s ease;
        }

        .btn:active {
          transform: scale(0.98);
        }

        /* Alert Animation */
        .animate-alert {
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Confirmation Modal Styles */
        .confirmation-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 1.5rem;
          border-radius: 15px;
          z-index: 1060;
          width: 90%;
          max-width: 320px;
          animation: modalIn 0.3s ease-out;
        }

        .confirmation-content {
          width: 100%;
        }

        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1050;
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translate(-50%, -40%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Mobile Optimizations */
        @media (max-width: 576px) {
          .container-fluid {
            padding: 1rem;
          }

          .card-body {
            padding: 1.25rem;
          }

          .btn {
            padding: 0.875rem 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminPage;
// // import React, { useState, useEffect } from "react";
// // import axios from "axios"; // For making API requests

// // const ReleaseMarks = () => {
// //   const [testTypeID, setTestTypeID] = useState(""); // State for selected Test Type
// //   const [testTypes, setTestTypes] = useState([]); // State to store test types from API
// //   const [message, setMessage] = useState(""); // State for success/error messages

// //   // Fetch Test Types from API
// //   useEffect(() => {
// //     axios
// //       .get("http://127.0.0.1:1321/testtype")
// //       .then((response) => {
// //         setTestTypes(response.data); // Set test types from API response
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching test types:", error);
// //         setMessage("Failed to load test types. Please try again.");
// //       });
// //   }, []);

// //   // Handle Test Type Selection
// //   const handleTestTypeChange = (e) => {
// //     setTestTypeID(e.target.value);
// //   };

// //   // Handle Release Marks
// //   const handleReleaseMarks = () => {
// //     if (!testTypeID) {
// //       setMessage("Please select a test type.");
// //       return;
// //     }

// //     // API call to approve marks by Test Type
// //     axios
// //       .post("http://127.0.0.1:1321/studentmarks/approve", { testTypeID }) // Assuming the backend route
// //       .then((response) => {
// //         setMessage("Marks released successfully for the selected test type!");
// //       })
// //       .catch((error) => {
// //         setMessage("Error releasing marks. Please try again.");
// //         console.error(error);
// //       });
// //   };

// //   return (
// //     <div className="container mt-5">
// //       <h1 className="text-center mb-4">Admin: Release Marks</h1>
// //       <div className="card p-4">
// //         <div className="form-group">
// //           <label htmlFor="testType" className="form-label">
// //             Select Test Type:
// //           </label>
// //           <select
// //             className="form-select"
// //             id="testType"
// //             value={testTypeID}
// //             onChange={handleTestTypeChange}
// //           >
// //             <option value="">-- Select Test Type --</option>
// //             {testTypes.map((type) => (
// //               <option key={type.TestTypeID} value={type.TestTypeID}>
// //                 {type.TestName} {/* Adjust key names based on API response */}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <button className="btn btn-primary mt-3" onClick={handleReleaseMarks}>
// //           Release Marks
// //         </button>

// //         {message && (
// //           <div
// //             className={`alert mt-3 ${
// //               message.includes("successfully")
// //                 ? "alert-success"
// //                 : "alert-danger"
// //             }`}
// //           >
// //             {message}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ReleaseMarks;
