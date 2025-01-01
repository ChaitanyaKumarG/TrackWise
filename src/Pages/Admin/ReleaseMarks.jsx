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
import axios from "axios"; // For making API requests

const AdminPage = () => {
  const [testTypeID, setTestTypeID] = useState(""); // State for selected Test Type
  const [message, setMessage] = useState(""); // State for success/error messages

  // Test Type Options
  const testTypes = [
    { id: 1, name: "Weekly Test" },
    { id: 2, name: "FA" },
    { id: 3, name: "SA" },
  ];

  // Handle Test Type Selection
  const handleTestTypeChange = (e) => {
    setTestTypeID(e.target.value);
  };

  // Handle Release Marks
  const handleReleaseMarks = () => {
    if (!testTypeID) {
      setMessage("Please select a test type.");
      return;
    }

    // API call to approve marks by Test Type
    axios
      .post("http://127.0.0.1:1321/studentmarks/approve", { testTypeID }) // Assuming the backend route
      .then((response) => {
        setMessage("Marks released successfully for the selected test type!");
      })
      .catch((error) => {
        setMessage("Error releasing marks. Please try again.");
        console.error(error);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin: Release Marks</h1>
      <div className="card p-4">
        <div className="form-group">
          <label htmlFor="testType" className="form-label">
            Select Test Type:
          </label>
          <select
            className="form-select"
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

        <button className="btn btn-primary mt-3" onClick={handleReleaseMarks}>
          Release Marks
        </button>

        {message && (
          <div
            className={`alert mt-3 ${
              message.includes("successfully")
                ? "alert-success"
                : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}
      </div>
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
