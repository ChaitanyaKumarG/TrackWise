import React, { useEffect, useRef, useState } from "react";
import postMarksService from "../../Services/Faculty/postingMarksServices";
import * as XLSX from "xlsx";
import { fetchStudentDetailsbyID } from "../../Services/Parent/studentService";

const MarksGeneration = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [testTypes, setTestTypes] = useState([]);
  const [marks, setMarks] = useState([]);
  const [filteredMarks, setFilteredMarks] = useState([]);
  const [studentDetails, setStudentDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rankings, setRankings] = useState({
    testWise: {},
    classWise: {},
    overall: {},
  });

  const tableRef = useRef(null);

  const handlePrint = () => {
    const printContents = tableRef.current.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
  };

  const [filters, setFilters] = useState({
    classId: "",
    subjectId: "",
    testTypeId: "",
    startDate: "",
    endDate: "",
  });

  // Calculate rankings for students
  const calculateRankings = (marksData) => {
    // Helper function to calculate rank (handling ties)
    const assignRanks = (scores) => {
      const sorted = [...scores].sort((a, b) => b.score - a.score);
      let rank = 1;
      const rankings = {};

      for (let i = 0; i < sorted.length; i++) {
        if (i > 0 && sorted[i].score < sorted[i - 1].score) {
          rank = i + 1;
        }
        rankings[sorted[i].studentId] = rank;
      }
      return rankings;
    };

    // Test-wise rankings
    const testWiseRanks = {};
    marksData.forEach((mark) => {
      if (mark.MarksObtained !== "AB") {
        const testKey = `${mark.TestTypeID}-${mark.SubjectID}-${mark.ClassID}`;
        if (!testWiseRanks[testKey]) {
          testWiseRanks[testKey] = [];
        }
        testWiseRanks[testKey].push({
          studentId: mark.StudentID,
          score: Number(mark.MarksObtained),
        });
      }
    });

    // Class-wise rankings
    const classWiseRanks = {};
    Object.entries(testWiseRanks).forEach(([testKey, scores]) => {
      const [testTypeId, , classId] = testKey.split("-");
      const key = `${testTypeId}-${classId}`;
      if (!classWiseRanks[key]) {
        classWiseRanks[key] = {};
      }

      scores.forEach(({ studentId, score }) => {
        if (!classWiseRanks[key][studentId]) {
          classWiseRanks[key][studentId] = 0;
        }
        classWiseRanks[key][studentId] += score;
      });
    });

    // Overall rankings
    const overallScores = {};
    marksData.forEach((mark) => {
      if (mark.MarksObtained !== "AB") {
        if (!overallScores[mark.StudentID]) {
          overallScores[mark.StudentID] = 0;
        }
        overallScores[mark.StudentID] += Number(mark.MarksObtained);
      }
    });

    // Convert scores to ranking format
    const testWiseRankings = {};
    Object.entries(testWiseRanks).forEach(([key, scores]) => {
      testWiseRankings[key] = assignRanks(scores);
    });

    const classWiseRankings = {};
    Object.entries(classWiseRanks).forEach(([key, scores]) => {
      const scoresArray = Object.entries(scores).map(([studentId, score]) => ({
        studentId,
        score,
      }));
      classWiseRankings[key] = assignRanks(scoresArray);
    });

    const overallRankings = assignRanks(
      Object.entries(overallScores).map(([studentId, score]) => ({
        studentId,
        score,
      }))
    );

    setRankings({
      testWise: testWiseRankings,
      classWise: classWiseRankings,
      overall: overallRankings,
    });
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [classRes, subjectRes, testTypeRes, marksRes] = await Promise.all(
          [
            postMarksService.getClasses(),
            postMarksService.getSubjects(),
            postMarksService.getTestTypes(),
            postMarksService.getAllMarks(),
          ]
        );

        setClasses(Array.isArray(classRes.data) ? classRes.data : []);
        setSubjects(Array.isArray(subjectRes.data) ? subjectRes.data : []);
        setTestTypes(Array.isArray(testTypeRes.data) ? testTypeRes.data : []);
        const marksData = Array.isArray(marksRes.data) ? marksRes.data : [];
        setMarks(marksData);
        setFilteredMarks(marksData);
        calculateRankings(marksData);

        const uniqueStudentIds = [
          ...new Set(marksData.map((mark) => mark.StudentID)),
        ];
        const studentDetailsMap = {};

        await Promise.all(
          uniqueStudentIds.map(async (studentId) => {
            try {
              const details = await fetchStudentDetailsbyID(studentId);
              studentDetailsMap[studentId] = details;
            } catch (err) {
              console.error(
                `Error fetching details for student ${studentId}:`,
                err
              );
              studentDetailsMap[studentId] = null;
            }
          })
        );

        setStudentDetails(studentDetailsMap);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!Array.isArray(marks)) return;

    let filtered = [...marks];

    if (filters.classId) {
      filtered = filtered.filter(
        (mark) => mark.ClassID === parseInt(filters.classId)
      );
    }
    if (filters.subjectId) {
      filtered = filtered.filter(
        (mark) => mark.SubjectID === parseInt(filters.subjectId)
      );
    }
    if (filters.testTypeId) {
      filtered = filtered.filter(
        (mark) => mark.TestTypeID === parseInt(filters.testTypeId)
      );
    }
    if (filters.startDate) {
      filtered = filtered.filter(
        (mark) => new Date(mark.DateConducted) >= new Date(filters.startDate)
      );
    }
    if (filters.endDate) {
      filtered = filtered.filter(
        (mark) => new Date(mark.DateConducted) <= new Date(filters.endDate)
      );
    }

    setFilteredMarks(filtered);
    calculateRankings(filtered);
  }, [filters, marks]);

  const getClassName = (classId) => {
    const classObj = classes.find((c) => c.ClassID === classId);
    return classObj ? classObj.ClassStandard : "";
  };

  const getSubjectName = (subjectId) => {
    const subjectObj = subjects.find((s) => s.SubjectID === subjectId);
    return subjectObj ? subjectObj.SubjectName : "";
  };

  const getTestTypeName = (testTypeId) => {
    const testTypeObj = testTypes.find((t) => t.TestTypeID === testTypeId);
    return testTypeObj ? testTypeObj.TestName : "";
  };

  const getStudentName = (studentId) => {
    return studentDetails[studentId]?.StudentName || "Loading...";
  };

  const getPenNo = (studentId) => {
    return studentDetails[studentId]?.PENNumber || "N/A";
  };

  const getRank = (mark) => {
    if (mark.MarksObtained === "AB")
      return { testRank: "N/A", classRank: "N/A", overallRank: "N/A" };

    const testKey = `${mark.TestTypeID}-${mark.SubjectID}-${mark.ClassID}`;
    const classKey = `${mark.TestTypeID}-${mark.ClassID}`;

    return {
      testRank: rankings.testWise[testKey]?.[mark.StudentID] || "N/A",
      classRank: rankings.classWise[classKey]?.[mark.StudentID] || "N/A",
      overallRank: rankings.overall[mark.StudentID] || "N/A",
    };
  };

  const downloadExcel = () => {
    if (!Array.isArray(filteredMarks) || filteredMarks.length === 0) return;

    const excelData = filteredMarks.map((mark) => {
      const ranks = getRank(mark);
      return {
        Class: getClassName(mark.ClassID),
        Subject: getSubjectName(mark.SubjectID),
        "Test Type": getTestTypeName(mark.TestTypeID),
        "Student Name": getStudentName(mark.StudentID),
        "PEN Number": getPenNo(mark.StudentID),
        "Marks Obtained": mark.MarksObtained,
        "Test Rank": ranks.testRank,
        "Class Rank": ranks.classRank,
        "Overall Rank": ranks.overallRank,
        "Date Conducted": new Date(mark.DateConducted).toLocaleDateString(),
        Status: mark.MarksObtained === "AB" ? "Absent" : "Present",
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Marks");
    XLSX.writeFile(
      workbook,
      `StudentMarks_${new Date().toLocaleDateString()}.xlsx`
    );
  };

  if (loading) {
    return (
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid px-lg-5 mt-4">
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-lg-5 min-vh-100 homepage-wrapper">
      <div className="card shadow-sm mt-5">
        <div className="card-header bg-primary text-white py-3">
          <h4 className="mb-0 text-center">
            <i className="bi bi-table me-2"></i>
            Student Marks Data with Rankings
          </h4>
        </div>
        <div className="card-body p-4">
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <label className="form-label">
                <i className="bi bi-mortarboard me-2"></i>Class
              </label>
              <select
                className="form-select form-select-lg"
                name="classId"
                value={filters.classId}
                onChange={handleFilterChange}
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls.ClassID} value={cls.ClassID}>
                    {cls.ClassStandard}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">
                <i className="bi bi-book me-2"></i>Subject
              </label>
              <select
                className="form-select form-select-lg"
                name="subjectId"
                value={filters.subjectId}
                onChange={handleFilterChange}
              >
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject.SubjectID} value={subject.SubjectID}>
                    {subject.SubjectName}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">
                <i className="bi bi-list-check me-2"></i>Test Type
              </label>
              <select
                className="form-select form-select-lg"
                name="testTypeId"
                value={filters.testTypeId}
                onChange={handleFilterChange}
              >
                <option value="">Select Test Type</option>
                {testTypes.map((test) => (
                  <option key={test.TestTypeID} value={test.TestTypeID}>
                    {test.TestName}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">
                <i className="bi bi-calendar me-2"></i>Start Date
              </label>
              <input
                type="date"
                className="form-control form-control-lg"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                <i className="bi bi-calendar me-2"></i>End Date
              </label>
              <input
                type="date"
                className="form-control form-control-lg"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
              />
            </div>
          </div>

          <div className="table-responsive" ref={tableRef}>
            <table className="table table-hover table-striped mb-0">
              <thead className="table-light sticky-top">
                <tr>
                  <th className="text-center">#</th>
                  <th>Student Name</th>
                  <th>PEN No.</th>
                  <th>Class</th>
                  <th>Subject</th>
                  <th>Test Type</th>
                  <th className="text-center">Marks</th>
                  <th className="text-center">Test Rank</th>
                  <th className="text-center">Class Rank</th>
                  <th className="text-center">Overall Rank</th>
                  <th>Status</th>
                  <th>Date Conducted</th>
                </tr>
              </thead>
              <tbody>
                {filteredMarks.map((mark, index) => {
                  const ranks = getRank(mark);
                  return (
                    <tr key={mark.MarkID}>
                      <td className="text-center">{index + 1}</td>
                      <td>{getStudentName(mark.StudentID)}</td>
                      <td>{getPenNo(mark.StudentID)}</td>
                      <td>{getClassName(mark.ClassID)}</td>
                      <td>{getSubjectName(mark.SubjectID)}</td>
                      <td>{getTestTypeName(mark.TestTypeID)}</td>
                      <td className="text-center">
                        <span
                          className={`badge ${
                            mark.MarksObtained === "AB"
                              ? "bg-warning"
                              : "bg-primary"
                          }`}
                        >
                          {mark.MarksObtained}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-info">{ranks.testRank}</span>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-success">
                          {ranks.classRank}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-dark">
                          {ranks.overallRank}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            mark.MarksObtained === "AB"
                              ? "bg-warning"
                              : "bg-success"
                          }`}
                        >
                          {mark.MarksObtained === "AB" ? "Absent" : "Present"}
                        </span>
                      </td>
                      <td>
                        {new Date(mark.DateConducted).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <button
              className="btn btn-primary btn-lg m-1"
              onClick={downloadExcel}
              disabled={filteredMarks.length === 0}
            >
              <i className="bi bi-download me-2"></i>
              Download Excel
            </button>

            <button
              className="btn btn-success btn-lg m-1"
              onClick={handlePrint}
              disabled={filteredMarks.length === 0}
            >
              <i className="bi bi-printer me-2"></i>
              Print
            </button>

            <small className="text-muted ms-3">
              {filteredMarks.length} records found
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarksGeneration;