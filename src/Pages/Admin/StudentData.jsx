import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import postMarksService from "../../Services/Faculty/postingMarksServices";


function StudentData() {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await postMarksService.getClasses();
        setClasses(response.data);
      } catch (err) {
        console.error("Failed to fetch classes.");
      }
    };
    fetchClasses();
  }, []);

  const fetchStudents = async (classId) => {
    try {
      const response = await postMarksService.getStudentsByClass(classId)
      setStudents(response.data);
    } catch (err) {
      console.error("Failed to fetch students.");
    }
  };

  const handleClassChange = (event) => {
    const classId = event.target.value;
    setSelectedClass(classId);
    if (classId) {
      fetchStudents(classId);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Select a Class</h2>
      <div className="mb-3">
        <select
          className="form-select"
          value={selectedClass}
          onChange={handleClassChange}
        >
          <option value="">Select a class</option>
          {classes.map((cls) => (
            <option key={cls.ClassID} value={cls.ClassID}>
              {cls.ClassStandard}
            </option>
          ))}
        </select>
      </div>
      <h3>Students</h3>
      <ul className="list-group">
        {students.map((student) => (
          <li
            key={student.StudentID}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {student.Name}
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate(`/studentmarks/${student.StudentID}`)}
            >
              View Marks
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentData;
