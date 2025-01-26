import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchStudentMarks } from "../../Services/Parent/marksService";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
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
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container p-3">
        <div
          className="alert alert-danger d-flex align-items-center"
          role="alert"
        >
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  const groupedMarks = marks.reduce((acc, mark) => {
    const key = mark.TestTypeID;
    if (!acc[key]) acc[key] = [];
    acc[key].push(mark);
    return acc;
  }, {});

  const calculateGrade = (percentage) => {
    if (percentage >= 90) return { grade: "A+", color: "success" };
    if (percentage >= 80) return { grade: "A", color: "success" };
    if (percentage >= 70) return { grade: "B+", color: "primary" };
    if (percentage >= 60) return { grade: "B", color: "primary" };
    if (percentage >= 50) return { grade: "C", color: "warning" };
    if (percentage >= 35) return { grade: "D", color: "warning" };
    return { grade: "F", color: "danger" };
  };

  const prepareSubjectPerformance = () => {
    const subjectTotals = {};
    marks.forEach((mark) => {
      const subjectName = subjects[mark.SubjectID];
      if (!subjectTotals[subjectName]) {
        subjectTotals[subjectName] = { obtained: 0, max: 0 };
      }
      subjectTotals[subjectName].obtained += mark.MarksObtained;
      subjectTotals[subjectName].max += maxMarks[mark.TestTypeID];
    });

    return {
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
  };

  const prepareSubjectTrends = () => {
    const activeMarks = groupedMarks[activeTest] || [];
    return {
      labels: activeMarks.map((mark) => subjects[mark.SubjectID]),
      datasets: [
        {
          label: "Performance %",
          data: activeMarks.map((mark) =>
            ((mark.MarksObtained / maxMarks[activeTest]) * 100).toFixed(1)
          ),
          backgroundColor: "#4F46E5",
          borderRadius: 8,
        },
      ],
    };
  };

  return (
    <div className="container-fluid px-0 bg-light min-vh-100 homepage-wrapper mt-4 mb-3">
      {/* Test Type Pills */}
      <div className="px-3 mb-3">
        <div className="nav nav-pills nav-fill">
          {Object.entries(testTypeLabels).map(([id, label]) => (
            <button
              key={id}
              className={`nav-link ${activeTest === id ? "active" : ""}`}
              onClick={() => setActiveTest(id)}
            >
              <i className="bi bi-pencil-fill me-1"></i>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Marks Table */}
      <div className="px-3 mb-3">
        <div className="card shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Subject</th>
                  <th className="text-center">Marks</th>
                  <th className="text-center">Grade</th>
                </tr>
              </thead>
              <tbody>
                {groupedMarks[activeTest]?.map((mark, index) => {
                  const percentage =
                    (mark.MarksObtained / maxMarks[activeTest]) * 100;
                  const { grade, color } = calculateGrade(percentage);
                  return (
                    <tr key={index}>
                      <td>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-book-fill text-primary me-2"></i>
                          <div>
                            <div className="fw-medium">
                              {subjects[mark.SubjectID]}
                            </div>
                            <small className="text-muted">
                              {new Date(
                                mark.DateConducted
                              ).toLocaleDateString()}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="fw-medium">
                          {mark.MarksObtained}/{maxMarks[activeTest]}
                        </div>
                        <small className="text-muted">
                          {percentage.toFixed(1)}%
                        </small>
                      </td>
                      <td className="text-center">
                        <span className={`badge bg-${color} rounded-pill px-3`}>
                          {grade}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Charts and Performance Sections */}
      <div className="row g-3 px-3">
        {/* Overall Performance Pie Chart */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h6 className="card-title d-flex align-items-center mb-3">
                <i className="bi bi-pie-chart-fill text-primary me-2"></i>
                Overall Performance
              </h6>
              <div style={{ height: "250px" }}>
                <Pie
                  data={prepareSubjectPerformance()}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: {
                          boxWidth: 12,
                          padding: 15,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h6 className="card-title d-flex align-items-center">
                <i className="bi bi-graph-up text-primary me-2"></i>
                Performance Summary
              </h6>
              <div className="row g-3 mt-2">
                {groupedMarks[activeTest]?.length > 0 && (
                  <>
                    <div className="col-6">
                      <div className="border rounded p-3 text-center">
                        <div className="text-muted small">Average Score</div>
                        <div className="h4 mb-0">
                          {(
                            groupedMarks[activeTest].reduce(
                              (acc, curr) =>
                                acc +
                                (curr.MarksObtained / maxMarks[activeTest]) *
                                  100,
                              0
                            ) / groupedMarks[activeTest].length
                          ).toFixed(1)}
                          %
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="border rounded p-3 text-center">
                        <div className="text-muted small">Highest Score</div>
                        <div className="h4 mb-0">
                          {Math.max(
                            ...groupedMarks[activeTest].map(
                              (mark) =>
                                (mark.MarksObtained / maxMarks[activeTest]) *
                                100
                            )
                          ).toFixed(1)}
                          %
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Bar Chart */}
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-title d-flex align-items-center mb-3">
                <i className="bi bi-graph-up text-primary me-2"></i>
                Subject Performance
              </h6>
              <div style={{ height: "300px" }}>
                <Bar
                  data={prepareSubjectTrends()}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                          callback: (value) => `${value}%`,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentMarks;
