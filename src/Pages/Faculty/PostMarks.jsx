import React, { useState, useEffect } from "react";
import axios from "axios";

const PostMarks = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [testTypes, setTestTypes] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTestType, setSelectedTestType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    // Fetch classes, subjects, and test types
    axios
      .get("http://127.0.0.1:1321/class")
      .then((res) => setClasses(res.data));
    axios
      .get("http://127.0.0.1:1321/subject")
      .then((res) => setSubjects(res.data));
    axios
      .get("http://127.0.0.1:1321/testtype")
      .then((res) => setTestTypes(res.data));
  }, []);

  const fetchStudents = () => {
    if (selectedClass) {
      axios
        .get(`http://127.0.0.1:1321/student/class/${selectedClass}`)
        .then((res) => {
          setStudents(res.data);
          setMarks(
            res.data.map((student) => ({
              StudentID: student.StudentID,
              MarksObtained: "",
              Absent: false, // Default to not absent
            }))
          );
        });
    }
  };

  const handleMarkChange = (studentID, value) => {
    setMarks((prev) =>
      prev.map((mark) =>
        mark.StudentID === studentID ? { ...mark, MarksObtained: value } : mark
      )
    );
  };

  const handleAbsentChange = (studentID, isAbsent) => {
    setMarks((prev) =>
      prev.map((mark) =>
        mark.StudentID === studentID
          ? { ...mark, Absent: isAbsent, MarksObtained: isAbsent ? "AB" : "" }
          : mark
      )
    );
  };

  const handleSubmit = () => {
    if (
      !selectedClass ||
      !selectedSubject ||
      !selectedTestType ||
      !selectedDate
    ) {
      alert(
        "Please fill all required fields (Class, Subject, Test Type, and Date)."
      );
      return;
    }

    const invalidMarks = marks.some(
      (mark) =>
        !mark.Absent &&
        (mark.MarksObtained === "" ||
          isNaN(mark.MarksObtained) ||
          mark.MarksObtained < 0) &&
        !mark.Absent
    );

    if (invalidMarks) {
      alert("Please enter valid marks or mark students as absent.");
      return;
    }

    const data = marks.map((mark) => ({
      StudentID: mark.StudentID,
      MarksObtained: mark.Absent ? "AB" : mark.MarksObtained,
      ClassID: selectedClass,
      SubjectID: selectedSubject,
      TestTypeID: selectedTestType,
      DateConducted: selectedDate,
    }));

    axios
      .post("http://127.0.0.1:1321/studentmarks", data)
      .then(() => alert("Marks submitted successfully"))
      .catch(() => alert("Error submitting marks"));
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Post Marks</h1>

      <div className="row g-3 mb-3">
        <div className="col-md-3">
          <label className="form-label">Class:</label>
          <select
            className="form-select"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            onBlur={fetchStudents}
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls.ClassID} value={cls.ClassID}>
                {cls.ClassStandard}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Subject:</label>
          <select
            className="form-select"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            {subjects.map((sub) => (
              <option key={sub.SubjectID} value={sub.SubjectID}>
                {sub.SubjectName}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Test Type:</label>
          <select
            className="form-select"
            value={selectedTestType}
            onChange={(e) => setSelectedTestType(e.target.value)}
          >
            <option value="">Select Test Type</option>
            {testTypes.map((tt) => (
              <option key={tt.TestTypeID} value={tt.TestTypeID}>
                {tt.TestName}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Date:</label>
          <input
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {students.length > 0 && (
        <div>
          <h3 className="text-center my-4">Enter Marks</h3>
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Student Name</th>
                <th>Marks</th>
                <th>Absent</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.StudentID}>
                  <td>{index + 1}</td>
                  <td>{student.StudentName}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Marks"
                      value={
                        marks.find(
                          (mark) => mark.StudentID === student.StudentID
                        )?.MarksObtained || ""
                      }
                      onChange={(e) =>
                        handleMarkChange(student.StudentID, e.target.value)
                      }
                      disabled={
                        marks.find(
                          (mark) => mark.StudentID === student.StudentID
                        )?.Absent
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={
                        marks.find(
                          (mark) => mark.StudentID === student.StudentID
                        )?.Absent || false
                      }
                      onChange={(e) =>
                        handleAbsentChange(student.StudentID, e.target.checked)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        className="btn btn-primary w-100"
        onClick={handleSubmit}
        disabled={
          !selectedClass ||
          !selectedSubject ||
          !selectedTestType ||
          !selectedDate
        }
      >
        <i className="bi bi-send"></i> Submit Marks
      </button>
    </div>
  );
};

export default PostMarks;
