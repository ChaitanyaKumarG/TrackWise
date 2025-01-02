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
      <div className="position-absolute top-50 start-50 translate-middle">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mx-3 mt-3" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {error}
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
    <div className="container-fluid px-0">
      {/* Header */}
      {/* <div className=" start-0 w-100 bg-dark text-white p-3" 
           style={{ zIndex: 1030 }}>
        <h5 className="mb-0 text-start">
          <i className="bi bi-card-checklist me-2"></i>
          Marks Report
        </h5>
      </div> */}

      {/* Main Content */}
      <div className="mt-3 " >
        {/* Test Type Selection */}
        <div className="d-flex justify-content-around mb-4 bg-light p-2 rounded-pill">
          {Object.entries(testTypeLabels).map(([id, label]) => (
            <button
              key={id}
              className={`btn btn-sm ${activeTest === id ? 'btn-primary' : 'btn-light'} rounded px-3`}
              onClick={() => setActiveTest(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Marks Cards */}
        {groupedMarks[activeTest]?.map((mark, index) => (
          <div key={index} className="card shadow-sm border border-dark border-1 mb-3 p-0">
            <div className="card-body">
              {/* Subject and Date */}
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="mb-0">
                  <i className="bi bi-book me-2 text-primary"></i>
                  {subjects[mark.SubjectID]}
                </h4>
                <small className="">
                  <i className="bi bi-calendar3 me-1"></i>
                  {mark.DateConducted}
                </small>
              </div>

              {/* Marks Display */}
              <div className="bg-light rounded text-center">
                <div className="row align-items-center">
                  <div className="col">
                    <h3 className="mb-0 text-primary">{mark.MarksObtained}</h3>
                    <small className="text-muted">Marks Obtained</small>
                  </div>
                  <div className="col-auto">
                    <h4 className="mb-0 text-muted">out of</h4>
                  </div>
                  <div className="col">
                    <h3 className="mb-0">{maxMarks[activeTest]}</h3>
                    <small className="text-muted">Maximum Marks</small>
                  </div>
                </div>
              </div>

              {/* Percentage and Status */}
              <div className="d-flex justify-content-between align-items-center mt-1 mb-0">
                <div>
                  <span className={`badge ${
                    (mark.MarksObtained / maxMarks[activeTest]) * 100 >= 35 
                      ? 'bg-success' 
                      : 'bg-danger'
                  } rounded`}>
                    {((mark.MarksObtained / maxMarks[activeTest]) * 100).toFixed(0)}%
                  </span>
                </div>
                <small className={
                  (mark.MarksObtained / maxMarks[activeTest]) * 100 >= 35 
                    ? 'text-success' 
                    : 'text-danger'
                }>
                  <i className={`bi bi-${
                    (mark.MarksObtained / maxMarks[activeTest]) * 100 >= 35 
                      ? 'emoji-smile' 
                      : 'emoji-frown'
                  } me-1`}></i>
                  {(mark.MarksObtained / maxMarks[activeTest]) * 100 >= 35 ? 'Pass' : 'Need Improvement'}
                </small>
              </div>
            </div>
          </div>
        ))}

        {/* Performance Overview */}
        <div className="card shadow-sm mt-4">
          <div className="card-body">
            <h6 className="text-primary mb-3">
              <i className="bi bi-pie-chart-fill me-2"></i>
              Overall Performance
            </h6>
            <div style={{ height: "250px" }}>
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
      </div>
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
