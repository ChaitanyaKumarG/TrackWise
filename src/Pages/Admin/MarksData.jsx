import React, { useEffect, useState } from "react";
import postMarksService from "../../Services/Faculty/postingMarksServices";
import * as XLSX from "xlsx";

const MarksData = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [testTypes, setTestTypes] = useState([]);
  const [marks, setMarks] = useState([]);
  const [filteredMarks, setFilteredMarks] = useState([]);

  const [filters, setFilters] = useState({
    classId: "",
    subjectId: "",
    testTypeId: "",
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [classRes, subjectRes, testTypeRes] = await Promise.all([
          postMarksService.getClasses(),
          postMarksService.getSubjects(),
          postMarksService.getTestTypes(),
        ]);

        // Ensure we're setting arrays, with fallback to empty array if data is undefined
        setClasses(Array.isArray(classRes.data) ? classRes.data : []);
        setSubjects(Array.isArray(subjectRes.data) ? subjectRes.data : []);
        setTestTypes(Array.isArray(testTypeRes.data) ? testTypeRes.data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch marks when class filter changes
  useEffect(() => {
    const fetchMarks = async () => {
      if (!filters.classId) return;

      setLoading(true);
      try {
        const response = await postMarksService.getAllMarks(
          filters.classId
        );
        const marksData = Array.isArray(response.data) ? response.data : [];
        setMarks(marksData);
        setFilteredMarks(marksData);
      } catch (err) {
        console.error("Error fetching marks:", err);
        setError("Failed to fetch marks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMarks();
  }, [filters.classId]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Filter marks based on selected filters
  useEffect(() => {
    if (!Array.isArray(marks)) return;

    let filtered = [...marks];

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
  }, [filters, marks]);

  const downloadExcel = () => {
    if (!Array.isArray(filteredMarks) || filteredMarks.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(filteredMarks);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Marks");
    XLSX.writeFile(workbook, "StudentMarks.xlsx");
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
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container-fluid px-lg-5 min-vh-100 homepage-wrapper">
      <div className="card shadow-sm mt-5">
        <div className="card-header bg-primary text-white py-3">
          <h4 className="mb-0 text-center">
            <i className="bi bi-table me-2"></i>
            Student Marks Data
          </h4>
        </div>
        <div className="card-body p-4">
          <div className="row g-3 mb-4">
            <div className="col-md-3">
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
                {Array.isArray(classes) &&
                  classes.map((cls) => (
                    <option key={cls.ClassID} value={cls.ClassID}>
                      {cls.ClassStandard}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-md-3">
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
                {Array.isArray(subjects) &&
                  subjects.map((subject) => (
                    <option key={subject.SubjectID} value={subject.SubjectID}>
                      {subject.SubjectName}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-md-3">
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
                {Array.isArray(testTypes) &&
                  testTypes.map((test) => (
                    <option key={test.TestTypeID} value={test.TestTypeID}>
                      {test.TestName}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-md-3">
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

            <div className="col-md-3">
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

          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0">
              <thead className="table-light sticky-top">
                <tr>
                  <th className="text-center">#</th>
                  <th>Mark ID</th>
                  <th>Class</th>
                  <th>Student ID</th>
                  <th>Subject</th>
                  <th>Test Type</th>
                  <th>Marks Obtained</th>
                  <th>Date Conducted</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(filteredMarks) &&
                  filteredMarks.map((mark, index) => (
                    <tr key={mark.MarkID}>
                      <td className="text-center">{index + 1}</td>
                      <td>{mark.MarkID}</td>
                      <td>{mark.ClassID}</td>
                      <td>{mark.StudentID}</td>
                      <td>{mark.SubjectID}</td>
                      <td>{mark.TestTypeID}</td>
                      <td>{mark.MarksObtained}</td>
                      <td>
                        {new Date(mark.DateConducted).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <button
            className="btn btn-primary btn-lg mt-3"
            onClick={downloadExcel}
            disabled={
              !Array.isArray(filteredMarks) || filteredMarks.length === 0
            }
          >
            <i className="bi bi-download me-2"></i>
            Download Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarksData;
