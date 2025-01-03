import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchStudentMarks } from "../../Services/Parent/marksService";
import { Pie } from "react-chartjs-2";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ArcElement
);

const subjects = {
  1: "Telugu",
  2: "Hindi",
  3: "English",
  4: "Maths",
  5: "Science",
  6: "Social",
  7: "NS",
  8: "PS",
  9: "GK",
};

const testTypeLabels = {
  1: "Weekly Test",
  2: "FA (Formative)",
  3: "SA (Summative)",
};

const maxMarks = {
  1: 25,
  2: 75,
  3: 100,
};

const StudentMarks = () => {
  const { StudentID } = useParams();
  const [marks, setMarks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTest, setActiveTest] = useState("1");

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const data = await fetchStudentMarks(StudentID);
        setMarks([...data].reverse());
      } catch (err) {
        setError("Unable to fetch marks.");
      } finally {
        setLoading(false);
      }
    };
    fetchMarks();
  }, [StudentID]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  // Group marks by test type
  const groupedMarks = marks.reduce((acc, mark) => {
    const key = mark.TestTypeID;
    if (!acc[key]) acc[key] = [];
    acc[key].push(mark);
    return acc;
  }, {});

  // Calculate subject performance for pie chart
  const subjectTotals = {};
  marks.forEach((mark) => {
    const subjectName = subjects[mark.SubjectID] || "Unknown";
    if (!subjectTotals[subjectName]) {
      subjectTotals[subjectName] = { obtained: 0, max: 0 };
    }
    subjectTotals[subjectName].obtained += mark.MarksObtained;
    subjectTotals[subjectName].max += maxMarks[mark.TestTypeID] || 0;
  });

  const pieChartData = {
    labels: Object.keys(subjectTotals),
    datasets: [
      {
        data: Object.values(subjectTotals).map(({ obtained, max }) =>
          ((obtained / max) * 100).toFixed(1)
        ),
        backgroundColor: [
          "#4F46E5",
          "#06B6D4",
          "#8B5CF6",
          "#EC4899",
          "#F59E0B",
          "#10B981",
          "#EF4444",
          "#6366F1",
          "#84CC16",
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="app-container">

      <div className="content-wrapper">
        {/* Test Type Selection */}
        <div className="test-type-selector">
          {Object.entries(testTypeLabels).map(([id, label]) => (
            <button
              key={id}
              className={`test-type-btn ${activeTest === id ? "active" : ""}`}
              onClick={() => setActiveTest(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Marks Cards */}
        <div className="marks-container">
          {groupedMarks[activeTest]?.map((mark, index) => (
            <div key={index} className="mark-card">
              <div className="mark-card-header">
                <h4 className="subject-name">
                  <i className="bi bi-book me-2 text-primary"></i>
                  {subjects[mark.SubjectID]}
                </h4>
                <small className="test-date">
                  <i className="bi bi-calendar3 me-1"></i>
                  {mark.DateConducted}
                </small>
              </div>

              <div className="marks-display">
                <div className="marks-obtained">
                  <h3>{mark.MarksObtained}</h3>
                  <small>Obtained</small>
                </div>
                <div className="marks-divider">
                  <span>/</span>
                </div>
                <div className="marks-total">
                  <h3>{maxMarks[activeTest]}</h3>
                  <small>Total</small>
                </div>
              </div>

              <div className="marks-footer">
                <span
                  className={`percentage-badge ${
                    (mark.MarksObtained / maxMarks[activeTest]) * 100 >= 35
                      ? "success"
                      : "danger"
                  }`}
                >
                  {((mark.MarksObtained / maxMarks[activeTest]) * 100).toFixed(
                    0
                  )}
                  %
                </span>
                <span
                  className={`status-text ${
                    (mark.MarksObtained / maxMarks[activeTest]) * 100 >= 35
                      ? "success"
                      : "danger"
                  }`}
                >
                  <i
                    className={`bi bi-${
                      (mark.MarksObtained / maxMarks[activeTest]) * 100 >= 35
                        ? "emoji-smile"
                        : "emoji-frown"
                    } me-1`}
                  ></i>
                  {(mark.MarksObtained / maxMarks[activeTest]) * 100 >= 35
                    ? "Pass"
                    : "Need Improvement"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Overview */}
        <div className="performance-card">
          <h6 className="performance-title">
            <i className="bi bi-pie-chart-fill me-2"></i>
            Overall Performance
          </h6>
          <div className="chart-container">
            <Pie
              data={pieChartData}
              options={{
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: { boxWidth: 12, padding: 15 },
                  },
                },
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .app-container {
          min-height: 100vh;
          background-color: #f8f9fa;
          padding: 60px 0 70px;
        }

        .content-wrapper {
          padding: 16px;
          max-width: 600px;
          margin: 0 auto;
        }

        .test-type-selector {
          background: white;
          padding: 8px;
          border-radius: 20px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .test-type-btn {
          border: none;
          background: none;
          padding: 8px 16px;
          border-radius: 15px;
          font-size: 0.9rem;
          color: #666;
          transition: all 0.2s;
        }

        .test-type-btn.active {
          background: #007bff;
          color: white;
        }

        .marks-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mark-card {
          background: white;
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .mark-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .subject-name {
          margin: 0;
          font-size: 1.1rem;
          color: #333;
        }

        .test-date {
          color: #666;
        }

        .marks-display {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          margin-bottom: 12px;
        }

        .marks-obtained,
        .marks-total {
          text-align: center;
        }

        .marks-obtained h3,
        .marks-total h3 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .marks-obtained h3 {
          color: #007bff;
        }

        .marks-divider {
          color: #ccc;
          font-size: 1.5rem;
        }

        .marks-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .percentage-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .percentage-badge.success {
          background: #d4edda;
          color: #155724;
        }

        .percentage-badge.danger {
          background: #f8d7da;
          color: #721c24;
        }

        .status-text {
          font-size: 0.9rem;
        }

        .status-text.success {
          color: #155724;
        }

        .status-text.danger {
          color: #721c24;
        }

        .performance-card {
          background: white;
          border-radius: 12px;
          padding: 16px;
          margin-top: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .performance-title {
          color: #007bff;
          margin-bottom: 16px;
        }

        .chart-container {
          height: 250px;
        }

        .loading-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .error-container {
          padding: 16px;
          max-width: 600px;
          margin: 20px auto;
        }

        @media (max-width: 480px) {
          .content-wrapper {
            padding: 12px;
          }

          .test-type-btn {
            padding: 6px 12px;
            font-size: 0.8rem;
          }

          .marks-display {
            padding: 8px;
          }

          .marks-obtained h3,
          .marks-total h3 {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </div>
  );
};

export default StudentMarks;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { fetchStudentMarks } from "../../Services/Parent/marksService";

// function StudentMarks() {
//   const { StudentID } = useParams();
//   const [marks, setMarks] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMarks = async () => {
//       console.log("Fetching marks for StudentID:", StudentID);
//       if (!StudentID) {
//         setError("Invalid Student ID.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetchStudentMarks(StudentID);
//         setMarks(response)
//         console.log("Raw API Response:", response.data);

//         if (response.data && Array.isArray(response.data)) {
//           setMarks(response.data);
//         } else {
//           setError("Invalid data format received from server.");
//         }
//       } catch (err) {
//         console.error("Error fetching marks:", err);
//         setError("Unable to fetch the marks. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMarks();
//   }, [StudentID]);

//   // Group marks by TestTypeID
//   const groupedMarks = marks.reduce((acc, mark) => {
//     const key = mark.TestTypeID;
//     if (!acc[key]) acc[key] = [];
//     acc[key].push(mark);
//     return acc;
//   }, {});

//   if (loading) {
//     return (
//       <div className="container mt-5">
//         <div className="text-center">
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <p className="mt-2">Loading marks...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mt-5">
//         <div className="alert alert-danger" role="alert">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   if (marks.length === 0) {
//     return (
//       <div className="container mt-5">
//         <div className="alert alert-info" role="alert">
//           No marks available for this student.
//         </div>
//       </div>
//     );
//   }

//   const testTypeLabels = {
//     1: "Weekly Test Marks",
//     2: "Formative Assessment (FA) Marks",
//     3: "Summative Assessment (SA) Marks",
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Student Marks</h2>
//       {Object.entries(groupedMarks).map(([testType, testMarks]) => (
//         <div key={testType} className="mb-4">
//           <h4 className="text-primary">{testTypeLabels[testType]}</h4>
//           <div className="table-responsive">
//             <table className="table table-hover">
//               <thead>
//                 <tr>
//                   <th>Subject ID</th>
//                   <th>Marks Obtained</th>
//                   <th>Maximum Marks</th>
//                   <th>Date Conducted</th>
//                   <th>Percentage</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {testMarks.map((mark, index) => {
//                   const percentage = (mark.MarksObtained / mark.MaxMarks) * 100;
//                   const status = percentage >= 35 ? "Pass" : "Fail";

//                   return (
//                     <tr key={index}>
//                       <td>{mark.SubjectID}</td>
//                       <td>{mark.MarksObtained}</td>
//                       <td>{mark.MaxMarks}</td>
//                       <td>{mark.DateConducted}</td>
//                       <td>{percentage.toFixed(2)}%</td>
//                       <td>
//                         <span
//                           className={`badge ${
//                             status === "Pass" ? "bg-success" : "bg-danger"
//                           }`}
//                         >
//                           {status}
//                         </span>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default StudentMarks;
