import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function StudentMarks() {
  const { StudentID } = useParams();
  const [marks, setMarks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarks = async () => {
      console.log("Fetching marks for StudentID:", StudentID);
      if (!StudentID) {
        setError("Invalid Student ID.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:1321/studentmarks/student/${StudentID}`
        );
        console.log("Raw API Response:", response.data);

        if (response.data && Array.isArray(response.data)) {
          setMarks(response.data);
        } else {
          setError("Invalid data format received from server.");
        }
      } catch (err) {
        console.error("Error fetching marks:", err);
        setError("Unable to fetch the marks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMarks();
  }, [StudentID]);

  // Group marks by TestTypeID
  const groupedMarks = marks.reduce((acc, mark) => {
    const key = mark.TestTypeID;
    if (!acc[key]) acc[key] = [];
    acc[key].push(mark);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading marks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (marks.length === 0) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          No marks available for this student.
        </div>
      </div>
    );
  }

  const testTypeLabels = {
    1: "Weekly Test Marks",
    2: "Formative Assessment (FA) Marks",
    3: "Summative Assessment (SA) Marks",
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Student Marks</h2>
      {Object.entries(groupedMarks).map(([testType, testMarks]) => (
        <div key={testType} className="mb-4">
          <h4 className="text-primary">{testTypeLabels[testType]}</h4>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Subject ID</th>
                  <th>Marks Obtained</th>
                  <th>Maximum Marks</th>
                  <th>Date Conducted</th>
                  <th>Percentage</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {testMarks.map((mark, index) => {
                  const percentage = (mark.MarksObtained / mark.MaxMarks) * 100;
                  const status = percentage >= 35 ? "Pass" : "Fail";

                  return (
                    <tr key={index}>
                      <td>{mark.SubjectID}</td>
                      <td>{mark.MarksObtained}</td>
                      <td>{mark.MaxMarks}</td>
                      <td>{mark.DateConducted}</td>
                      <td>{percentage.toFixed(2)}%</td>
                      <td>
                        <span
                          className={`badge ${
                            status === "Pass" ? "bg-success" : "bg-danger"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StudentMarks;
